import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, Cancel01Icon, CheckmarkCircle02Icon, Search01Icon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

export interface GalleryItem {
  key: string
  label: string
  description: string
  icon: typeof Add01Icon
  gradient: string
  size: string
  added: boolean
}

interface Props {
  open: boolean
  items: GalleryItem[]
  onClose: () => void
  onAdd: (key: string) => void
}

/** Launchpad-style widget picker: blurred backdrop, search bar, tiles that pop in. */
export function WidgetGallery({ open, items, onClose, onAdd }: Props) {
  const [query, setQuery] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const state = open ? 'open' : 'closed'

  // Focus the search on open; clear it once the overlay has faded out.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => input.current?.focus(), 150)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setQuery(''), 400)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const q = query.trim().toLowerCase()
  const list = items.filter((i) => !q || `${i.label} ${i.description}`.toLowerCase().includes(q))
  const backdropClick = (e: React.MouseEvent) => e.target === e.currentTarget && onClose()

  return createPortal(
    <div
      data-state={state}
      role="dialog"
      aria-modal="true"
      aria-label="Add widget"
      aria-hidden={!open}
      inert={!open}
      onMouseDown={backdropClick}
      className="fixed inset-0 z-[70] flex flex-col items-center bg-white/55 backdrop-blur-2xl transition-[opacity,visibility] duration-300 data-[state=closed]:invisible data-[state=closed]:opacity-0 dark:bg-black/55"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-foreground/5 text-foreground/70 transition hover:bg-foreground/10"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={18} />
      </button>

      <div
        onMouseDown={backdropClick}
        className="flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center gap-8 px-6 pt-16 pb-8"
      >
        <div
          className={cn(
            'relative w-[min(30rem,100%)] transition duration-500 ease-out',
            !open && '-translate-y-4 scale-95 opacity-0',
          )}
        >
          <HugeiconsIcon
            icon={Search01Icon}
            size={18}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const first = list.find((i) => !i.added)
                if (first) onAdd(first.key)
              }
            }}
            placeholder="Search widgets"
            className="h-12 w-full rounded-full border border-foreground/10 bg-white/70 pr-14 pl-11 text-base shadow-lg outline-none backdrop-blur placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-orange-300 dark:bg-white/10"
          />
          <kbd className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md border bg-background/70 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            esc
          </kbd>
        </div>

        <div onMouseDown={backdropClick} className="min-h-0 w-full flex-1 overflow-y-auto pb-6">
          {list.length === 0 ? (
            <div className="grid h-40 place-items-center text-muted-foreground">No widgets match “{query}”</div>
          ) : (
            <div
              onMouseDown={backdropClick}
              className="mx-auto grid grid-cols-[repeat(auto-fill,minmax(10.5rem,1fr))] gap-x-6 gap-y-8 px-1"
            >
              {list.map((w, i) => (
                <button
                  key={w.key}
                  type="button"
                  disabled={w.added}
                  onClick={() => onAdd(w.key)}
                  style={{ transitionDelay: open ? `${60 + i * 35}ms` : '0ms' }}
                  className={cn(
                    'group flex flex-col items-center gap-3 text-center outline-none transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    !open && 'translate-y-6 scale-75 opacity-0',
                    w.added && 'cursor-default opacity-55',
                  )}
                >
                  <span
                    className={cn(
                      'relative grid aspect-square w-full place-items-center rounded-[1.75rem] text-white shadow-xl ring-1 ring-black/5 transition duration-200',
                      w.gradient,
                      !w.added &&
                        'group-hover:-translate-y-1 group-hover:scale-[1.04] group-focus-visible:ring-4 group-focus-visible:ring-orange-300',
                    )}
                  >
                    <HugeiconsIcon icon={w.icon} size={44} />
                    <span className="absolute right-2.5 bottom-2.5 grid size-7 place-items-center rounded-full bg-white/90 text-neutral-800 shadow">
                      <HugeiconsIcon icon={w.added ? CheckmarkCircle02Icon : Add01Icon} size={14} />
                    </span>
                  </span>
                  <span className="space-y-0.5">
                    <span className="block text-sm font-medium">{w.label}</span>
                    <span className="block text-xs leading-snug text-muted-foreground">
                      {w.added ? 'On your dashboard' : w.description}
                    </span>
                    <span className="block text-[10px] text-muted-foreground/80">{w.size} cells</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
