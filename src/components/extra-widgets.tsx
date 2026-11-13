import { useEffect, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Add01Icon,
  CheckmarkCircle02Icon,
  CreditCardIcon,
  FlashIcon,
  Home01Icon,
  Wifi01Icon,
} from '@hugeicons/core-free-icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type IconType = typeof Add01Icon

const shell = 'wc h-full rounded-3xl py-5 [--card-spacing:--spacing(5)]'
const body = 'min-h-0 flex-1 space-y-3 overflow-auto'

function Icon({ icon, size = 16, className }: { icon: IconType; size?: number; className?: string }) {
  return <HugeiconsIcon icon={icon} size={size} className={className} />
}

const usd = (n: number, digits = 0) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`

function Head({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="hh-80 flex items-center justify-between">
      <span className="font-medium">{title}</span>
      {meta && <span className="text-xs text-muted-foreground @max-[260px]:hidden">{meta}</span>}
    </div>
  )
}

/* ---------------------------------------------------------------- Savings goals */
export function GoalsWidget() {
  const [goals, setGoals] = useState([
    { name: 'New laptop', saved: 1450, target: 2400, bar: 'bg-orange-500' },
    { name: 'Summer trip', saved: 3200, target: 5000, bar: 'bg-sky-500' },
    { name: 'Emergency fund', saved: 8900, target: 12000, bar: 'bg-emerald-500' },
  ])
  return (
    <Card className={shell}>
      <CardContent className={body}>
        <Head title="Savings Goals" meta={`${goals.length} goals`} />
        {goals.map((g, i) => {
          const pct = Math.min(100, Math.round((g.saved / g.target) * 100))
          return (
            <div key={g.name} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate font-medium">{g.name}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {usd(g.saved)} <span className="@max-[300px]:hidden">/ {usd(g.target)}</span>
                  </span>
                  <Button
                    variant="secondary"
                    size="xs"
                    className="rounded-full @max-[260px]:hidden"
                    disabled={g.saved >= g.target}
                    onClick={() =>
                      setGoals((gs) =>
                        gs.map((x, j) => (j === i ? { ...x, saved: Math.min(x.target, x.saved + 100) } : x)),
                      )
                    }
                  >
                    <Icon icon={Add01Icon} size={10} />$100
                  </Button>
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn('h-full rounded-full transition-[width] duration-500', g.bar)}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

/* ---------------------------------------------------------------- Upcoming bills */
export function BillsWidget() {
  const [bills, setBills] = useState([
    { name: 'Electricity', due: 'Apr 20', amount: 84.5, icon: FlashIcon, paid: false },
    { name: 'Internet', due: 'Apr 22', amount: 39.9, icon: Wifi01Icon, paid: false },
    { name: 'Rent', due: 'Apr 28', amount: 1200, icon: Home01Icon, paid: false },
    { name: 'Card payment', due: 'May 02', amount: 310, icon: CreditCardIcon, paid: true },
  ])
  const due = bills.filter((b) => !b.paid).reduce((s, b) => s + b.amount, 0)
  return (
    <Card className={shell}>
      <CardContent className={body}>
        <Head title="Upcoming Bills" meta={`${usd(due, 2)} due`} />
        <div className="space-y-2">
          {bills.map((b, i) => (
            <div key={b.name} className="flex items-center gap-3 rounded-2xl bg-muted p-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-card">
                <Icon icon={b.icon} size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <div className={cn('truncate text-sm font-medium', b.paid && 'text-muted-foreground line-through')}>
                  {b.name}
                </div>
                <div className="text-xs text-muted-foreground @max-[260px]:hidden">Due {b.due}</div>
              </div>
              <span className="text-sm tabular-nums @max-[240px]:hidden">{usd(b.amount, 2)}</span>
              {b.paid ? (
                <Badge variant="secondary" className="gap-1 border-0 bg-emerald-100 text-emerald-700">
                  <Icon icon={CheckmarkCircle02Icon} size={12} /> Paid
                </Badge>
              ) : (
                <Button
                  size="xs"
                  className="rounded-full"
                  onClick={() => setBills((bs) => bs.map((x, j) => (j === i ? { ...x, paid: true } : x)))}
                >
                  Pay
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/* ---------------------------------------------------------------- Spending breakdown */
const CATS = [
  { name: 'Food & drink', pct: 32, color: '#f4602f' },
  { name: 'Bills', pct: 26, color: '#0ea5e9' },
  { name: 'Shopping', pct: 24, color: '#10b981' },
  { name: 'Transport', pct: 18, color: '#a855f7' },
]

const OFFSETS = CATS.map((_, i) => CATS.slice(0, i).reduce((sum, c) => sum + c.pct, 0))

export function BreakdownWidget() {
  const [hover, setHover] = useState<number | null>(null)
  const total = 4380
  return (
    <Card className={shell}>
      <CardContent className={cn(body, 'flex flex-col')}>
        <Head title="Spending Breakdown" meta="This month" />
        <div className="flex min-h-0 flex-1 items-center gap-4 @max-[330px]:flex-col @max-[330px]:justify-center">
          <div className="relative aspect-square h-[clamp(5rem,70cqh,12rem)] shrink-0 @max-[330px]:h-[clamp(4rem,46cqh,9rem)]">
            <svg viewBox="0 0 42 42" className="size-full -rotate-90">
              <circle cx="21" cy="21" r="15.915" fill="none" className="stroke-muted" strokeWidth="5" />
              {CATS.map((c, i) => (
                <circle
                  key={c.name}
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="none"
                  stroke={c.color}
                  strokeWidth={hover === i ? 6.2 : 5}
                  strokeDasharray={`${c.pct - 0.8} ${100 - c.pct + 0.8}`}
                  strokeDashoffset={-OFFSETS[i]}
                  className="cursor-pointer transition-all duration-200"
                  opacity={hover === null || hover === i ? 1 : 0.35}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
              ))}
            </svg>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="text-[length:clamp(0.8rem,12cqh,1.5rem)] leading-none font-medium tabular-nums">
                  {hover === null ? usd(total) : `${CATS[hover].pct}%`}
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground">
                  {hover === null ? 'spent' : CATS[hover].name}
                </div>
              </div>
            </div>
          </div>
          <ul className="min-w-0 flex-1 space-y-1.5 text-sm @max-[330px]:flex-none">
            {CATS.map((c, i) => (
              <li
                key={c.name}
                className={cn('flex items-center gap-2 transition-opacity', hover !== null && hover !== i && 'opacity-40')}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                <span className="min-w-0 flex-1 truncate">{c.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{c.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

/* ---------------------------------------------------------------- Exchange rates */
const RATE_ROWS = [
  { code: 'EUR', rate: '0.9200', change: 0.4, pts: [5, 6, 5.5, 7, 6.5, 8, 9] },
  { code: 'GBP', rate: '0.7900', change: -0.2, pts: [8, 7.5, 8, 6.5, 7, 6, 5.5] },
  { code: 'JPY', rate: '151.32', change: 0.8, pts: [4, 4.5, 5, 4.8, 6, 7, 8.5] },
  { code: 'THB', rate: '36.150', change: -0.1, pts: [7, 7.2, 6.4, 6.8, 6, 6.2, 5.8] },
]

function Spark({ pts, up }: { pts: number[]; up: boolean }) {
  const w = 56
  const h = 20
  const max = Math.max(...pts)
  const min = Math.min(...pts)
  const d = pts
    .map((p, i) => `${i ? 'L' : 'M'}${(i / (pts.length - 1)) * w},${h - ((p - min) / (max - min || 1)) * (h - 4) - 2}`)
    .join(' ')
  return (
    <svg width={w} height={h} className="shrink-0 @max-[300px]:hidden" aria-hidden>
      <path d={d} fill="none" strokeWidth="2" strokeLinecap="round" stroke={up ? '#10b981' : '#ef4444'} />
    </svg>
  )
}

export function RatesWidget() {
  return (
    <Card className={shell}>
      <CardContent className={body}>
        <Head title="Exchange Rates" meta="1 USD =" />
        <div className="space-y-2">
          {RATE_ROWS.map((r) => (
            <div key={r.code} className="flex items-center gap-3 rounded-2xl bg-muted px-3 py-2">
              <span className="w-9 text-sm font-medium">{r.code}</span>
              <Spark pts={r.pts} up={r.change >= 0} />
              <span className="ml-auto text-sm tabular-nums">{r.rate}</span>
              <span
                className={cn(
                  'w-12 text-right text-xs tabular-nums @max-[240px]:hidden',
                  r.change >= 0 ? 'text-emerald-600' : 'text-red-500',
                )}
              >
                {r.change >= 0 ? '+' : ''}
                {r.change}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/* ---------------------------------------------------------------- Quick notes */
const NOTES_KEY = 'finexy-notes'

export function NotesWidget() {
  const [text, setText] = useState(() => {
    try {
      return localStorage.getItem(NOTES_KEY) ?? 'Pay rent on the 28th.\nReview card limits.'
    } catch {
      return ''
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(NOTES_KEY, text)
    } catch {
      /* storage unavailable */
    }
  }, [text])
  return (
    <Card className={shell}>
      <CardContent className={cn(body, 'flex flex-col')}>
        <Head title="Quick Notes" meta={`${text.length} chars`} />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Jot something down…"
          className="min-h-0 flex-1 resize-none rounded-2xl bg-amber-50 p-3 text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-amber-300 dark:bg-amber-950/30"
        />
      </CardContent>
    </Card>
  )
}

/* ---------------------------------------------------------------- Weekly activity */
const WEEK = [
  { d: 'Mon', v: 42 },
  { d: 'Tue', v: 65 },
  { d: 'Wed', v: 38 },
  { d: 'Thu', v: 80 },
  { d: 'Fri', v: 55 },
  { d: 'Sat', v: 92 },
  { d: 'Sun', v: 48 },
]

export function WeeklyWidget() {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...WEEK.map((w) => w.v))
  const total = WEEK.reduce((s, w) => s + w.v, 0)
  return (
    <Card className={shell}>
      <CardContent className={cn(body, 'flex flex-col')}>
        <Head title="Weekly Activity" meta={`${total} transactions`} />
        <div className="flex min-h-[3rem] flex-1 items-end gap-2">
          {WEEK.map((w, i) => (
            <div
              key={w.d}
              className="flex h-full min-w-0 flex-1 cursor-pointer flex-col items-center justify-end gap-1.5"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span
                className={cn(
                  'text-[10px] text-muted-foreground tabular-nums transition-opacity',
                  hover === i ? 'opacity-100' : 'opacity-0',
                )}
              >
                {w.v}
              </span>
              <div
                className={cn(
                  'w-full rounded-lg transition-all duration-200',
                  w.v === max ? 'bg-orange-500' : 'bg-foreground/80',
                  hover !== null && hover !== i && 'opacity-40',
                )}
                style={{ height: `${(w.v / max) * 78}%` }}
              />
              <span className="text-[10px] text-muted-foreground @max-[260px]:hidden">{w.d}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
