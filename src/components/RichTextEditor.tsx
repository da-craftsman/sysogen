"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useEditor, useEditorState, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  TextQuote,
  Minus,
  Link2,
  RemoveFormatting,
  Undo2,
  Redo2,
  LayoutTemplate,
  ChevronDown,
  CornerDownLeft,
} from "lucide-react";
import { groupTemplates, templateContent, type MessageTemplate } from "./contactTemplates";

export const MESSAGE_MAX_CHARS = 5000;

export interface RichTextValue {
  html: string;
  text: string;
}

const MOD = "Ctrl/⌘";

/* ── Commands ───────────────────────────────────────────────────────────── */

/**
 * Inserts a template at the cursor (or fills the editor when it is empty), then
 * puts the caret on the first empty line of the template so the person can type.
 */
function insertTemplate(editor: Editor, t: MessageTemplate) {
  const wasEmpty = editor.isEmpty;
  if (!editor.isFocused && !wasEmpty) editor.commands.focus("end");
  const start = wasEmpty ? 0 : editor.state.selection.from;

  if (wasEmpty) editor.chain().focus().setContent(templateContent(t), { emitUpdate: true }).run();
  else editor.chain().focus().insertContent(templateContent(t)).run();

  let target = -1;
  editor.state.doc.nodesBetween(start, editor.state.doc.content.size, (node, pos) => {
    if (target !== -1) return false;
    if (node.type.name === "paragraph" && node.content.size === 0) {
      target = pos + 1;
      return false;
    }
    return true;
  });
  if (target !== -1) editor.chain().focus().setTextSelection(target).scrollIntoView().run();
}

function normalizeUrl(url: string): string {
  const u = url.trim();
  if (!u) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return u;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)) return `mailto:${u}`;
  return `https://${u}`;
}

/* ── Slash command menu ("/" type-ahead) ────────────────────────────────── */

interface SlashItem {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: (editor: Editor) => void;
}

interface SlashState {
  from: number;
  to: number;
  query: string;
  top: number;
  left: number;
}

const BLOCK_COMMANDS: SlashItem[] = [
  {
    id: "h2",
    label: "Heading",
    hint: "Large section heading",
    keywords: "heading h2 title",
    run: (e) => e.chain().focus().setHeading({ level: 2 }).run(),
  },
  {
    id: "h3",
    label: "Subheading",
    hint: "Smaller heading",
    keywords: "subheading h3",
    run: (e) => e.chain().focus().setHeading({ level: 3 }).run(),
  },
  {
    id: "bullet",
    label: "Bulleted list",
    hint: "Simple list",
    keywords: "bullet list ul unordered",
    run: (e) => e.chain().focus().toggleBulletList().run(),
  },
  {
    id: "ordered",
    label: "Numbered list",
    hint: "List with numbers",
    keywords: "numbered ordered list ol",
    run: (e) => e.chain().focus().toggleOrderedList().run(),
  },
  {
    id: "quote",
    label: "Quote",
    hint: "Quoted text",
    keywords: "quote blockquote",
    run: (e) => e.chain().focus().toggleBlockquote().run(),
  },
  {
    id: "divider",
    label: "Divider",
    hint: "Horizontal line",
    keywords: "divider line hr separator",
    run: (e) => e.chain().focus().setHorizontalRule().run(),
  },
];

function readSlash(editor: Editor, wrapper: HTMLElement | null): SlashState | null {
  const { selection } = editor.state;
  if (!wrapper || !selection.empty) return null;
  const { $from } = selection;
  const before = $from.parent.textBetween(0, $from.parentOffset, undefined, "￼");
  const match = /(?:^|\s)\/([\w-]{0,24})$/.exec(before);
  if (!match) return null;

  const coords = editor.view.coordsAtPos($from.pos);
  const rect = wrapper.getBoundingClientRect();
  return {
    from: $from.pos - match[1].length - 1,
    to: $from.pos,
    query: match[1].toLowerCase(),
    top: coords.bottom - rect.top + 6,
    left: Math.max(8, Math.min(coords.left - rect.left, rect.width - 280)),
  };
}

/* ── Editor ─────────────────────────────────────────────────────────────── */

/**
 * Contact-form message editor. No images, tables, colors or fonts: the schema only
 * allows text formatting, headings, lists, quotes, dividers and links.
 */
export function RichTextEditor({
  onChange,
  onReady,
  placeholder,
  interests = [],
}: {
  onChange: (value: RichTextValue) => void;
  onReady?: (editor: Editor) => void;
  placeholder?: string;
  interests?: string[];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [slash, setSlash] = useState<SlashState | null>(null);
  const [slashIndex, setSlashIndex] = useState(0);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");

  // Refs read from inside Tiptap callbacks, which are created once
  const slashRef = useRef<SlashState | null>(null);
  const slashDismissedAt = useRef(-1);
  const keyHandlerRef = useRef<(event: KeyboardEvent) => boolean>(() => false);

  function syncSlash(editor: Editor) {
    let next = readSlash(editor, wrapperRef.current);
    if (!next) slashDismissedAt.current = -1;
    else if (next.from === slashDismissedAt.current) next = null;

    const prev = slashRef.current;
    if (!next || !prev || prev.query !== next.query || prev.from !== next.from) setSlashIndex(0);
    slashRef.current = next;
    setSlash(next);
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          protocols: ["http", "https", "mailto"],
        },
      }),
      CharacterCount.configure({ limit: MESSAGE_MAX_CHARS }),
      Placeholder.configure({ placeholder: placeholder ?? "" }),
    ],
    editorProps: {
      attributes: {
        class: "rte-content",
        "aria-label": "Message",
        role: "textbox",
        "aria-multiline": "true",
      },
      handleKeyDown: (_view, event) => keyHandlerRef.current(event),
    },
    onCreate: ({ editor }) => onReady?.(editor),
    onUpdate: ({ editor }) => {
      onChange({
        html: editor.isEmpty ? "" : editor.getHTML(),
        text: editor.getText({ blockSeparator: "\n\n" }).trim(),
      });
      syncSlash(editor);
    },
    onSelectionUpdate: ({ editor }) => syncSlash(editor),
    onBlur: () => {
      slashRef.current = null;
      setSlash(null);
    },
  });

  const state = useEditorState({
    editor,
    selector: ({ editor }) =>
      editor
        ? {
            bold: editor.isActive("bold"),
            italic: editor.isActive("italic"),
            underline: editor.isActive("underline"),
            strike: editor.isActive("strike"),
            code: editor.isActive("code"),
            h2: editor.isActive("heading", { level: 2 }),
            h3: editor.isActive("heading", { level: 3 }),
            bulletList: editor.isActive("bulletList"),
            orderedList: editor.isActive("orderedList"),
            blockquote: editor.isActive("blockquote"),
            link: editor.isActive("link"),
            canUndo: editor.can().undo(),
            canRedo: editor.can().redo(),
            chars: editor.storage.characterCount.characters() as number,
          }
        : null,
  });

  const { suggested, rest } = useMemo(() => groupTemplates(interests), [interests]);

  const slashItems = useMemo<SlashItem[]>(() => {
    const templates = [...suggested, ...rest].map((t) => ({
      id: `tpl-${t.id}`,
      label: `Template: ${t.title}`,
      hint: suggested.includes(t) ? "Matches your interests" : "Message template",
      keywords: `template ${t.title} ${t.interest ?? ""}`.toLowerCase(),
      run: (e: Editor) => insertTemplate(e, t),
    }));
    return [...BLOCK_COMMANDS, ...templates];
  }, [suggested, rest]);

  const filteredSlash = useMemo(() => {
    if (!slash) return [];
    const q = slash.query;
    return slashItems.filter(
      (i) => !q || i.label.toLowerCase().includes(q) || i.keywords.toLowerCase().includes(q),
    );
  }, [slash, slashItems]);

  function runSlash(item: SlashItem) {
    const s = slashRef.current;
    if (!editor || !s) return;
    editor.chain().focus().deleteRange({ from: s.from, to: s.to }).run();
    slashRef.current = null;
    setSlash(null);
    item.run(editor);
  }

  function openLink() {
    if (!editor) return;
    setLinkValue((editor.getAttributes("link").href as string | undefined) ?? "");
    setLinkOpen(true);
  }

  function applyLink() {
    if (!editor) return;
    const href = normalizeUrl(linkValue);
    const chain = editor.chain().focus().extendMarkRange("link");
    if (!href) chain.unsetLink().run();
    else if (editor.state.selection.empty && !editor.isActive("link"))
      chain.insertContent({ type: "text", text: linkValue.trim(), marks: [{ type: "link", attrs: { href } }] }).run();
    else chain.setLink({ href }).run();
    setLinkOpen(false);
  }

  function cancelLink() {
    setLinkOpen(false);
    editor?.commands.focus();
  }

  // Refreshed after every render so the Tiptap key handler always sees current state
  useEffect(() => {
    keyHandlerRef.current = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openLink();
        return true;
      }
      const s = slashRef.current;
      if (!s || filteredSlash.length === 0) return false;
      if (event.key === "ArrowDown") {
        setSlashIndex((i) => (i + 1) % filteredSlash.length);
        return true;
      }
      if (event.key === "ArrowUp") {
        setSlashIndex((i) => (i - 1 + filteredSlash.length) % filteredSlash.length);
        return true;
      }
      if (event.key === "Enter" || event.key === "Tab") {
        runSlash(filteredSlash[Math.min(slashIndex, filteredSlash.length - 1)]);
        return true;
      }
      if (event.key === "Escape") {
        slashDismissedAt.current = s.from;
        slashRef.current = null;
        setSlash(null);
        return true;
      }
      return false;
    };
  });

  const chars = state?.chars ?? 0;
  const run = (fn: (e: Editor) => void) => () => editor && fn(editor);

  return (
    <div
      ref={wrapperRef}
      className="relative rounded-lg border border-(--border) bg-(--background) focus-within:border-(--accent) transition-colors"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-(--border)">
        <ToolButton label={`Bold (${MOD}+B)`} active={state?.bold} onClick={run((e) => e.chain().focus().toggleBold().run())}>
          <Bold className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton label={`Italic (${MOD}+I)`} active={state?.italic} onClick={run((e) => e.chain().focus().toggleItalic().run())}>
          <Italic className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton
          label={`Underline (${MOD}+U)`}
          active={state?.underline}
          onClick={run((e) => e.chain().focus().toggleUnderline().run())}
        >
          <Underline className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton
          label={`Strikethrough (${MOD}+Shift+S)`}
          active={state?.strike}
          onClick={run((e) => e.chain().focus().toggleStrike().run())}
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton label={`Inline code (${MOD}+E)`} active={state?.code} onClick={run((e) => e.chain().focus().toggleCode().run())}>
          <Code className="w-3.5 h-3.5" />
        </ToolButton>

        <Divider />

        <ToolButton
          label={`Heading (${MOD}+Alt+2)`}
          active={state?.h2}
          onClick={run((e) => e.chain().focus().toggleHeading({ level: 2 }).run())}
        >
          <Heading2 className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton
          label={`Subheading (${MOD}+Alt+3)`}
          active={state?.h3}
          onClick={run((e) => e.chain().focus().toggleHeading({ level: 3 }).run())}
        >
          <Heading3 className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton
          label={`Bulleted list (${MOD}+Shift+8)`}
          active={state?.bulletList}
          onClick={run((e) => e.chain().focus().toggleBulletList().run())}
        >
          <List className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton
          label={`Numbered list (${MOD}+Shift+7)`}
          active={state?.orderedList}
          onClick={run((e) => e.chain().focus().toggleOrderedList().run())}
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton
          label={`Quote (${MOD}+Shift+B)`}
          active={state?.blockquote}
          onClick={run((e) => e.chain().focus().toggleBlockquote().run())}
        >
          <TextQuote className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton label="Divider" onClick={run((e) => e.chain().focus().setHorizontalRule().run())}>
          <Minus className="w-3.5 h-3.5" />
        </ToolButton>

        <Divider />

        <ToolButton label={`Link (${MOD}+K)`} active={state?.link || linkOpen} onClick={openLink}>
          <Link2 className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton
          label="Clear formatting"
          onClick={run((e) => e.chain().focus().unsetAllMarks().clearNodes().run())}
        >
          <RemoveFormatting className="w-3.5 h-3.5" />
        </ToolButton>

        <Divider />

        <ToolButton label={`Undo (${MOD}+Z)`} disabled={!state?.canUndo} onClick={run((e) => e.chain().focus().undo().run())}>
          <Undo2 className="w-3.5 h-3.5" />
        </ToolButton>
        <ToolButton
          label={`Redo (${MOD}+Shift+Z)`}
          disabled={!state?.canRedo}
          onClick={run((e) => e.chain().focus().redo().run())}
        >
          <Redo2 className="w-3.5 h-3.5" />
        </ToolButton>

        <TemplateMenu
          suggested={suggested}
          rest={rest}
          onPick={(t) => editor && insertTemplate(editor, t)}
        />
      </div>

      {/* Link bar */}
      {linkOpen && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-(--border) bg-(--card)">
          <Link2 className="w-3.5 h-3.5 text-(--ink-mute) shrink-0" />
          <input
            autoFocus
            type="text"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyLink();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                cancelLink();
              }
            }}
            placeholder="Paste a link, e.g. example.com"
            className="flex-1 min-w-0 bg-transparent text-sm text-(--foreground) placeholder:text-(--ink-mute) focus:outline-none"
          />
          <button type="button" onClick={applyLink} className="text-[12px] font-medium text-(--accent) px-2 py-1 rounded-md hover:bg-(--accent)/10">
            Apply
          </button>
          {state?.link && (
            <button
              type="button"
              onClick={() => {
                editor?.chain().focus().extendMarkRange("link").unsetLink().run();
                setLinkOpen(false);
              }}
              className="text-[12px] text-(--ink-dim) px-2 py-1 rounded-md hover:bg-(--background)"
            >
              Remove
            </button>
          )}
          <button type="button" onClick={cancelLink} className="text-[12px] text-(--ink-dim) px-2 py-1 rounded-md hover:bg-(--background)">
            Cancel
          </button>
        </div>
      )}

      {/* Writing area: clicking the padding also places the caret */}
      <div
        className="px-4 py-3 max-h-105 overflow-y-auto cursor-text"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget && editor) {
            e.preventDefault();
            editor.commands.focus("end");
          }
        }}
      >
        <EditorContent editor={editor} />
      </div>

      {/* Footer: hint + counter */}
      <div className="flex items-center justify-between gap-4 px-4 pb-2 font-mono-custom text-[11px] text-(--ink-mute)">
        <span className="hidden sm:inline">
          Type <kbd className="px-1 rounded border border-(--border-strong)">/</kbd> for commands and templates
        </span>
        <span className={chars >= MESSAGE_MAX_CHARS ? "text-(--danger) ml-auto" : "ml-auto"} aria-live="polite">
          {chars.toLocaleString("en-US")} / {MESSAGE_MAX_CHARS.toLocaleString("en-US")}
        </span>
      </div>

      {/* Slash menu */}
      {slash && filteredSlash.length > 0 && (
        <div
          role="listbox"
          className="absolute z-30 w-70 max-h-72 overflow-y-auto rounded-lg border border-(--border-strong) bg-(--card) shadow-xl py-1"
          style={{ top: slash.top, left: slash.left }}
        >
          {filteredSlash.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={i === slashIndex}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setSlashIndex(i)}
              onClick={() => runSlash(item)}
              className={`w-full text-left px-3 py-2 flex items-center justify-between gap-3 ${
                i === slashIndex ? "bg-(--accent)/10" : ""
              }`}
            >
              <span className="min-w-0">
                <span className="block text-[13px] text-(--foreground) truncate">{item.label}</span>
                <span className="block text-[11px] text-(--ink-mute) truncate">{item.hint}</span>
              </span>
              {i === slashIndex && <CornerDownLeft className="w-3 h-3 text-(--ink-mute) shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Template dropdown ──────────────────────────────────────────────────── */

function TemplateMenu({
  suggested,
  rest,
  onPick,
}: {
  suggested: MessageTemplate[];
  rest: MessageTemplate[];
  onPick: (t: MessageTemplate) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pick(t: MessageTemplate) {
    setOpen(false);
    onPick(t);
  }

  return (
    <div ref={ref} className="relative ml-auto">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        // Keep the editor focused (and its caret) while the menu is used
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] transition-colors ${
          open ? "text-(--foreground) bg-(--card)" : "text-(--ink-dim) hover:text-(--foreground) hover:bg-(--card)"
        }`}
      >
        <LayoutTemplate className="w-3.5 h-3.5" />
        Use a template
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1.5 z-30 w-72 max-h-80 overflow-y-auto rounded-lg border border-(--border-strong) bg-(--card) shadow-xl py-1"
        >
          {suggested.length > 0 && (
            <>
              <MenuLabel>Based on your interests</MenuLabel>
              {suggested.map((t) => (
                <TemplateItem key={t.id} template={t} onPick={pick} />
              ))}
              <div className="my-1 border-t border-(--border)" />
              <MenuLabel>Other templates</MenuLabel>
            </>
          )}
          {rest.map((t) => (
            <TemplateItem key={t.id} template={t} onPick={pick} />
          ))}
        </div>
      )}
    </div>
  );
}

function MenuLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 pt-2 pb-1 font-mono-custom text-[10px] tracking-[0.12em] uppercase text-(--ink-mute)">
      {children}
    </div>
  );
}

function TemplateItem({ template, onPick }: { template: MessageTemplate; onPick: (t: MessageTemplate) => void }) {
  return (
    <button
      type="button"
      role="menuitem"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onPick(template)}
      className="w-full text-left px-3 py-2 hover:bg-(--accent)/10 transition-colors"
    >
      <span className="block text-[13px] font-semibold text-(--foreground)">{template.title}</span>
      <span className="block text-[11.5px] text-(--ink-mute) truncate">{template.sections.join(" · ")}</span>
    </button>
  );
}

/* ── Toolbar primitives ─────────────────────────────────────────────────── */

function Divider() {
  return <span className="w-px h-4 mx-1 bg-(--border)" />;
}

function ToolButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // Prevent the button from taking focus, so the caret stays in the editor
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`p-1.5 rounded-md transition-colors disabled:opacity-35 disabled:cursor-not-allowed ${
        active
          ? "text-(--accent) bg-(--accent)/10"
          : "text-(--ink-dim) hover:text-(--foreground) hover:bg-(--card)"
      }`}
    >
      {children}
    </button>
  );
}
