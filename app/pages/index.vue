<script setup lang="ts">
useSeoMeta({
  title: 'Scrivania IS Fermi di Kevin',
  titleTemplate: '%s',
  description: 'Appunti e progetti IS E. Fermi di Kevin.',
  ogTitle: 'Scrivania IS Fermi di Kevin',
  ogDescription: 'Appunti e progetti IS E. Fermi di Kevin.',
  twitterTitle: 'Scrivania IS Fermi di Kevin',
  twitterDescription: 'Appunti e progetti IS E. Fermi di Kevin.',
})

const openSearch = inject<() => void>('openSearch', () => {})
const { recents, clear: clearRecents } = useRecent()

const fileColor: Record<string, string> = {
  pdf: 'text-red-500', java: 'text-orange-500',
  png: 'text-emerald-500', jpg: 'text-emerald-500', jpeg: 'text-emerald-500',
  docx: 'text-blue-600', doc: 'text-blue-600', odt: 'text-blue-600',
  zip: 'text-purple-500', txt: 'text-gray-500',
}

const { open: openViewer } = useFileViewer()
const { getMeta } = useMoodleTree()
const years = ['4CIIN', '5CIIN']

const projectGroups = [
  {
    id: 'fermi-notify',
    name: 'Fermi Notify',
    projects: [
      { name: 'ferminotify.lkev.in', url: 'https://ferminotify.lkev.in', github: null, status: 'attivo' },
      { name: 'node.fn.lkev.in', url: 'https://node.fn.lkev.in', github: null, status: 'legacy' },
      { name: 'old.fn.lkev.in', url: 'https://old.fn.lkev.in', github: null, status: 'legacy' },
    ],
  },
  {
    id: 'scolastici',
    name: 'Progetti scolastici',
    projects: [
      { name: 'storia22.fermi.lkev.in', url: 'https://storia22.fermi.lkev.in', github: null, status: 'live' },
      { name: 'ferari.fermi.lkev.in', url: 'https://ferari.fermi.lkev.in', github: null, status: 'live' },
      { name: 'oradiscienza.fermi.lkev.in', url: 'https://oradiscienza.fermi.lkev.in', github: null, status: 'live' },
      { name: 'stackheap.fermi.lkev.in', url: 'https://stackheap.fermi.lkev.in', github: null, status: 'live' },
      { name: 'tcpip.fermi.lkev.in', url: 'https://tcpip.fermi.lkev.in', github: null, status: 'live' },
    ],
  },
]

const statusClass: Record<string, string> = {
  attivo: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20',
  legacy: 'bg-gray-100 text-gray-500 ring-1 ring-gray-200 dark:bg-slate-700 dark:text-slate-400 dark:ring-slate-600',
  live:   'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20',
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-surface-900 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">

    <!-- ── Search button ── -->
    <button
      class="w-full flex items-center gap-3 px-4 h-11 rounded-xl
             bg-white dark:bg-surface-800
             border border-gray-200 dark:border-slate-700
             hover:border-gray-300 dark:hover:border-slate-600
             text-left transition-colors group"
      @click="openSearch()"
    >
      <svg class="w-4 h-4 shrink-0 text-gray-500 dark:text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <span class="flex-1 font-mono text-sm text-gray-500 dark:text-slate-400 group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors">
        Cerca tra cartelle e file...
      </span>
      <kbd class="font-mono text-[10px] text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-600 rounded px-1.5 py-0.5 select-none">/</kbd>
    </button>

    <!-- ── Appunti Moodle ── -->
    <section>
      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-mono text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-[0.12em] shrink-0">Appunti Moodle</h2>
        <span class="flex-1 h-px bg-gray-200 dark:bg-slate-800" />
      </div>

      <div class="card overflow-hidden divide-y divide-gray-100 dark:divide-slate-800">
        <NuxtLink
          v-for="year in years"
          :key="year"
          :to="`/appunti/${year}`"
          class="flex items-center gap-4 px-4 min-h-[52px]
                 hover:bg-gray-50 dark:hover:bg-slate-800/60
                 transition-colors group cursor-pointer"
        >
          <!-- Folder icon -->
          <svg class="w-5 h-5 shrink-0 text-amber-400 dark:text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 12h-15a4.483 4.483 0 00-3 1.146z" />
          </svg>
          <span class="font-mono font-semibold text-sm text-indigo-600 dark:text-indigo-400 shrink-0">{{ year }}</span>
          <span class="text-xs text-gray-500 dark:text-slate-400 font-mono">{{ getMeta(year)?.period }}</span>
          <svg class="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-indigo-400 ml-auto shrink-0 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </NuxtLink>
      </div>
    </section>

    <!-- ── Appunti Personali ── -->
    <section>
      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-mono text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-[0.12em] shrink-0">Appunti Personali</h2>
        <span class="flex-1 h-px bg-gray-200 dark:bg-slate-800" />
      </div>

      <div class="card overflow-hidden opacity-50 cursor-not-allowed select-none" aria-disabled="true">
        <div class="flex items-center gap-4 px-4 min-h-[52px]">
          <!-- Folder icon (muted) -->
          <svg class="w-5 h-5 shrink-0 text-gray-300 dark:text-slate-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 12h-15a4.483 4.483 0 00-3 1.146z" />
          </svg>
          <span class="font-mono text-sm text-gray-400 dark:text-slate-600">note personali</span>
          <span class="ml-auto font-mono text-[10px] text-gray-400 dark:text-slate-600 border border-dashed border-gray-300 dark:border-slate-700 px-2 py-0.5 rounded">
            work in progress
          </span>
        </div>
      </div>
    </section>

    <!-- ── Aperti di recente ── -->
    <section v-if="recents.length">
      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-mono text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-[0.12em] shrink-0">Aperti di recente</h2>
        <span class="flex-1 h-px bg-gray-200 dark:bg-slate-800" />
        <button
          class="font-mono text-[10px] text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300
                 border border-gray-300 dark:border-slate-500 rounded-md
                 hover:border-gray-500 dark:hover:border-slate-400
                 px-2 py-1 transition-colors"
          @click="clearRecents"
        >pulisci</button>
      </div>

      <div class="card overflow-hidden divide-y divide-gray-100 dark:divide-slate-800">
        <template v-for="r in recents" :key="r.href">
          <NuxtLink
            v-if="r.type === 'folder'"
            :to="r.href"
            class="flex items-center gap-3 px-4 min-h-[44px] hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors group cursor-pointer"
          >
            <svg class="w-4 h-4 shrink-0 text-amber-400 dark:text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 12h-15a4.483 4.483 0 00-3 1.146z" />
            </svg>
            <span class="text-sm text-gray-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ r.name }}</span>
            <span class="ml-auto font-mono text-[10px] text-gray-500 dark:text-slate-400 shrink-0">{{ r.year }}</span>
          </NuxtLink>
          <button
            v-else
            class="w-full flex items-center gap-3 px-4 min-h-[44px] hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-colors group cursor-pointer text-left"
            @click="openViewer(r.href, r.name, r.ext ?? '')"
          >
            <svg class="w-4 h-4 shrink-0" :class="fileColor[r.ext ?? ''] ?? 'text-gray-400'" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span class="text-sm text-gray-800 dark:text-slate-200 truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">{{ r.name }}</span>
            <span class="ml-auto font-mono text-[10px] text-gray-500 dark:text-slate-400 shrink-0">{{ r.year }}</span>
          </button>
        </template>
      </div>
    </section>

    <!-- ── Progetti Online ── -->
    <section>
      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-mono text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-[0.12em] shrink-0">Progetti Online</h2>
        <span class="flex-1 h-px bg-gray-200 dark:bg-slate-800" />
      </div>

      <div class="space-y-5">
        <div v-for="group in projectGroups" :key="group.id">
          <p class="text-xs font-mono text-gray-500 dark:text-slate-400 mb-2 px-1">{{ group.name }}</p>

          <div class="space-y-2">
            <div v-for="p in group.projects" :key="p.name" class="flex items-center gap-2">

              <!-- Card link sito -->
              <a
                :href="p.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 min-w-0 flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                       bg-white dark:bg-surface-800
                       border border-gray-200 dark:border-slate-700
                       hover:border-indigo-400 dark:hover:border-indigo-500
                       hover:shadow-sm
                       transition-all group"
              >
                <span class="badge text-xs shrink-0" :class="statusClass[p.status]">{{ p.status }}</span>
                <span class="font-mono text-sm text-gray-800 dark:text-slate-200
                             group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                             truncate transition-colors">
                  {{ p.name }}
                </span>
                <svg
                  class="w-3.5 h-3.5 shrink-0 ml-auto text-gray-400 dark:text-slate-500
                         group-hover:text-indigo-400 transition-colors"
                  fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>

              <!-- Card quadrata repo -->
              <a
                v-if="p.github"
                :href="p.github"
                target="_blank"
                rel="noopener noreferrer"
                title="Repository GitHub"
                class="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl
                       bg-white dark:bg-surface-800
                       border border-gray-200 dark:border-slate-700
                       text-gray-400 dark:text-slate-500
                       hover:border-gray-400 dark:hover:border-slate-400
                       hover:text-gray-900 dark:hover:text-slate-100
                       hover:shadow-sm transition-all"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                </svg>
              </a>
              <div
                v-else
                class="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl
                       bg-white dark:bg-surface-800
                       border border-dashed border-gray-200 dark:border-slate-800
                       text-gray-300 dark:text-slate-600 cursor-default"
                title="Aggiungi github: '…' in index.vue"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                </svg>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom bar: social + theme toggle -->
    <div class="pt-4 pb-2 flex items-center justify-between">
      <div class="flex items-center gap-1">
        <!-- GitHub -->
        <a
          href="https://github.com/kev1nl1u"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="w-8 h-8 flex items-center justify-center rounded
                 text-gray-400 dark:text-slate-400
                 hover:text-gray-700 dark:hover:text-slate-100
                 transition-colors duration-100"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
        </a>

        <!-- Instagram -->
        <a
          href="https://instagram.com/kev1nl1u"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          class="w-8 h-8 flex items-center justify-center rounded
                 text-gray-400 dark:text-slate-400
                 hover:text-gray-700 dark:hover:text-slate-100
                 transition-colors duration-100"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      </div>

      <ThemeToggle />
    </div>

    </div>
  </div>
</template>
