import { useEffect, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Add01Icon,
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowLeftRightIcon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  Coins01Icon,
  CreditCardIcon,
  DashboardSquare01Icon,
  File01Icon,
  FilterHorizontalIcon,
  HelpCircleIcon,
  Layers01Icon,
  Logout03Icon,
  Mail01Icon,
  MoneyBag02Icon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  Moon02Icon,
  Notification03Icon,
  Search01Icon,
  Settings02Icon,
  SparklesIcon,
  Sun01Icon,
  UserGroupIcon,
  Wallet01Icon,
  ArrowUp01Icon,
} from '@hugeicons/core-free-icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
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
import { cn } from '@/lib/utils'

type IconType = typeof Sun01Icon

const nav = ['Overview', 'Activity', 'Manage', 'Program', 'Account', 'Reports']

const sideIcons: IconType[] = [
  DashboardSquare01Icon,
  Calendar03Icon,
  Mail01Icon,
  File01Icon,
  UserGroupIcon,
  Layers01Icon,
  Settings02Icon,
]

const wallets = [
  { code: 'USD', flag: '🇺🇸', amount: '$22,678.00', limit: '$10k a month', active: true },
  { code: 'EUR', flag: '🇩🇪', amount: '€18,345.00', limit: '€8k a month', active: true },
  { code: 'GBP', flag: '🇬🇧', amount: '£15,000.00', limit: '£7.5k a month', active: false },
]

const stats: {
  label: string
  value: string
  delta: string
  up: boolean
  icon: IconType
  featured?: boolean
}[] = [
  { label: 'Total Earnings', value: '$950', delta: '7%', up: true, icon: Wallet01Icon, featured: true },
  { label: 'Total Spending', value: '$700', delta: '5%', up: false, icon: MoneyBag02Icon },
  { label: 'Total Income', value: '$1,050', delta: '8%', up: true, icon: Coins01Icon },
  { label: 'Total Revenue', value: '$850', delta: '4%', up: true, icon: MoneyBag02Icon },
]

const chart = [
  { m: 'Jan', profit: 22, loss: 15 },
  { m: 'Feb', profit: 18, loss: 24 },
  { m: 'Mar', profit: 14, loss: 22 },
  { m: 'Apr', profit: 20, loss: 19 },
  { m: 'May', profit: 17, loss: 26 },
  { m: 'Jun', profit: 28, loss: 20 },
  { m: 'Jul', profit: 21, loss: 20 },
  { m: 'Aug', profit: 15, loss: 18 },
]

const activities = [
  { id: 'INV_000076', name: 'Mobile App Purchase', price: '$25,500', status: 'Completed', date: '17 Apr, 2026 03:45 PM', color: 'bg-sky-500' },
  { id: 'INV_000075', name: 'Hotel Booking', price: '$32,750', status: 'Pending', date: '15 Apr, 2026 11:30 AM', color: 'bg-indigo-700' },
  { id: 'INV_000074', name: 'Flight Ticket Booking', price: '$40,200', status: 'Completed', date: '15 Apr, 2026 12:00 PM', color: 'bg-cyan-500' },
  { id: 'INV_000073', name: 'Grocery Purchase', price: '$50,200', status: 'In Progress', date: '14 Apr, 2026 09:15 PM', color: 'bg-yellow-400' },
  { id: 'INV_000072', name: 'Software License', price: '$15,900', status: 'Completed', date: '10 Apr, 2026 06:00 AM', color: 'bg-red-600' },
]

const statusDot: Record<string, string> = {
  Completed: 'bg-emerald-500',
  Pending: 'bg-red-500',
  'In Progress': 'bg-amber-400',
}

function Icon({ icon, size = 18, className }: { icon: IconType; size?: number; className?: string }) {
  return <HugeiconsIcon icon={icon} size={size} className={className} />
}

function Delta({ up, children, className }: { up: boolean; children: string; className?: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'gap-0.5 border-0 font-medium',
        up ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600',
        className,
      )}
    >
      <Icon icon={up ? ArrowUp01Icon : ArrowDown01Icon} size={12} />
      {children}
    </Badge>
  )
}

function IncomeChart() {
  const W = 480
  const H = 190
  const left = 40
  const bottom = 24
  const max = 50
  const plotH = H - bottom - 8
  const slot = (W - left) / chart.length
  const barW = 26
  const y = (v: number) => 8 + plotH - (v / max) * plotH

  return (
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
      {chart.map((d, i) => {
        const x = left + i * slot + (slot - barW) / 2
        const profitH = (d.profit / max) * plotH
        const lossH = (d.loss / max) * plotH
        return (
          <g key={d.m}>
            <rect x={x} y={y(d.profit)} width={barW} height={profitH} rx="6" className="fill-foreground" />
            <rect x={x} y={y(d.profit) - lossH - 2} width={barW} height={lossH} rx="6" fill="url(#hatch)" />
            <text x={x + barW / 2} y={H - 6} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              {d.m}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function BankCard({ variant, last }: { variant: 'dark' | 'brand'; last: string }) {
  return (
    <div
      className={cn(
        'flex h-36 w-60 shrink-0 flex-col justify-between rounded-2xl p-4 text-white',
        variant === 'dark' ? 'bg-neutral-900' : 'bg-linear-to-br from-orange-500 to-red-500',
      )}
    >
      <div className="flex items-center justify-between">
        <Badge className="bg-white/90 text-neutral-800">Active</Badge>
        {variant === 'dark' ? (
          <div className="flex -space-x-2">
            <span className="size-5 rounded-full bg-red-500" />
            <span className="size-5 rounded-full bg-amber-500/90" />
          </div>
        ) : (
          <Icon icon={SparklesIcon} size={22} />
        )}
      </div>
      <div className="flex justify-between text-[10px] text-white/60">
        <div>
          Card Number
          <div className="text-xs text-white">**** **** {last}</div>
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
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [active, setActive] = useState('Overview')
  const [selected, setSelected] = useState<string[]>(['INV_000073'])
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const rows = activities.filter((a) =>
    `${a.id} ${a.name}`.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-neutral-200/70 p-3 sm:p-6 dark:bg-neutral-950">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] bg-neutral-100 p-4 sm:p-5 dark:bg-neutral-900">
        {/* Top bar */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-full bg-card py-1.5 pr-4 pl-1.5">
            <span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-orange-400 to-red-500 font-bold text-white">
              F
            </span>
            <span className="font-semibold">Finexy</span>
          </div>

          <nav className="hidden items-center gap-1 rounded-full bg-card p-1.5 md:flex">
            {nav.map((n) => (
              <Button
                key={n}
                variant={active === n ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActive(n)}
                className={cn('h-8 rounded-full px-4', active !== n && 'text-muted-foreground')}
              >
                {n}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full bg-card p-1">
              <Button variant="ghost" size="icon-lg" className="rounded-full" aria-label="Search">
                <Icon icon={Search01Icon} />
              </Button>
              <Button variant="ghost" size="icon-lg" className="relative rounded-full" aria-label="Notifications">
                <Icon icon={Notification03Icon} />
                <span className="absolute top-2 right-2.5 size-1.5 rounded-full bg-orange-500" />
              </Button>
              <Button variant="ghost" size="icon-lg" className="rounded-full" aria-label="Alerts">
                <Icon icon={AlertCircleIcon} />
              </Button>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card py-1 pr-3 pl-1">
              <Avatar>
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
              <div className="hidden text-xs leading-tight sm:block">
                <div className="font-medium">Sajibur Rahman</div>
                <div className="text-muted-foreground">sajibur.rahman@gm...</div>
              </div>
              <Icon icon={ArrowDown01Icon} size={14} className="text-muted-foreground" />
            </div>
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
                {sideIcons.map((ic, i) => (
                  <Button
                    key={i}
                    variant={i === 0 ? 'default' : 'ghost'}
                    size="icon-lg"
                    className={cn('rounded-full', i !== 0 && 'text-muted-foreground')}
                  >
                    <Icon icon={ic} />
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-full bg-card p-1">
              <Button variant="ghost" size="icon-lg" className="rounded-full text-muted-foreground" aria-label="Help">
                <Icon icon={HelpCircleIcon} />
              </Button>
              <Button variant="ghost" size="icon-lg" className="rounded-full text-muted-foreground" aria-label="Log out">
                <Icon icon={Logout03Icon} />
              </Button>
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
                      <div className="mt-1 text-3xl font-medium tracking-tight">$689,372.00</div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Delta up>5%</Delta> than last month
                      </div>
                    </div>
                    <Select defaultValue="usd">
                      <SelectTrigger size="sm" className="w-24 rounded-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">🇺🇸 USD</SelectItem>
                        <SelectItem value="eur">🇩🇪 EUR</SelectItem>
                        <SelectItem value="gbp">🇬🇧 GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button size="lg" className="h-11 rounded-full">
                      <Icon icon={ArrowLeftRightIcon} size={16} /> Transfer
                    </Button>
                    <Button size="lg" variant="secondary" className="h-11 rounded-full">
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
                        <div key={w.code} className="rounded-xl bg-card p-2.5">
                          <div className="flex items-center justify-between text-xs font-medium">
                            <span>
                              {w.flag} {w.code}
                            </span>
                            <Icon icon={MoreVerticalIcon} size={12} className="text-muted-foreground" />
                          </div>
                          <div className="mt-2 text-[11px] font-medium">{w.amount}</div>
                          <div className="text-[9px] text-muted-foreground">Limit is {w.limit}</div>
                          <div className={cn('text-[9px]', w.active ? 'text-emerald-600' : 'text-red-500')}>
                            {w.active ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stat tiles */}
              <Card className="rounded-3xl py-3 [--card-spacing:--spacing(3)]">
                <CardContent className="grid h-full grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className={cn(
                        'flex flex-col justify-between rounded-2xl p-4',
                        s.featured
                          ? 'bg-linear-to-br from-orange-400 to-red-500 text-white'
                          : 'bg-muted',
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
                      <div className="mt-6 text-3xl font-medium tracking-tight">{s.value}</div>
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
                  <div className="rounded-2xl bg-muted p-3">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium">Profit and Loss</span>
                      <span className="flex items-center gap-3 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="size-2 rounded-sm bg-blue-500" /> Profit
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="size-2 rounded-sm bg-foreground" /> Loss
                        </span>
                      </span>
                    </div>
                    <IncomeChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)]">
              <div className="space-y-4">
                <Card className="rounded-3xl py-5 [--card-spacing:--spacing(5)]">
                  <CardContent className="space-y-3">
                    <div className="font-medium">Monthly Spending Limit</div>
                    <Progress value={25} className="h-3 [&>div]:bg-orange-500" />
                    <div className="flex justify-between text-[11px]">
                      <span className="font-medium">
                        $1,400.00 <span className="font-normal text-muted-foreground">spent out of</span>
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
                      <Button variant="secondary" size="sm" className="rounded-full">
                        <Icon icon={Add01Icon} size={12} /> Add new
                      </Button>
                    </div>
                    <div className="-mr-5 flex gap-3 overflow-hidden">
                      <BankCard variant="dark" last="6782" />
                      <BankCard variant="brand" last="4356" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activities */}
              <Card className="rounded-3xl py-5 [--card-spacing:--spacing(5)]">
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
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search"
                          className="h-9 w-44 rounded-full pl-9"
                        />
                      </div>
                      <Button variant="outline" className="h-9 rounded-full">
                        Filter <Icon icon={FilterHorizontalIcon} size={14} />
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border">
                    <Table>
                      <TableHeader className="bg-muted">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-10">
                            <Checkbox
                              checked={selected.length === activities.length}
                              onCheckedChange={(v) =>
                                setSelected(v ? activities.map((a) => a.id) : [])
                              }
                              aria-label="Select all"
                            />
                          </TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Activity</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="w-8" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.map((a) => (
                          <TableRow
                            key={a.id + a.name}
                            data-state={selected.includes(a.id) ? 'selected' : undefined}
                          >
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
                                <span className={cn('size-4 rounded-sm', a.color)} />
                                {a.name}
                              </span>
                            </TableCell>
                            <TableCell>{a.price}</TableCell>
                            <TableCell>
                              <span className="flex items-center gap-1.5">
                                <span className={cn('size-1.5 rounded-full', statusDot[a.status])} />
                                {a.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{a.date}</TableCell>
                            <TableCell>
                              <Icon icon={MoreHorizontalIcon} size={16} className="text-muted-foreground" />
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
    </div>
  )
}
