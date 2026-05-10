<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Pagina non trovata', fatal: true })
}

useSeoMeta({
  title: computed(() => `${page.value?.title ?? route.path} — Fermi Gateway`),
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 mb-8 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Indietro
    </NuxtLink>

    <article class="prose-dark">
      <ContentRenderer v-if="page" :value="page" />
    </article>
  </div>
</template>
