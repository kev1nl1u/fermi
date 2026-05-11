<script setup lang="ts">
const props = defineProps<{
  url: string
  name: string
  ext: string
}>()

const emit = defineEmits<{ close: [] }>()

const isPdf   = computed(() => props.ext === 'pdf')
const isImage = computed(() => ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(props.ext))
const isDocx  = computed(() => props.ext === 'docx')
const isText  = computed(() => ['txt', 'java', 'js', 'ts', 'html', 'css', 'md', 'xml', 'json'].includes(props.ext))

const isMobile = ref(false)
onMounted(() => {
  isMobile.value = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
})

const textContent = ref('')
const highlightedHtml = ref('')
const textLoading = ref(false)
const textError   = ref(false)

const docxContainer = ref<HTMLElement | null>(null)
const docxLoading = ref(false)
const docxError = ref(false)

const langMap: Record<string, string> = {
  java: 'java', js: 'javascript', ts: 'typescript',
  html: 'html', css: 'css', json: 'json',
  md: 'markdown', xml: 'xml', txt: 'text',
}

const isCode = computed(() => isText.value && props.ext !== 'txt' && props.ext !== 'md')

async function highlight(code: string, ext: string) {
  if (!isCode.value) return ''
  try {
    const { codeToHtml } = await import('shiki')
    return await codeToHtml(code, {
      lang: langMap[ext] ?? 'text',
      themes: { light: 'github-dark', dark: 'github-dark' },
    })
  } catch {
    return ''
  }
}

watch(() => props.url, async () => {
  if (!isText.value) return
  textLoading.value = true
  textError.value   = false
  textContent.value = ''
  highlightedHtml.value = ''
  try {
    const res = await fetch(props.url)
    if (!res.ok) throw new Error()
    const txt = await res.text()
    textContent.value = txt
    if (isCode.value) {
      highlightedHtml.value = await highlight(txt, props.ext)
    }
  } catch {
    textError.value = true
  } finally {
    textLoading.value = false
  }
}, { immediate: true })

watch([() => props.url, () => props.ext, docxContainer], async () => {
  if (!isDocx.value) {
    docxLoading.value = false
    docxError.value = false
    if (docxContainer.value) {
      docxContainer.value.innerHTML = ''
    }
    return
  }

  if (!docxContainer.value) return

  docxLoading.value = true
  docxError.value = false
  docxContainer.value.innerHTML = ''

  try {
    const res = await fetch(props.url)
    if (!res.ok) throw new Error('Failed to load docx')

    const buffer = await res.arrayBuffer()
    const { renderAsync } = await import('docx-preview')

    await renderAsync(buffer, docxContainer.value, undefined, {
      className: 'docx',
      breakPages: true,
      ignoreLastRenderedPageBreak: false,
      renderHeaders: true,
      renderFooters: true,
    })
  } catch {
    docxError.value = true
  } finally {
    docxLoading.value = false
  }
}, { immediate: true })

// Close on Escape
onMounted(() => {
  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') emit('close')
  }
  document.addEventListener('keydown', onKey)
  onUnmounted(() => document.removeEventListener('keydown', onKey))
})

// Prevent body scroll while open
onMounted(() => {
  document.body.style.overflow = 'hidden'
  onUnmounted(() => { document.body.style.overflow = '' })
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
      appear
    >
    <div class="fixed inset-0 z-50 flex flex-col bg-gray-950">

      <!-- Toolbar -->
      <div class="flex items-center gap-3 h-12 px-4 border-b border-gray-800 shrink-0">
        <!-- File icon + name -->
        <span class="text-base leading-none shrink-0">
          {{ isPdf ? '📄' : isImage ? '🖼️' : isText ? '📝' : '📄' }}
        </span>
        <span class="font-mono text-sm text-gray-200 truncate flex-1 min-w-0">{{ name }}</span>
        <span class="text-xs font-mono text-gray-500 uppercase shrink-0">{{ ext }}</span>

        <!-- Actions -->
        <div class="flex items-center gap-2 shrink-0 ml-2">
          <a
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-gray-200
                   px-2.5 py-1 rounded border border-gray-700 hover:border-gray-500 transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            apri
          </a>
          <a
            :href="url"
            :download="name"
            class="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-gray-200
                   px-2.5 py-1 rounded border border-gray-700 hover:border-gray-500 transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            scarica
          </a>
          <button
            class="w-8 h-8 flex items-center justify-center rounded
                   text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            title="Chiudi (Esc)"
            @click="emit('close')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-hidden relative">

        <!-- PDF: iframe su desktop, fallback su mobile -->
        <iframe
          v-if="isPdf && !isMobile"
          :src="url"
          class="absolute inset-0 w-full h-full border-0"
          title="Visualizzatore file"
        />
        <div
          v-else-if="isPdf && isMobile"
          class="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-500"
        >
          <span class="text-5xl">📄</span>
          <p class="text-sm font-mono text-center px-6">Anteprima PDF non disponibile su mobile</p>
          <a
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm font-mono text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 px-4 py-2 rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Apri PDF
          </a>
        </div>

        <!-- Image -->
        <div
          v-else-if="isImage"
          class="absolute inset-0 flex items-center justify-center p-6 bg-gray-950"
        >
          <img
            :src="url"
            :alt="name"
            class="max-w-full max-h-full object-contain rounded"
          />
        </div>

        <!-- DOCX -->
        <div
          v-else-if="isDocx"
          class="absolute inset-0 overflow-auto bg-stone-100 p-4 md:p-6"
        >
          <div
            ref="docxContainer"
            class="mx-auto max-w-5xl"
          />
          <div
            v-if="docxLoading"
            class="absolute inset-0 flex items-center justify-center text-gray-500 text-sm font-mono pointer-events-none"
          >
            Caricamento documento...
          </div>
          <div
            v-else-if="docxError"
            class="absolute inset-0 flex items-center justify-center text-red-400 text-sm font-mono pointer-events-none"
          >
            Impossibile caricare il documento.
          </div>
        </div>

        <!-- Text / Code -->
        <div
          v-else-if="isText"
          class="absolute inset-0 overflow-auto"
        >
          <div v-if="textLoading" class="flex items-center justify-center h-full text-gray-500 text-sm font-mono">
            Caricamento...
          </div>
          <div v-else-if="textError" class="flex items-center justify-center h-full text-red-400 text-sm font-mono">
            Impossibile caricare il file.
          </div>
          <!-- Code with syntax highlighting -->
          <div
            v-else-if="highlightedHtml"
            class="shiki-wrap text-sm font-mono leading-relaxed"
            v-html="highlightedHtml"
          />
          <!-- Plain text fallback -->
          <pre
            v-else
            class="p-6 text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap break-words"
          >{{ textContent }}</pre>
        </div>

        <!-- Unsupported -->
        <div
          v-else
          class="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-500"
        >
          <span class="text-5xl">📎</span>
          <p class="text-sm font-mono">Anteprima non disponibile per <span class="text-gray-400">.{{ ext }}</span></p>
          <a
            :href="url"
            :download="name"
            class="flex items-center gap-2 text-sm font-mono text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 px-4 py-2 rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Scarica il file
          </a>
        </div>

      </div>
    </div>
    </Transition>
  </Teleport>
</template>
