export interface RecentItem {
  type: 'folder' | 'file'
  name: string
  href: string
  year: string
  ext?: string
  ts: number
}

const STORAGE_KEY = 'fermi-recents'
const MAX_ITEMS = 4

export function useRecent() {
  const recents = useState<RecentItem[]>('recents', () => [])

  function load() {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) recents.value = JSON.parse(raw)
    } catch { /* ignore */ }
  }

  function save() {
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recents.value))
    } catch { /* ignore */ }
  }

  function add(item: Omit<RecentItem, 'ts'>) {
    if (!import.meta.client) return
    const filtered = recents.value.filter(r => r.href !== item.href)
    recents.value = [{ ...item, ts: Date.now() }, ...filtered].slice(0, MAX_ITEMS)
    save()
  }

  function clear() {
    recents.value = []
    save()
  }

  return { recents, add, clear, load }
}
