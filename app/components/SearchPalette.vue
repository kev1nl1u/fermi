<script setup lang="ts">
import type { SearchResult } from '~/composables/useSearch'

const open = defineModel<boolean>('open', { default: false })

const router = useRouter()
const { search } = useSearch()
const { add } = useRecent()
const { open: openViewer } = useFileViewer()

const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)

const results = computed<SearchResult[]>(() => search(query.value))

watch(open, async (v) => {
  if (v) {
    query.value = ''
    selectedIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
  }
})

watch(results, () => { selectedIndex.value = 0 })

function close() { open.value = false }

function selectResult(r: SearchResult) {
  add({ type: r.type, name: r.name, href: r.href, year: r.year, ext: r.ext })
  if (r.type === 'folder') {
    router.push(r.href)
  } else {
    openViewer(r.href, r.name, r.ext ?? '')
  }
  close()
}

function onKeydown(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') { close(); e.preventDefault() }
  else if (e.key === 'ArrowDown') {
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
    e.preventDefault()
  }
  else if (e.key === 'ArrowUp') {
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    e.preventDefault()
  }
  else if (e.key === 'Enter') {
    const r = results.value[selectedIndex.value]
    if (r) { selectResult(r); e.preventDefault() }
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

watch(open, (v) => {
  if (!import.meta.client) return
  document.body.style.overflow = v ? 'hidden' : ''
})

const fileColor: Record<string, string> = {
  pdf: 'text-red-500', java: 'text-orange-500',
  png: 'text-emerald-500', jpg: 'text-emerald-500', jpeg: 'text-emerald-500',
  docx: 'text-blue-600', doc: 'text-blue-600', odt: 'text-blue-600',
  zip: 'text-purple-500', txt: 'text-gray-500',
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 bg-gray-950/40 dark:bg-gray-950/70 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
        @click.self="close"
      >
        <div
          class="w-full max-w-xl bg-white dark:bg-surface-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-2xl shadow-black/20 overflow-hidden flex flex-col"
          @click.stop
        >
          <!-- Search input -->
          <div class="flex items-center gap-3 px-4 border-b border-gray-100 dark:border-slate-800">
            <svg class="w-4 h-4 shrink-0 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="Cerca cartelle e file..."
              class="flex-1 h-12 bg-transparent outline-none font-mono text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500"
              autocomplete="off"
              spellcheck="false"
            />
            <kbd class="font-mono text-[10px] text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-600 rounded px-1.5 py-0.5 select-none">Esc</kbd>
          </div>

          <!-- Results -->
          <div class="max-h-[60vh] overflow-y-auto">
            <div v-if="!query" class="px-4 py-8 text-center text-xs font-mono text-gray-500 dark:text-slate-400">
              Inizia a digitare per cercare in tutti gli appunti
            </div>
            <div v-else-if="!results.length" class="px-4 py-8 text-center text-xs font-mono text-gray-500 dark:text-slate-400">
              Nessun risultato per "{{ query }}"
            </div>
            <button
              v-for="(r, i) in results"
              :key="r.href"
              class="w-full flex items-center gap-3 px-4 min-h-[44px] text-left transition-colors"
              :class="i === selectedIndex
                ? 'bg-indigo-50 dark:bg-indigo-500/10'
                : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'"
              @click="selectResult(r)"
              @mouseenter="selectedIndex = i"
            >
              <!-- Icon -->
              <svg v-if="r.type === 'folder'" class="w-4 h-4 shrink-0 text-amber-400 dark:text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 12h-15a4.483 4.483 0 00-3 1.146z" />
              </svg>
              <svg v-else class="w-4 h-4 shrink-0" :class="fileColor[r.ext ?? ''] ?? 'text-gray-400'" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>

              <div class="flex-1 min-w-0">
                <div class="text-sm text-gray-800 dark:text-slate-200 truncate">{{ r.name }}</div>
                <div class="text-[11px] font-mono text-gray-400 dark:text-slate-500 truncate">
                  {{ r.year }}{{ r.parentPath.length ? ' / ' + r.parentPath.join(' / ') : '' }}
                </div>
              </div>

              <span class="text-[10px] font-mono uppercase text-gray-500 dark:text-slate-400 shrink-0">
                {{ r.type === 'folder' ? 'cartella' : r.ext }}
              </span>
            </button>
          </div>

          <!-- Footer hints -->
          <div class="flex items-center gap-3 px-4 py-2 border-t border-gray-100 dark:border-slate-800 text-[10px] font-mono text-gray-500 dark:text-slate-400">
            <span class="flex items-center gap-1">
              <kbd class="border border-gray-200 dark:border-slate-600 rounded px-1">↑↓</kbd> naviga
            </span>
            <span class="flex items-center gap-1">
              <kbd class="border border-gray-200 dark:border-slate-600 rounded px-1">↵</kbd> apri
            </span>
            <span class="ml-auto tabular-nums">{{ results.length }} risultati</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
