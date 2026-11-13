import { useEffect, useMemo, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Add01Icon,
  AirplaneModeIcon,
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowLeftRightIcon,
  ArrowUp01Icon,
  ArrowUpDownIcon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Coins01Icon,
  ComputerIcon,
  Copy01Icon,
  CreditCardIcon,
  DashboardSquare01Icon,
  Delete02Icon,
  DollarCircleIcon,
  EuroIcon,
  File01Icon,
  FilterHorizontalIcon,
  FlashIcon,
  HelpCircleIcon,
  Hotel01Icon,
  Layers01Icon,
  Logout03Icon,
  Mail01Icon,
  MasterCardIcon,
  MoneyBag02Icon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  Moon02Icon,
  Notification03Icon,
  PoundIcon,
  Search01Icon,
  Settings02Icon,
  ShoppingBasket01Icon,
  SmartPhone01Icon,
  SnowflakeIcon,
  SparklesIcon,
  Sun01Icon,
  UserGroupIcon,
  ViewIcon,
  Wallet01Icon,
  Wifi01Icon,
} from '@hugeicons/core-free-icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type IconType = typeof Sun01Icon
type CurrencyCode = 'USD' | 'EUR' | 'GBP'
type Status = 'Completed' | 'Pending' | 'In Progress'
type Mode = 'transfer' | 'request'

const NAV = ['Overview', 'Activity', 'Manage', 'Program', 'Account', 'Reports']

const RAIL: { icon: IconType; label: string }[] = [
  { icon: DashboardSquare01Icon, label: 'Dashboard' },
  { icon: Calendar03Icon, label: 'Calendar' },
  { icon: Mail01Icon, label: 'Messages' },
  { icon: File01Icon, label: 'Documents' },
  { icon: UserGroupIcon, label: 'Contacts' },
  { icon: Layers01Icon, label: 'Integrations' },
  { icon: Settings02Icon, label: 'Settings' },
]

const RATES: Record<CurrencyCode, { rate: number; symbol: string; icon: IconType }> = {
  USD: { rate: 1, symbol: '$', icon: DollarCircleIcon },
  EUR: { rate: 0.92, symbol: '€', icon: EuroIcon },
  GBP: { rate: 0.79, symbol: '£', icon: PoundIcon },
}

const INITIAL_WALLETS: { code: CurrencyCode; amount: number; limit: string; active: boolean }[] = [
  { code: 'USD', amount: 22678, limit: '$10k a month', active: true },
  { code: 'EUR', amount: 18345, limit: '€8k a month', active: true },
  { code: 'GBP', amount: 15000, limit: '£7.5k a month', active: false },
]

const STATS: {
  label: string
  value: number
  delta: string
  up: boolean
  icon: IconType
  featured?: boolean
}[] = [
  { label: 'Total Earnings', value: 950, delta: '7%', up: true, icon: Wallet01Icon, featured: true },
  { label: 'Total Spending', value: 700, delta: '5%', up: false, icon: MoneyBag02Icon },
  { label: 'Total Income', value: 1050, delta: '8%', up: true, icon: Coins01Icon },
  { label: 'Total Revenue', value: 850, delta: '4%', up: true, icon: MoneyBag02Icon },
]

const CHART = [
  { m: 'Jan', profit: 22, loss: 15 },
  { m: 'Feb', profit: 18, loss: 24 },
  { m: 'Mar', profit: 14, loss: 22 },
  { m: 'Apr', profit: 20, loss: 19 },
  { m: 'May', profit: 17, loss: 26 },
  { m: 'Jun', profit: 28, loss: 20 },
  { m: 'Jul', profit: 21, loss: 20 },
  { m: 'Aug', profit: 15, loss: 18 },
]

interface Activity {
  id: string
  name: string
  icon: IconType
  color: string
  price: number
  status: Status
  date: number
}

const INITIAL_ACTIVITIES: Activity[] = [
  { id: 'INV_000076', name: 'Mobile App Purchase', icon: SmartPhone01Icon, color: 'bg-sky-100 text-sky-600', price: 25500, status: 'Completed', date: Date.UTC(2026, 3, 17, 15, 45) },
  { id: 'INV_000075', name: 'Hotel Booking', icon: Hotel01Icon, color: 'bg-indigo-100 text-indigo-700', price: 32750, status: 'Pending', date: Date.UTC(2026, 3, 15, 11, 30) },
  { id: 'INV_000074', name: 'Flight Ticket Booking', icon: AirplaneModeIcon, color: 'bg-cyan-100 text-cyan-600', price: 40200, status: 'Completed', date: Date.UTC(2026, 3, 15, 12, 0) },
  { id: 'INV_000073', name: 'Grocery Purchase', icon: ShoppingBasket01Icon, color: 'bg-amber-100 text-amber-600', price: 50200, status: 'In Progress', date: Date.UTC(2026, 3, 14, 21, 15) },
  { id: 'INV_000072', name: 'Software License', icon: ComputerIcon, color: 'bg-red-100 text-red-600', price: 15900, status: 'Completed', date: Date.UTC(2026, 3, 10, 6, 0) },
]

const STATUSES: Status[] = ['Completed', 'Pending', 'In Progress']
const STATUS_DOT: Record<Status, string> = {
  Completed: 'bg-emerald-500',
  Pending: 'bg-red-500',
  'In Progress': 'bg-amber-400',
}

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'Payment received', body: '$25,500 from Mobile App Purchase', time: '2m ago' },
  { id: 2, title: 'Monthly limit at 25%', body: "You've spent $1,400 of $5,500", time: '1h ago' },
  { id: 3, title: 'New sign-in', body: 'Chrome on macOS — Bangkok', time: 'Yesterday' },
]

const fmtDate = (t: number) => {
  const d = new Date(t)
  const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
  return `${date.replace(/ (\d{4})$/, ', $1')} ${time}`
}
const money = (n: number, symbol = '$') =>
  `${symbol}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const moneyInt = (n: number) => `$${n.toLocaleString('en-US')}`

function Icon({ icon, size = 18, className }: { icon: IconType; size?: number; className?: string }) {
  return <HugeiconsIcon icon={icon} size={size} className={className} />
}

function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

function Delta({ up, children }: { up: boolean; children: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'gap-0.5 border-0 font-medium',
        up ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600',
      )}
    >
      <Icon icon={up ? ArrowUp01Icon : ArrowDown01Icon} size={12} />
      {children}
    </Badge>
  )
}

function IncomeChart() {
  const [hover, setHover] = useState<number | null>(null)
  const [show, setShow] = useState({ profit: true, loss: true })
  const W = 480
  const H = 190
  const left = 40
  const bottom = 24
  const max = 50
  const plotH = H - bottom - 8
  const slot = (W - left) / CHART.length
  const barW = 26
  const y = (v: number) => 8 + plotH - (v / max) * plotH
  const h = (v: number) => (v / max) * plotH

  const toggle = (k: 'profit' | 'loss') =>
    setShow((s) => (s[k] && !s[other(k)] ? s : { ...s, [k]: !s[k] }))
  const other = (k: 'profit' | 'loss') => (k === 'profit' ? 'loss' : 'profit')

  return (
    <div className="rounded-2xl bg-muted p-3">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium">Profit and Loss</span>
        <span className="flex items-center gap-1">
          {(['profit', 'loss'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => toggle(k)}
              aria-pressed={show[k]}
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-0.5 capitalize transition',
                show[k] ? 'text-foreground' : 'text-muted-foreground line-through opacity-60',
                'hover:bg-card',
              )}
            >
              <span className={cn('size-2 rounded-sm', k === 'profit' ? 'bg-blue-500' : 'bg-foreground')} />
              {k === 'profit' ? 'Profit' : 'Loss'}
            </button>
          ))}
        </span>
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Profit and loss by month">
          <defs>
            <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="5" height="5" fill="#f4602f" />
              <line x1="0" y1="0" x2="0" y2="5" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.6" />
            </pattern>
          </defs>
          {[0, 10, 20, 30, 40, 50].map((t) => (
            <g key={t}>
              <line x1={left} x2={W} y1={y(t)} y2={y(t)} className="stroke-border" strokeDasharray="3 4" />
              <text x={left - 8} y={y(t) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
                {t === 0 ? '00' : `${t}k`}
              </text>
            </g>
          ))}
          {CHART.map((d, i) => {
            const x = left + i * slot + (slot - barW) / 2
            const p = show.profit ? d.profit : 0
            const l = show.loss ? d.loss : 0
            const active = hover === i
            return (
              <g
                key={d.m}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                opacity={hover === null || active ? 1 : 0.45}
                className="cursor-pointer transition-opacity"
              >
                <rect x={left + i * slot} y={0} width={slot} height={H} fill="transparent" />
                {show.profit && (
                  <rect x={x} y={y(p)} width={barW} height={h(p)} rx="6" className="fill-foreground" />
                )}
                {show.loss && (
                  <rect x={x} y={y(p) - h(l) - (p ? 2 : 0)} width={barW} height={h(l)} rx="6" fill="url(#hatch)" />
                )}
                <text
                  x={x + barW / 2}
                  y={H - 6}
                  textAnchor="middle"
                  className={cn('text-[9px]', active ? 'fill-foreground font-semibold' : 'fill-muted-foreground')}
                >
                  {d.m}
                </text>
              </g>
            )
          })}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-1 z-10 -translate-x-1/2 rounded-lg bg-foreground px-2.5 py-1.5 text-[11px] text-background shadow-lg"
            style={{ left: `${((left + hover * slot + slot / 2) / W) * 100}%` }}
          >
            <div className="font-medium">{CHART[hover].m}</div>
            <div>Profit ${CHART[hover].profit}k</div>
            <div>Loss ${CHART[hover].loss}k</div>
          </div>
        )}
      </div>
    </div>
  )
}

interface CardData {
  id: number
  variant: 'dark' | 'brand'
  last: string
  frozen: boolean
}

function BankCard({
  card,
  selected,
  onSelect,
  onFreeze,
}: {
  card: CardData
  selected: boolean
  onSelect: () => void
  onFreeze: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
      className={cn(
        'group relative flex h-36 w-60 shrink-0 cursor-pointer flex-col justify-between rounded-2xl p-4 text-white transition duration-200 hover:-translate-y-1',
        card.variant === 'dark' ? 'bg-neutral-900' : 'bg-linear-to-br from-orange-500 to-red-500',
        selected && 'ring-2 ring-orange-400 ring-offset-2 ring-offset-card',
        card.frozen && 'opacity-60 grayscale',
      )}
    >
      <div className="flex items-center justify-between">
        <Badge className="bg-white/90 text-neutral-800">{card.frozen ? 'Frozen' : 'Active'}</Badge>
        <div className="flex items-center gap-2">
          <Icon icon={Wifi01Icon} size={16} className="rotate-90" />
          {card.variant === 'dark' ? <Icon icon={MasterCardIcon} size={24} /> : <Icon icon={SparklesIcon} size={20} />}
        </div>
      </div>
      <div className="flex items-end justify-between text-[10px] text-white/60">
        <div>
          Card Number
          <div className="text-xs text-white">**** **** {card.last}</div>
        </div>
        <div>
          EXP
          <div className="text-xs text-white">09/29</div>
        </div>
        <div>
          CVV
          <div className="text-xs text-white">611</div>
        </div>
      </div>
      <Tip label={card.frozen ? 'Unfreeze card' : 'Freeze card'}>
        <button
          type="button"
          aria-label="Toggle freeze"
          onClick={(e) => {
            e.stopPropagation()
            onFreeze()
          }}
          className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-white text-neutral-800 opacity-0 shadow transition group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Icon icon={SnowflakeIcon} size={14} />
        </button>
      </Tip>
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [nav, setNav] = useState('Overview')
  const [rail, setRail] = useState(0)

  const [currency, setCurrency] = useState<CurrencyCode>('USD')
  const [totalUsd, setTotalUsd] = useState(689372)
  const [wallets, setWallets] = useState(INITIAL_WALLETS)
  const [spent, setSpent] = useState(1400)

  const [notes, setNotes] = useState(INITIAL_NOTIFICATIONS)
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES)
  const [selected, setSelected] = useState<string[]>(['INV_000073'])
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status[]>(STATUSES)
  const [sort, setSort] = useState<{ key: 'price' | 'date'; dir: 'asc' | 'desc' }>({ key: 'date', dir: 'desc' })

  const [cards, setCards] = useState<CardData[]>([
    { id: 1, variant: 'dark', last: '6782', frozen: false },
    { id: 2, variant: 'brand', last: '4356', frozen: false },
  ])
  const [cardId, setCardId] = useState(1)

  const [dialog, setDialog] = useState<Mode | null>(null)
  const [amount, setAmount] = useState('')
  const [from, setFrom] = useState<CurrencyCode>('USD')
  const [who, setWho] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2800)
    return () => clearTimeout(t)
  }, [toast])

  const cur = RATES[currency]
  const unread = notes.length

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return activities
      .filter((a) => statusFilter.includes(a.status))
      .filter((a) => !q || `${a.id} ${a.name}`.toLowerCase().includes(q))
      .sort((a, b) => (sort.dir === 'asc' ? 1 : -1) * (a[sort.key] - b[sort.key]))
  }, [activities, query, statusFilter, sort])

  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id))
  const walletOf = (c: CurrencyCode) => wallets.find((w) => w.code === c)!
  const amountNum = Number(amount)
  const available = walletOf(from).amount
  const amountError =
    dialog === 'transfer' && amount !== ''
      ? !(amountNum > 0)
        ? 'Enter an amount greater than 0'
        : amountNum > available
          ? `Insufficient funds in ${from} wallet`
          : ''
      : ''
  const canSubmit = amountNum > 0 && !amountError && who.trim().length > 0

  const openDialog = (m: Mode) => {
    setAmount('')
    setWho('')
    setFrom(currency)
    setDialog(m)
  }

  const nextId = () => `INV_${String(Math.max(...activities.map((a) => Number(a.id.slice(4)))) + 1).padStart(6, '0')}`

  const submit = () => {
    if (!canSubmit || !dialog) return
    const usd = amountNum / RATES[from].rate
    if (dialog === 'transfer') {
      setWallets((ws) => ws.map((w) => (w.code === from ? { ...w, amount: w.amount - amountNum } : w)))
      setTotalUsd((t) => t - usd)
      setSpent((s) => s + usd)
    }
    setActivities((a) => [
      {
        id: nextId(),
        name: `${dialog === 'transfer' ? 'Transfer to' : 'Request from'} ${who.trim()}`,
        icon: ArrowLeftRightIcon,
        color: 'bg-orange-100 text-orange-600',
        price: Math.round(usd),
        status: 'Pending',
        date: Date.now(),
      },
      ...a,
    ])
    setToast(
      dialog === 'transfer'
        ? `Sent ${RATES[from].symbol}${amountNum.toLocaleString()} to ${who.trim()}`
        : `Requested ${RATES[from].symbol}${amountNum.toLocaleString()} from ${who.trim()}`,
    )
    setDialog(null)
  }

  const toggleSort = (key: 'price' | 'date') =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' }))

  const deleteRows = (ids: string[]) => {
    setActivities((a) => a.filter((x) => !ids.includes(x.id)))
    setSelected((s) => s.filter((x) => !ids.includes(x)))
    setToast(`Deleted ${ids.length} ${ids.length === 1 ? 'activity' : 'activities'}`)
  }

  const addCard = () => {
    if (cards.length >= 4) return setToast('You can have up to 4 cards')
    const id = Math.max(...cards.map((c) => c.id)) + 1
    setCards((c) => [
      ...c,
      { id, variant: id % 2 ? 'dark' : 'brand', last: String(1000 + Math.floor(Math.random() * 9000)), frozen: false },
    ])
    setCardId(id)
    setToast('New card added')
  }

  const sortIcon = (key: 'price' | 'date') => (
    <Icon
      icon={sort.key === key ? (sort.dir === 'asc' ? ArrowUp01Icon : ArrowDown01Icon) : ArrowUpDownIcon}
      size={12}
      className={sort.key === key ? 'text-foreground' : 'text-muted-foreground'}
    />
  )

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-neutral-200/70 p-3 sm:p-6 dark:bg-neutral-950">
        <div className="mx-auto max-w-[1280px] rounded-[2rem] bg-neutral-100 p-4 sm:p-5 dark:bg-neutral-900">
          {/* Top bar */}
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-full bg-card py-1.5 pr-4 pl-1.5">
              <span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-orange-400 to-red-500 text-white">
                <Icon icon={FlashIcon} size={16} />
              </span>
              <span className="font-semibold">Finexy</span>
            </div>

            <nav className="hidden items-center gap-1 rounded-full bg-card p-1.5 md:flex">
              {NAV.map((n) => (
                <Button
                  key={n}
                  variant={nav === n ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setNav(n)}
                  className={cn('h-8 rounded-full px-4', nav !== n && 'text-muted-foreground')}
                >
                  {n}
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-card p-1">
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="rounded-full"
                  aria-label="Search"
                  onClick={() => document.getElementById('activity-search')?.focus()}
                >
                  <Icon icon={Search01Icon} />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-lg" className="relative rounded-full" aria-label="Notifications">
                      <Icon icon={Notification03Icon} />
                      {unread > 0 && <span className="absolute top-2 right-2.5 size-1.5 rounded-full bg-orange-500" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <DropdownMenuLabel className="flex items-center justify-between">
                      Notifications
                      {unread > 0 && (
                        <button
                          type="button"
                          className="text-xs font-normal text-orange-600 hover:underline"
                          onClick={() => setNotes([])}
                        >
                          Mark all read
                        </button>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notes.length === 0 && (
                      <div className="flex flex-col items-center gap-1 py-6 text-xs text-muted-foreground">
                        <Icon icon={CheckmarkCircle02Icon} size={22} />
                        You're all caught up
                      </div>
                    )}
                    {notes.map((n) => (
                      <DropdownMenuItem
                        key={n.id}
                        className="flex-col items-start gap-0.5"
                        onSelect={() => setNotes((x) => x.filter((y) => y.id !== n.id))}
                      >
                        <div className="flex w-full justify-between">
                          <span className="font-medium">{n.title}</span>
                          <span className="text-[10px] text-muted-foreground">{n.time}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{n.body}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Tip label="2 alerts need attention">
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="rounded-full"
                    aria-label="Alerts"
                    onClick={() => setToast('No critical alerts right now')}
                  >
                    <Icon icon={AlertCircleIcon} />
                  </Button>
                </Tip>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full bg-card py-1 pr-3 pl-1 transition hover:bg-card/70"
                  >
                    <Avatar>
                      <AvatarFallback>SR</AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left text-xs leading-tight sm:block">
                      <div className="font-medium">Sajibur Rahman</div>
                      <div className="text-muted-foreground">sajibur.rahman@gm...</div>
                    </div>
                    <Icon icon={ArrowDown01Icon} size={14} className="text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setToast('Profile coming soon')}>
                    <Icon icon={UserGroupIcon} size={16} /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setToast('Settings coming soon')}>
                    <Icon icon={Settings02Icon} size={16} /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setToast('Signed out (demo)')}>
                    <Icon icon={Logout03Icon} size={16} /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="mt-5 flex gap-4">
            {/* Left rail */}
            <aside className="hidden w-12 shrink-0 flex-col justify-between lg:flex">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-1 rounded-full bg-card p-1">
                  <Button
                    variant={dark ? 'ghost' : 'default'}
                    size="icon-lg"
                    className="rounded-full"
                    onClick={() => setDark(false)}
                    aria-label="Light mode"
                  >
                    <Icon icon={Sun01Icon} />
                  </Button>
                  <Button
                    variant={dark ? 'default' : 'ghost'}
                    size="icon-lg"
                    className="rounded-full"
                    onClick={() => setDark(true)}
                    aria-label="Dark mode"
                  >
                    <Icon icon={Moon02Icon} />
                  </Button>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-full bg-card p-1">
                  {RAIL.map((r, i) => (
                    <Tip key={r.label} label={r.label}>
                      <Button
                        variant={rail === i ? 'default' : 'ghost'}
                        size="icon-lg"
                        aria-label={r.label}
                        onClick={() => setRail(i)}
                        className={cn('rounded-full', rail !== i && 'text-muted-foreground')}
                      >
                        <Icon icon={r.icon} />
                      </Button>
                    </Tip>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-full bg-card p-1">
                <Tip label="Help">
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="rounded-full text-muted-foreground"
                    aria-label="Help"
                    onClick={() => setToast('Help center opens here')}
                  >
                    <Icon icon={HelpCircleIcon} />
                  </Button>
                </Tip>
                <Tip label="Log out">
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="rounded-full text-muted-foreground"
                    aria-label="Log out"
                    onClick={() => setToast('Signed out (demo)')}
                  >
                    <Icon icon={Logout03Icon} />
                  </Button>
                </Tip>
              </div>
            </aside>

            <main className="min-w-0 flex-1">
              <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Good morning, Sajibur</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Stay on top of your tasks, monitor progress, and track status.
              </p>

              <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1.1fr)]">
                {/* Balance */}
                <Card className="rounded-3xl py-5 [--card-spacing:--spacing(5)]">
                  <CardContent className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-muted-foreground">Total Balance</div>
                        <div className="mt-1 text-3xl font-medium tracking-tight tabular-nums">
                          {money(totalUsd * cur.rate, cur.symbol)}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <Delta up>5%</Delta> than last month
                        </div>
                      </div>
                      <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
                        <SelectTrigger size="sm" className="w-24 rounded-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(RATES) as CurrencyCode[]).map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button size="lg" className="h-11 rounded-full" onClick={() => openDialog('transfer')}>
                        <Icon icon={ArrowLeftRightIcon} size={16} /> Transfer
                      </Button>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="h-11 rounded-full"
                        onClick={() => openDialog('request')}
                      >
                        <Icon icon={ArrowLeftRightIcon} size={16} /> Request
                      </Button>
                    </div>

                    <div className="rounded-2xl bg-muted p-3">
                      <div className="mb-2 text-xs">
                        <span className="font-medium">Wallets</span>
                        <span className="text-muted-foreground"> | Total 6 wallets</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {wallets.map((w) => (
                          <button
                            type="button"
                            key={w.code}
                            onClick={() => setCurrency(w.code)}
                            className={cn(
                              'rounded-xl bg-card p-2.5 text-left transition hover:-translate-y-0.5 hover:shadow-sm',
                              currency === w.code && 'ring-2 ring-orange-400',
                            )}
                          >
                            <div className="flex items-center justify-between text-xs font-medium">
                              <span className="flex items-center gap-1">
                                <Icon icon={RATES[w.code].icon} size={14} /> {w.code}
                              </span>
                              <Icon icon={MoreVerticalIcon} size={12} className="text-muted-foreground" />
                            </div>
                            <div className="mt-2 text-[11px] font-medium tabular-nums">
                              {money(w.amount, RATES[w.code].symbol)}
                            </div>
                            <div className="text-[9px] text-muted-foreground">Limit is {w.limit}</div>
                            <div className={cn('text-[9px]', w.active ? 'text-emerald-600' : 'text-red-500')}>
                              {w.active ? 'Active' : 'Inactive'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stat tiles */}
                <Card className="rounded-3xl py-3 [--card-spacing:--spacing(3)]">
                  <CardContent className="grid h-full grid-cols-2 gap-3">
                    {STATS.map((s) => (
                      <div
                        key={s.label}
                        className={cn(
                          'flex flex-col justify-between rounded-2xl p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md',
                          s.featured ? 'bg-linear-to-br from-orange-400 to-red-500 text-white' : 'bg-muted',
                        )}
                      >
                        <div className="flex items-start justify-between gap-2 text-sm">
                          <span className={s.featured ? 'text-white/90' : 'text-muted-foreground'}>{s.label}</span>
                          <span
                            className={cn(
                              'grid size-8 shrink-0 place-items-center rounded-full',
                              s.featured ? 'bg-white/25' : 'bg-card',
                            )}
                          >
                            <Icon icon={s.icon} size={15} />
                          </span>
                        </div>
                        <div className="mt-6 text-3xl font-medium tracking-tight tabular-nums">
                          {cur.symbol}
                          {Math.round(s.value * cur.rate).toLocaleString()}
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-[11px]">
                          {s.featured ? (
                            <Badge className="gap-0.5 border-0 bg-white/25 text-white">
                              <Icon icon={ArrowUpRight01Icon} size={12} />
                              {s.delta}
                            </Badge>
                          ) : (
                            <Delta up={s.up}>{s.delta}</Delta>
                          )}
                          <span className={s.featured ? 'text-white/80' : 'text-muted-foreground'}>This month</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Income chart */}
                <Card className="rounded-3xl py-5 [--card-spacing:--spacing(5)] md:col-span-2 xl:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-xl">Total Income</CardTitle>
                    <CardDescription>View your income in a certain period of time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IncomeChart />
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)]">
                <div className="min-w-0 space-y-4">
                  <Card className="rounded-3xl py-5 [--card-spacing:--spacing(5)]">
                    <CardContent className="space-y-3">
                      <div className="font-medium">Monthly Spending Limit</div>
                      <Progress value={Math.min(100, (spent / 5500) * 100)} className="h-3 [&>div]:bg-orange-500" />
                      <div className="flex justify-between text-[11px]">
                        <span className="font-medium tabular-nums">
                          {money(spent)} <span className="font-normal text-muted-foreground">spent out of</span>
                        </span>
                        <span className="text-muted-foreground">$5,500.00</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-3xl py-5 [--card-spacing:--spacing(5)]">
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-xl bg-muted">
                            <Icon icon={CreditCardIcon} />
                          </span>
                          <span className="font-medium">My Cards</span>
                        </div>
                        <Button variant="secondary" size="sm" className="rounded-full" onClick={addCard}>
                          <Icon icon={Add01Icon} size={12} /> Add new
                        </Button>
                      </div>
                      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pt-3 pb-3">
                        {cards.map((c) => (
                          <BankCard
                            key={c.id}
                            card={c}
                            selected={cardId === c.id}
                            onSelect={() => setCardId(c.id)}
                            onFreeze={() =>
                              setCards((cs) => cs.map((x) => (x.id === c.id ? { ...x, frozen: !x.frozen } : x)))
                            }
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Activities */}
                <Card className="min-w-0 rounded-3xl py-5 [--card-spacing:--spacing(5)]">
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-xl font-medium">Recent Activities</h2>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Icon
                            icon={Search01Icon}
                            size={16}
                            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                          />
                          <Input
                            id="activity-search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search"
                            className="h-9 w-44 rounded-full pl-9"
                          />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-9 rounded-full">
                              Filter
                              {statusFilter.length < STATUSES.length && (
                                <Badge className="size-4 justify-center rounded-full p-0 text-[10px]">
                                  {statusFilter.length}
                                </Badge>
                              )}
                              <Icon icon={FilterHorizontalIcon} size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuLabel>Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {STATUSES.map((s) => (
                              <DropdownMenuCheckboxItem
                                key={s}
                                checked={statusFilter.includes(s)}
                                onSelect={(e) => e.preventDefault()}
                                onCheckedChange={(v) =>
                                  setStatusFilter((f) => (v ? [...f, s] : f.filter((x) => x !== s)))
                                }
                              >
                                <span className={cn('mr-1 size-1.5 rounded-full', STATUS_DOT[s])} />
                                {s}
                              </DropdownMenuCheckboxItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => setStatusFilter(STATUSES)}>Reset filter</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {selected.length > 0 && (
                      <div className="flex items-center justify-between rounded-xl bg-orange-50 px-3 py-2 text-xs text-orange-900 dark:bg-orange-950 dark:text-orange-100">
                        {selected.length} selected
                        <div className="flex gap-1">
                          <Button size="xs" variant="ghost" onClick={() => setSelected([])}>
                            Clear
                          </Button>
                          <Button size="xs" variant="destructive" onClick={() => deleteRows(selected)}>
                            <Icon icon={Delete02Icon} size={12} /> Delete
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="overflow-hidden rounded-2xl border">
                      <Table>
                        <TableHeader className="bg-muted">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-10">
                              <Checkbox
                                checked={allSelected}
                                onCheckedChange={(v) =>
                                  setSelected((s) =>
                                    v
                                      ? [...new Set([...s, ...rows.map((r) => r.id)])]
                                      : s.filter((id) => !rows.some((r) => r.id === id)),
                                  )
                                }
                                aria-label="Select all"
                              />
                            </TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>
                              <button type="button" className="flex items-center gap-1" onClick={() => toggleSort('price')}>
                                Price {sortIcon('price')}
                              </button>
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>
                              <button type="button" className="flex items-center gap-1" onClick={() => toggleSort('date')}>
                                Date {sortIcon('date')}
                              </button>
                            </TableHead>
                            <TableHead className="w-8" />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rows.length === 0 && (
                            <TableRow className="hover:bg-transparent">
                              <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                                No activities match your filters.
                              </TableCell>
                            </TableRow>
                          )}
                          {rows.map((a) => (
                            <TableRow key={a.id} data-state={selected.includes(a.id) ? 'selected' : undefined}>
                              <TableCell>
                                <Checkbox
                                  checked={selected.includes(a.id)}
                                  onCheckedChange={(v) =>
                                    setSelected((s) => (v ? [...s, a.id] : s.filter((x) => x !== a.id)))
                                  }
                                  aria-label={`Select ${a.id}`}
                                />
                              </TableCell>
                              <TableCell className="text-muted-foreground">{a.id}</TableCell>
                              <TableCell>
                                <span className="flex items-center gap-2.5 font-medium">
                                  <span className={cn('grid size-6 place-items-center rounded-md', a.color)}>
                                    <Icon icon={a.icon} size={14} />
                                  </span>
                                  {a.name}
                                </span>
                              </TableCell>
                              <TableCell className="tabular-nums">{moneyInt(a.price)}</TableCell>
                              <TableCell>
                                <span className="flex items-center gap-1.5">
                                  <span className={cn('size-1.5 rounded-full', STATUS_DOT[a.status])} />
                                  {a.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-muted-foreground">{fmtDate(a.date)}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${a.id}`}>
                                      <Icon icon={MoreHorizontalIcon} size={16} className="text-muted-foreground" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onSelect={() =>
                                        setToast(`${a.name} — ${moneyInt(a.price)} · ${a.status}`)
                                      }
                                    >
                                      <Icon icon={ViewIcon} size={16} /> View details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onSelect={() => {
                                        navigator.clipboard?.writeText(a.id)
                                        setToast(`Copied ${a.id}`)
                                      }}
                                    >
                                      <Icon icon={Copy01Icon} size={16} /> Copy ID
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive" onSelect={() => deleteRows([a.id])}>
                                      <Icon icon={Delete02Icon} size={16} /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>

        {/* Transfer / Request dialog */}
        <Dialog open={dialog !== null} onOpenChange={(o) => !o && setDialog(null)}>
          <DialogContent className="sm:max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
              className="space-y-4"
            >
              <DialogHeader>
                <DialogTitle>{dialog === 'transfer' ? 'Transfer money' : 'Request money'}</DialogTitle>
                <DialogDescription>
                  {dialog === 'transfer'
                    ? 'Send funds from one of your wallets.'
                    : 'Ask someone to pay you into a wallet.'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-1.5">
                <Label htmlFor="who">{dialog === 'transfer' ? 'Recipient' : 'Request from'}</Label>
                <Input id="who" value={who} onChange={(e) => setWho(e.target.value)} placeholder="Name or email" />
              </div>

              <div className="grid grid-cols-[1fr_7rem] gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    aria-invalid={!!amountError}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{dialog === 'transfer' ? 'From' : 'Into'}</Label>
                  <Select value={from} onValueChange={(v) => setFrom(v as CurrencyCode)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {wallets.map((w) => (
                        <SelectItem key={w.code} value={w.code} disabled={!w.active}>
                          {w.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="-mt-2 text-xs text-muted-foreground">
                {amountError ? (
                  <span className="text-destructive">{amountError}</span>
                ) : (
                  <>Available: {money(available, RATES[from].symbol)}</>
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialog(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!canSubmit}>
                  {dialog === 'transfer' ? 'Send' : 'Send request'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Toast */}
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm text-background shadow-lg transition-all duration-300',
            toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
          )}
        >
          <Icon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-400" />
          {toast}
        </div>
      </div>
    </TooltipProvider>
  )
}
