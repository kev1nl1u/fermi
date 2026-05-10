<script setup lang="ts">
const route = useRoute()
const year = route.params.year as string
const { getMeta } = useAppuntiTree()
const meta = getMeta(year)

if (!meta) {
  throw createError({ statusCode: 404, statusMessage: 'Anno non trovato' })
}

useSeoMeta({
  title: `Appunti ${year} - IS Fermi`,
  titleTemplate: '%s',
  description: `Appunti personali ${year} AS ${meta.period} IS E. Fermi`,
  ogTitle: `Appunti ${year} - IS Fermi`,
  ogDescription: `Appunti personali ${year} AS ${meta.period} IS E. Fermi`,
  twitterTitle: `Appunti ${year} - IS Fermi`,
  twitterDescription: `Appunti personali ${year} AS ${meta.period} IS E. Fermi`,
})
</script>

<template>
  <MoodleFolder
    :year="year"
    :path-segments="[]"
    :children="meta!.tree"
    :zip="meta!.zip"
    base-dir="Appunti"
    base-route="/note"
  />
</template>
