<script setup lang="ts">
const searchOpen = ref(false)
const { file: viewerFile, close: closeViewer } = useFileViewer()

// Provide search opener to descendants
provide('openSearch', () => { searchOpen.value = true })

function onKeydown(e: KeyboardEvent) {
  // Ignore when typing in an input/textarea
  const target = e.target as HTMLElement
  if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return

  // "/" or Cmd/Ctrl+K opens search
  if ((e.key === '/' && !searchOpen.value) || ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
    e.preventDefault()
    searchOpen.value = true
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

// Load recents on client
const { load } = useRecent()
onMounted(() => load())
</script>

<template>
  <div class="relative min-h-screen bg-gray-50 dark:bg-surface-900 overflow-x-hidden">
    <slot />
    <SearchPalette v-model:open="searchOpen" />
    <FileViewer
      v-if="viewerFile"
      :url="viewerFile.url"
      :name="viewerFile.name"
      :ext="viewerFile.ext"
      @close="closeViewer"
    />
  </div>
</template>
