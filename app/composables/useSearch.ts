import type { TreeNode } from '~/types/moodle'

export interface SearchResult {
  type: 'folder' | 'file'
  name: string
  ext?: string
  year: string
  parentPath: string[]
  href: string
}

export function useSearch() {
  const { years, getMeta } = useMoodleTree()

  function flatten(nodes: TreeNode[], year: string, parentPath: string[] = []): SearchResult[] {
    const out: SearchResult[] = []
    for (const node of nodes) {
      const path = [...parentPath, node.name]
      const segs = [year, ...path].map(encodeURIComponent).join('/')
      out.push({
        type: node.type,
        name: node.name,
        ext: node.ext,
        year,
        parentPath,
        href: node.type === 'folder' ? `/appunti/${segs}` : `/Moodle/${segs}`,
      })
      if (node.type === 'folder' && node.children) {
        out.push(...flatten(node.children, year, path))
      }
    }
    return out
  }

  const allItems = computed<SearchResult[]>(() => {
    const out: SearchResult[] = []
    for (const y of years) {
      const meta = getMeta(y)
      if (meta) out.push(...flatten(meta.tree, y))
    }
    return out
  })

  function search(query: string, limit = 30): SearchResult[] {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const exact: SearchResult[] = []
    const partial: SearchResult[] = []
    for (const item of allItems.value) {
      const name = item.name.toLowerCase()
      if (name.startsWith(q)) exact.push(item)
      else if (name.includes(q) || item.parentPath.some(p => p.toLowerCase().includes(q))) partial.push(item)
      if (exact.length + partial.length >= limit * 2) break
    }
    return [...exact, ...partial].slice(0, limit)
  }

  return { search, allItems }
}
