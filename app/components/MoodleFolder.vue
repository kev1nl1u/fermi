<script setup lang="ts">
import type { TreeNode } from '~/types/moodle'

const props = defineProps<{
  year: string
  pathSegments: string[]
  children: TreeNode[]
  zip?: string | null
  baseDir?: string
  baseRoute?: string
}>()

const folders = computed(() =>
  props.children.filter(n => n.type === 'folder').sort((a, b) => a.name.localeCompare(b.name))
)
const files = computed(() =>
  props.children.filter(n => n.type === 'file').sort((a, b) => a.name.localeCompare(b.name))
)

const route = computed(() => props.baseRoute ?? '/appunti')
const dir = computed(() => props.baseDir ?? 'Moodle')

function folderHref(name: string) {
  const segs = [props.year, ...props.pathSegments, name]
  return route.value + '/' + segs.map(encodeURIComponent).join('/')
}

function fileHref(name: string) {
  const segs = [props.year, ...props.pathSegments, name]
  return '/' + dir.value + '/' + segs.map(encodeURIComponent).join('/')
}

// Breadcrumb
const breadcrumbs = computed(() => {
  const crumbs = [
    { label: props.year, href: `${route.value}/${encodeURIComponent(props.year)}` },
  ]
  props.pathSegments.forEach((seg, i) => {
    const segs = props.pathSegments.slice(0, i + 1)
    crumbs.push({
      label: seg,
      href: `${route.value}/${encodeURIComponent(props.year)}/${segs.map(encodeURIComponent).join('/')}`,
    })
  })
  return crumbs
})

const backHref = computed(() => {
  if (props.pathSegments.length === 0) return '/'
  if (props.pathSegments.length === 1) return `${route.value}/${encodeURIComponent(props.year)}`
  return `${route.value}/${encodeURIComponent(props.year)}/${props.pathSegments.slice(0, -1).map(encodeURIComponent).join('/')}`
})

// File icon colour by extension
function fileColor(ext?: string): string {
  const map: Record<string, string> = {
    pdf:  'text-red-500 dark:text-red-400',
    java: 'text-orange-500 dark:text-orange-400',
    js:   'text-yellow-500 dark:text-yellow-400',
    ts:   'text-blue-500 dark:text-blue-400',
    png: 'text-emerald-500 dark:text-emerald-400',
    jpg: 'text-emerald-500 dark:text-emerald-400',
    jpeg: 'text-emerald-500 dark:text-emerald-400',
    docx: 'text-blue-600 dark:text-blue-400',
    doc:  'text-blue-600 dark:text-blue-400',
    odt:  'text-blue-600 dark:text-blue-400',
    zip:  'text-purple-500 dark:text-purple-400',
    html: 'text-orange-400 dark:text-orange-300',
    txt:  'text-gray-500 dark:text-slate-400',
  }
  return map[ext ?? ''] ?? 'text-gray-400 dark:text-slate-500'
}

const { add: addRecent } = useRecent()
const { open: openViewer } = useFileViewer()

function openFile(file: TreeNode) {
  if (!file.ext) return
  const ext = file.ext.toLowerCase()
  const url = fileHref(file.name)
  addRecent({ type: 'file', name: file.name, href: url, year: props.year, ext })
  openViewer(url, file.name, ext)
}

function trackFolder(folder: TreeNode) {
  addRecent({ type: 'folder', name: folder.name, href: folderHref(folder.name), year: props.year })
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-surface-900 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">

    <!-- Breadcrumb -->
    <nav aria-label="Navigazione cartelle" class="flex items-center gap-1 text-sm flex-wrap mb-6">
      <NuxtLink
        to="/"
        class="font-mono text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors"
      >~</NuxtLink>

      <template v-for="(crumb, i) in breadcrumbs" :key="crumb.href">
        <span class="text-gray-400 dark:text-slate-500 select-none">/</span>
        <NuxtLink
          :to="crumb.href"
          class="font-mono transition-colors"
          :class="i === breadcrumbs.length - 1
            ? 'text-gray-900 dark:text-slate-100 font-semibold'
            : 'text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300'"
          :aria-current="i === breadcrumbs.length - 1 ? 'page' : undefined"
        >{{ crumb.label }}</NuxtLink>
      </template>
    </nav>

    <!-- File list -->
    <div class="card overflow-hidden divide-y divide-gray-100 dark:divide-slate-800/80" role="list">

      <!-- Back row -->
      <NuxtLink
        :to="backHref"
        class="row-interactive hover:bg-gray-50 dark:hover:bg-slate-800/50 group"
        role="listitem"
        aria-label="Vai su"
      >
        <!-- Arrow up icon -->
        <svg class="w-5 h-5 shrink-0 text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <span class="font-mono text-sm text-gray-500 dark:text-slate-400 group-hover:text-gray-800 dark:group-hover:text-slate-200 transition-colors select-none">
          ..
        </span>
      </NuxtLink>

      <!-- Folders section header -->
      <div v-if="folders.length" class="flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-surface-700/40 border-b border-gray-100 dark:border-slate-800/60">
        <span class="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 dark:text-slate-400 select-none">
          Cartelle
        </span>
        <span class="text-[10px] font-mono text-gray-400 dark:text-slate-500 tabular-nums">{{ folders.length }}</span>
      </div>

      <!-- Folders -->
      <NuxtLink
        v-for="folder in folders"
        :key="folder.name"
        :to="folderHref(folder.name)"
        class="row-interactive hover:bg-gray-50 dark:hover:bg-slate-800/50 group"
        role="listitem"
        @click="trackFolder(folder)"
      >
        <!-- Folder icon -->
        <svg class="w-5 h-5 shrink-0 text-amber-400 dark:text-amber-500 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 12h-15a4.483 4.483 0 00-3 1.146z" />
        </svg>

        <span class="flex-1 text-sm font-medium text-gray-800 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {{ folder.name }}
        </span>

        <span class="text-xs text-gray-500 dark:text-slate-400 shrink-0 font-mono tabular-nums">
          {{ folder.children?.length ?? 0 }}
        </span>

        <!-- Chevron -->
        <svg class="w-4 h-4 shrink-0 text-gray-400 dark:text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all duration-100" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </NuxtLink>

      <!-- Files section header -->
      <div v-if="files.length" class="flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-surface-700/40 border-b border-t border-gray-100 dark:border-slate-800/60">
        <span class="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 dark:text-slate-400 select-none">
          File
        </span>
        <span class="text-[10px] font-mono text-gray-400 dark:text-slate-500 tabular-nums">{{ files.length }}</span>
      </div>

      <!-- Files -->
      <button
        v-for="file in files"
        :key="file.name"
        class="row-interactive hover:bg-indigo-50 dark:hover:bg-indigo-500/5 group text-left"
        role="listitem"
        @click="openFile(file)"
      >
        <!-- File type icon -->
        <svg
          class="w-5 h-5 shrink-0 transition-colors"
          :class="fileColor(file.ext)"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"
        >
          <!-- PDF / generic doc -->
          <template v-if="['pdf','docx','doc','odt'].includes(file.ext ?? '')">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </template>
          <!-- Image -->
          <template v-else-if="['png','jpg','jpeg','gif','webp'].includes(file.ext ?? '')">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </template>
          <!-- Code -->
          <template v-else-if="['java','js','ts','py','html','css'].includes(file.ext ?? '')">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </template>
          <!-- Archive -->
          <template v-else-if="['zip','rar','tar','gz'].includes(file.ext ?? '')">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </template>
          <!-- Default -->
          <template v-else>
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </template>
        </svg>

        <span class="flex-1 text-sm text-gray-700 dark:text-slate-300 truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
          {{ file.name }}
        </span>

        <span class="text-xs font-mono uppercase text-gray-500 dark:text-slate-400 shrink-0">
          {{ file.ext }}
        </span>

        <!-- Open indicator -->
        <svg class="w-4 h-4 shrink-0 text-gray-400 dark:text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </button>

      <!-- Empty -->
      <div v-if="!folders.length && !files.length" class="px-4 py-10 text-center text-sm text-gray-400 dark:text-slate-500">
        Cartella vuota
      </div>

    </div>

    <!-- Footer row: count + theme toggle -->
    <div class="mt-3 flex items-center justify-between">
      <p class="text-xs text-gray-500 dark:text-slate-400 font-mono tabular-nums">
        {{ folders.length }} cartelle &middot; {{ files.length }} file
      </p>
      <ThemeToggle />
    </div>

    <!-- ZIP download (solo root anno) -->
    <div v-if="zip" class="mt-6">
      <a
        :href="zip"
        download
        class="flex items-center gap-4 px-4 py-4 rounded-xl min-h-[56px]
               border border-dashed border-gray-300 dark:border-slate-700
               hover:border-indigo-400 dark:hover:border-indigo-500
               hover:bg-indigo-50 dark:hover:bg-indigo-500/5
               transition-colors group cursor-pointer"
      >
        <svg class="w-5 h-5 text-gray-400 dark:text-slate-500 group-hover:text-indigo-500 shrink-0 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Download ZIP — tutti i corsi Moodle
          </p>
          <p class="text-xs text-gray-400 dark:text-slate-500 font-mono mt-0.5">
            {{ zip.replace('/', '') }}
          </p>
        </div>
        <span class="text-xs font-mono text-gray-500 dark:text-slate-400 shrink-0">.zip</span>
      </a>
    </div>

    </div>
  </div>
</template>
