export interface TreeNode {
  type: 'folder' | 'file'
  name: string
  ext?: string
  children?: TreeNode[]
}

export interface YearMeta {
  label: string
  period: string
  zip: string
  intro: string
  tree: TreeNode[]
}
