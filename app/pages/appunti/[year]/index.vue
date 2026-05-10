<script setup lang="ts">
const route = useRoute()
const year = route.params.year as string
const { getMeta } = useMoodleTree()
const meta = getMeta(year)

if (!meta) {
  throw createError({ statusCode: 404, statusMessage: 'Anno non trovato' })
}

useSeoMeta({
  title: `Appunti ${year} - IS Fermi`,
  titleTemplate: '%s',
  description: `Materiale Moodle ${year} AS ${meta.period} IS E. Fermi`,
  ogTitle: `Appunti ${year} - IS Fermi`,
  ogDescription: `Materiale Moodle ${year} AS ${meta.period} IS E. Fermi`,
  twitterTitle: `Appunti ${year} - IS Fermi`,
  twitterDescription: `Materiale Moodle ${year} AS ${meta.period} IS E. Fermi`,
})
</script>

<template>
  <MoodleFolder
    :year="year"
    :path-segments="[]"
    :children="meta!.tree"
    :zip="meta!.zip"
  />
</template>
