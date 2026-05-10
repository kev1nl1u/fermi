<script setup lang="ts">
const route = useRoute()
const year = route.params.year as string
const rawPath = route.params.path
const pathSegments = computed(() =>
  Array.isArray(rawPath) ? rawPath : rawPath ? [rawPath] : []
)

const { getMeta, getAtPath } = useAppuntiTree()
const meta = getMeta(year)

if (!meta) {
  throw createError({ statusCode: 404, statusMessage: 'Anno non trovato' })
}

const node = computed(() => getAtPath(year, pathSegments.value))

const children = computed(() => {
  const n = node.value
  if (!n || n.type !== 'folder') return null
  return n.children ?? []
})

watchEffect(() => {
  if (!children.value) {
    throw createError({ statusCode: 404, statusMessage: 'Cartella non trovata' })
  }
})

const folderName = computed(() => pathSegments.value.at(-1) ?? '')
const folderDesc = computed(() =>
  `Appunti IS E. Fermi AS ${meta!.period} ${year} ${folderName.value}`
)

useSeoMeta({
  title: computed(() => `${folderName.value} / ${year}`),
  description: folderDesc,
  ogTitle: computed(() => `${folderName.value} — ${year}`),
  ogDescription: folderDesc,
  twitterTitle: computed(() => `${folderName.value} — ${year}`),
  twitterDescription: folderDesc,
})
</script>

<template>
  <MoodleFolder
    v-if="children"
    :year="year"
    :path-segments="pathSegments"
    :children="children"
    base-dir="Appunti"
    base-route="/note"
  />
</template>
