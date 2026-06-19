<script setup lang="ts">
const { file: viewerFile, close: closeViewer } = useFileViewer()

// Load recents on client
const { load } = useRecent()
onMounted(() => load())
</script>

<template>
  <div class="relative min-h-screen bg-gray-50 dark:bg-surface-900 overflow-x-hidden">
    <slot />
    <FileViewer
      v-if="viewerFile"
      :url="viewerFile.url"
      :name="viewerFile.name"
      :ext="viewerFile.ext"
      @close="closeViewer"
    />
  </div>
</template>
