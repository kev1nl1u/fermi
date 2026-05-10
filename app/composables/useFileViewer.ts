interface ViewerFile {
  url: string
  name: string
  ext: string
}

const OVERLAY_EXTS = new Set([
  'pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg',
  'txt', 'java', 'js', 'ts', 'html', 'css', 'md', 'xml', 'json',
])

export function useFileViewer() {
  const file = useState<ViewerFile | null>('viewer-file', () => null)

  function open(url: string, name: string, ext: string) {
    const e = ext.toLowerCase()
    if (!OVERLAY_EXTS.has(e)) {
      window.open(url, '_blank')
      return
    }
    file.value = { url, name, ext: e }
  }

  function close() {
    file.value = null
  }

  return { file, open, close }
}
