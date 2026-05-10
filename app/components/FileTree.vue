<script setup lang="ts">
export interface TreeNode {
  type: 'folder' | 'file'
  name: string
  ext?: string
  children?: TreeNode[]
}

const props = defineProps<{
  nodes: TreeNode[]
  depth?: number
  basePath: string
}>()

const open = ref<Set<string>>(new Set())

function toggle(key: string) {
  open.value.has(key) ? open.value.delete(key) : open.value.add(key)
  open.value = new Set(open.value)
}

function nodeKey(node: TreeNode, i: number) {
  return `${node.name}-${i}`
}

function childFolderPath(name: string) {
  return props.basePath + '/' + name
}

function fileHref(name: string) {
  const segments = [...props.basePath.split('/').filter(Boolean), name]
  return '/' + segments.map(encodeURIComponent).join('/')
}

function fileIcon(ext?: string) {
  const icons: Record<string, string> = {
    pdf:  '📄',
    java: '☕',
    txt:  '📝',
    png:  '🖼️',
    jpg:  '🖼️',
    jpeg: '🖼️',
    docx: '📃',
    doc:  '📃',
    odt:  '📃',
    zip:  '🗜️',
    html: '🌐',
  }
  return icons[ext ?? ''] ?? '📄'
}

const depth = computed(() => props.depth ?? 0)
const paddingLeft = computed(() => 16 + depth.value * 24)
</script>

<template>
  <div>
    <div v-for="(node, i) in nodes" :key="nodeKey(node, i)">

      <!-- ── Folder row ── -->
      <template v-if="node.type === 'folder'">
        <button
          class="w-full flex items-center gap-3 py-3 rounded-xl text-left
                 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors group select-none"
          :style="{ paddingLeft: `${paddingLeft}px`, paddingRight: '12px' }"
          @click="toggle(nodeKey(node, i))"
        >
          <!-- Chevron -->
          <svg
            class="w-4 h-4 text-gray-400 dark:text-slate-500 shrink-0 transition-transform duration-150"
            :class="open.has(nodeKey(node, i)) ? 'rotate-90' : ''"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>

          <!-- Icon -->
          <span class="text-2xl leading-none shrink-0">
            {{ open.has(nodeKey(node, i)) ? '📂' : '📁' }}
          </span>

          <!-- Name -->
          <span class="text-base font-semibold text-gray-800 dark:text-slate-100 flex-1 truncate">
            {{ node.name }}
          </span>

          <!-- Count -->
          <span class="text-xs text-gray-400 dark:text-slate-500 shrink-0 font-mono">
            {{ node.children?.length ?? 0 }}
          </span>
        </button>

        <!-- Children -->
        <div v-if="open.has(nodeKey(node, i)) && node.children">
          <div
            class="border-l-2 border-gray-200 dark:border-slate-700"
            :style="{ marginLeft: `${paddingLeft + 14}px` }"
          >
            <FileTree
              :nodes="node.children"
              :depth="depth + 1"
              :base-path="childFolderPath(node.name)"
            />
          </div>
        </div>
      </template>

      <!-- ── File row ── -->
      <a
        v-else
        :href="fileHref(node.name)"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 py-3 rounded-xl
               hover:bg-indigo-50 dark:hover:bg-indigo-500/5
               hover:text-indigo-700 dark:hover:text-indigo-300
               transition-colors group"
        :style="{ paddingLeft: `${paddingLeft + 24}px`, paddingRight: '12px' }"
      >
        <!-- Icon -->
        <span class="text-2xl leading-none shrink-0">{{ fileIcon(node.ext) }}</span>

        <!-- Name -->
        <span class="text-base text-gray-700 dark:text-slate-300 flex-1 truncate
                     group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
          {{ node.name }}
        </span>

        <!-- Ext badge -->
        <span class="text-xs text-gray-400 dark:text-slate-500 font-mono uppercase shrink-0">
          {{ node.ext }}
        </span>

        <!-- External link icon -->
        <svg
          class="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 group-hover:text-indigo-400 shrink-0 opacity-0 group-hover:opacity-100 transition-all"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>

    </div>
  </div>
</template>
