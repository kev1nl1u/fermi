import type { TreeNode, YearMeta } from '~/types/moodle'

const years: Record<string, YearMeta> = {
  '3CIIN': {
    label: '3CIIN',
    period: '2021 / 2022',
    zip: null,
    intro: 'Appunti personali 3CIIN',
    tree: [
      {
        type: 'folder', name: 'Sistemi', children: [
          {
            type: 'folder', name: 'Assembly', children: [
              { type: 'file', name: 'divisione.asm', ext: 'asm' },
              { type: 'file', name: 'max2.asm', ext: 'asm' },
              { type: 'file', name: 'max3.asm', ext: 'asm' },
              { type: 'file', name: 'max_somma_diff.asm', ext: 'asm' },
              { type: 'file', name: 'prodotto2.asm', ext: 'asm' },
              { type: 'file', name: 'Relazione assembly 3CIIN.pdf', ext: 'pdf' },
              { type: 'file', name: 'Relazione Assembly Liu.pdf', ext: 'pdf' },
              { type: 'file', name: 'somma3.asm', ext: 'asm' },
              { type: 'file', name: 'somma_primi_15.asm', ext: 'asm' },
              { type: 'file', name: 'somma_stack.asm', ext: 'asm' },
            ],
          },
          { type: 'file', name: 'CPU.docx', ext: 'docx' },
          {
            type: 'folder', name: 'opbit', children: [
              { type: 'file', name: '01.c', ext: 'c' },
              { type: 'file', name: '02.c', ext: 'c' },
              { type: 'file', name: '03.c', ext: 'c' },
              { type: 'file', name: '04.c', ext: 'c' },
              { type: 'file', name: '05.c', ext: 'c' },
              { type: 'file', name: '06.c', ext: 'c' },
              { type: 'file', name: '07_piu_significativo_Liu.c', ext: 'c' },
              { type: 'file', name: '08_azzera_posizione_Liu.c', ext: 'c' },
              { type: 'file', name: '09_somma_bit_Liu.c', ext: 'c' },
            ],
          },
          { type: 'file', name: 'Relazione_Simulazione_Automa_Liu.pdf', ext: 'pdf' },
        ],
      },
      {
        type: 'folder', name: 'TDP', children: [
          { type: 'file', name: 'code.c', ext: 'c' },
          { type: 'file', name: 'index copy.html', ext: 'html' },
          { type: 'file', name: 'index.html', ext: 'html' },
          {
            type: 'folder', name: 'Verifica 3BIIN', children: [
              { type: 'file', name: '01.c', ext: 'c' },
              { type: 'file', name: '02.c', ext: 'c' },
              { type: 'file', name: '03.c', ext: 'c' },
            ],
          },
        ],
      },
    ],
  },
}

export function useAppuntiTree() {
  function getMeta(year: string): YearMeta | undefined {
    return years[year]
  }

  function getAtPath(year: string, pathSegments: string[]): TreeNode | undefined {
    const meta = years[year]
    if (!meta) return undefined
    if (!pathSegments.length) return undefined
    return traverse(meta.tree, pathSegments)
  }

  function traverse(nodes: TreeNode[], segments: string[]): TreeNode | undefined {
    const [head, ...rest] = segments
    const node = nodes.find(n => n.name === head)
    if (!node) return undefined
    if (!rest.length) return node
    if (node.type === 'folder' && node.children) {
      return traverse(node.children, rest)
    }
    return undefined
  }

  return { getMeta, getAtPath, years: Object.keys(years) }
}
