'use client';

import { AnimateIn } from '@/components/AnimateIn';
import { useTheme } from '@/components/ThemeProvider';
import { RfpOsPanel } from '@/components/MockPanel';
import {
  ArrowRight,
  ListChecks,
  Quote,
  CircleDashed,
  ClipboardCheck,
  Cloud,
} from 'lucide-react';

const rfpOsFeatures = [
  {
    label: 'Requirements extracted and mapped in a compliance matrix',
    icon: ListChecks,
  },
  {
    label:
      'Section-by-section drafts grounded in your own documents, with numbered citations',
    icon: Quote,
  },
  {
    label: 'Missing evidence shows as a placeholder, never a guess',
    icon: CircleDashed,
  },
  {
    label: 'A review guide that tells your team what to check before submission',
    icon: ClipboardCheck,
  },
  {
    label: 'Runs in our managed cloud or your own AWS account',
    icon: Cloud,
  },
];

export function Products() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <section
      id='products'
      className='relative border-t border-(--border) py-4 lg:py-20'
      style={{
        background:
          'radial-gradient(800px 500px at 20% 10%,rgba(79,140,255,0.06),transparent 60%),' +
          'radial-gradient(700px 400px at 90% 90%,rgba(34,211,238,0.05),transparent 60%)',
      }}
    >
      <div className='site-container relative'>
        {/* Header */}
        <AnimateIn>
          <div className='mb-14'>
            <span className='eyebrow' style={{ color: 'var(--accent)' }}>
              Products
            </span>
            <div className='flex flex-wrap items-end gap-x-16 gap-y-4 mt-4'>
              <h2 className='font-bold tracking-tight leading-[1.1] text-(--foreground) shrink-0 text-[clamp(32px,3.5vw,52px)]'>
                Automation products,
                <br />
                built in-house.
              </h2>
              <p className='text-(--muted) text-[15px] leading-relaxed max-w-100'>
                Products that take a whole process off your team&apos;s plate.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Featured: RFP OS */}
        <AnimateIn delay={0.1}>
          <div
            className='card-base overflow-hidden relative'
            style={{
              background:
                'linear-gradient(135deg,rgba(79,140,255,0.06) 0%,rgba(34,211,238,0.04) 100%)',
              borderColor: 'var(--border-strong)',
            }}
          >
            {/* Corner glow */}
            <div
              aria-hidden='true'
              className='absolute -top-12.5 -right-12.5 w-70 h-70 pointer-events-none opacity-[0.18]'
              style={{
                background:
                  'conic-gradient(from 220deg,var(--accent),var(--accent-2),transparent 60%)',
                filter: 'blur(40px)',
              }}
            />

            <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]'>
              {/* Left */}
              <div className='p-4 lg:p-14'>
                <div className='flex items-center gap-3 mb-6'>
                  <RfpOsMark />
                  <span className='text-[22px] font-semibold tracking-tight text-(--foreground)'>
                    RFP OS
                  </span>
                  <span
                    className='inline-flex items-center gap-1.5 text-[8px] px-1.5 py-1 rounded-full font-mono-custom tracking-[0.05em]'
                    style={{
                      background: 'rgba(79,140,255,0.1)',
                      border: '1px solid rgba(79,140,255,0.25)',
                      color: 'var(--accent)',
                    }}
                  >
                    <span className='w-1.5 h-1.5 rounded-full bg-(--accent)' />
                    WAITLIST OPEN
                  </span>
                </div>

                <p
                  className='font-mono-custom text-[11px] tracking-[0.14em] uppercase mb-3.5'
                  style={{ color: 'var(--accent-2)' }}
                >
                  For proposal and bid teams
                </p>

                <h3 className='font-medium leading-[1.1] mb-4 text-(--foreground) text-[clamp(22px,2.5vw,32px)] tracking-tight'>
                  From solicitation to a cited, <br />
                  <span className='gradient-text'>review-ready proposal draft.</span>
                </h3>

                <p className='text-[15px] text-(--muted) leading-[1.65] mb-7 max-w-120'>
                  RFP OS reads the solicitation, extracts its requirements and
                  drafts each section from your own documents, with numbered
                  citations and a sourced fact behind every name, number, date
                  and certification. Your team reviews, edits and submits.
                </p>

                <ul className='grid gap-2.5 mb-8'>
                  {rfpOsFeatures.map(({ label, icon: Icon }) => (
                    <li
                      key={label}
                      className='flex items-center gap-3 text-sm text-(--foreground)'
                    >
                      <Icon
                        className='w-4.5 h-4.5 text-(--accent) shrink-0'
                        strokeWidth={1.5}
                      />
                      {label}
                    </li>
                  ))}
                </ul>

                <div className='flex flex-wrap gap-3'>
                  <a href='/products/rfp-os' className='btn-primary'>
                    Explore RFP OS
                    <ArrowRight className='w-3.5 h-3.5' />
                  </a>
                  <a href='/products/rfp-os#waitlist' className='btn-ghost'>
                    Join the waitlist
                  </a>
                </div>
              </div>

              {/* Right: mock proposal run */}
              <div
                className='p-4 lg:p-12 border-t lg:border-t-0 lg:border-l border-(--border) flex items-center justify-center'
                style={{
                  background: isDark ? 'rgba(0,0,0,0.15)' : 'var(--bg-2)',
                }}
              >
                <RfpOsPanel />
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

export function RfpOsMark() {
  return (
    <svg width='32' height='32' viewBox='0 0 32 32' aria-hidden='true'>
      <path
        d='M8 4h11l6 6v18H8z'
        fill='none'
        stroke='var(--accent)'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M19 4v6h6'
        fill='none'
        stroke='var(--accent)'
        strokeWidth='1.5'
        strokeLinejoin='round'
        opacity='0.7'
      />
      <line x1='12' y1='15' x2='21' y2='15' stroke='var(--accent-2)' strokeWidth='1.5' />
      <line x1='12' y1='19' x2='19' y2='19' stroke='var(--accent-2)' strokeWidth='1.5' />
      <circle cx='22' cy='23.5' r='1.6' fill='var(--accent-2)' />
    </svg>
  );
}
