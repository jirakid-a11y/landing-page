import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowRight01Icon,
  ChartLineData01Icon,
  CheckmarkCircle02Icon,
  FlashIcon,
  PaintBoardIcon,
  Rocket01Icon,
  Shield01Icon,
  StarIcon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const features = [
  {
    icon: FlashIcon,
    title: 'Lightning fast',
    description: 'Ship in minutes with sensible defaults and zero config.',
  },
  {
    icon: Shield01Icon,
    title: 'Secure by default',
    description: 'Best-practice security baked in so you can sleep at night.',
  },
  {
    icon: PaintBoardIcon,
    title: 'Beautiful design',
    description: 'Clean, accessible components you fully own and customize.',
  },
  {
    icon: ChartLineData01Icon,
    title: 'Actionable insights',
    description: 'Understand what is working with clear, simple analytics.',
  },
  {
    icon: UserGroupIcon,
    title: 'Built for teams',
    description: 'Collaborate in real time and keep everyone in sync.',
  },
  {
    icon: Rocket01Icon,
    title: 'Scales with you',
    description: 'From first prototype to millions of users, no rewrites.',
  },
]

const perks = ['Free 14-day trial', 'No credit card required', 'Cancel anytime']

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HugeiconsIcon icon={FlashIcon} size={18} />
          </span>
          Acme
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#cta" className="hover:text-foreground">Get started</a>
        </nav>
        <Button size="sm">Sign in</Button>
      </header>

      <main>
        <section className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center">
          <Badge variant="secondary" className="mb-6 gap-1.5">
            <HugeiconsIcon icon={StarIcon} size={14} />
            Now in public beta
          </Badge>
          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">
            Build your next idea,{' '}
            <span className="text-muted-foreground">faster than ever.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A simple, powerful platform to design, launch, and grow your product
            — without the busywork.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg">
              Get started
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </Button>
            <Button size="lg" variant="outline">Learn more</Button>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need
            </h2>
            <p className="mt-3 text-muted-foreground">
              Powerful features, thoughtfully designed.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted">
                    <HugeiconsIcon icon={f.icon} size={22} />
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-2xl bg-primary px-8 py-14 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-3">
              Join thousands of builders shipping with Acme today.
            </p>
            <Button size="lg" variant="secondary" className="mt-8">
              Start free trial
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </Button>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Acme. All rights reserved.
      </footer>
    </div>
  )
}
