import type { JSONContent } from "@tiptap/react";

export interface MessageTemplate {
  id: string;
  /** Contact-form interest this template belongs to; undefined for the general one. */
  interest?: string;
  title: string;
  sections: string[];
}

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: "general",
    title: "Automation request",
    sections: [
      "The process",
      "Who does it today, and how often",
      "What a good result looks like",
      "Timeline and constraints",
    ],
  },
  {
    id: "rfp-os",
    interest: "RFP OS",
    title: "RFP OS: proposal automation",
    sections: [
      "The bids you respond to",
      "Proposals per year, and who works on them",
      "Where your content lives today",
      "The biggest bottleneck in your process",
      "Timeline and constraints",
    ],
  },
  {
    id: "provestack",
    interest: "ProveStack",
    title: "ProveStack: AI code provenance",
    sections: [
      "Team size and the AI coding tools you use",
      "Audits or frameworks you report against",
      "What you need to prove, and to whom",
      "Timeline and constraints",
    ],
  },
  {
    id: "automation",
    interest: "AI automation project",
    title: "AI automation project",
    sections: [
      "The process",
      "Who does it today, and how often",
      "Systems and documents involved",
      "What a good result looks like",
      "Timeline and constraints",
    ],
  },
  {
    id: "engineering",
    interest: "Production engineering",
    title: "Production engineering",
    sections: [
      "The system and your current stack",
      "What's blocking you",
      "What a good result looks like",
      "Timeline and constraints",
    ],
  },
  {
    id: "governance",
    interest: "AI adoption & governance",
    title: "AI adoption & governance",
    sections: [
      "Where AI is used in your company today",
      "Your main concerns (data, compliance, cost)",
      "Who owns AI decisions",
      "Timeline and constraints",
    ],
  },
  {
    id: "other",
    interest: "Something else",
    title: "Project brief",
    sections: ["What you're working on", "What a good result looks like", "Timeline and constraints"],
  },
];

/** Templates matching the selected interests first, then the rest. */
export function groupTemplates(interests: string[]) {
  const suggested = MESSAGE_TEMPLATES.filter((t) => t.interest && interests.includes(t.interest));
  const rest = MESSAGE_TEMPLATES.filter((t) => !suggested.includes(t));
  return { suggested, rest };
}

/** Bold heading, then each section as a bold label followed by an empty line to type in. */
export function templateContent(t: MessageTemplate): JSONContent[] {
  return [
    { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: t.title }] },
    ...t.sections.flatMap((s) => [
      { type: "paragraph", content: [{ type: "text", text: s, marks: [{ type: "bold" }] }] },
      { type: "paragraph" },
    ]),
  ];
}
