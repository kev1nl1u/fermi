export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

  devtools: { enabled: true },

  vite: {
    server: {
      allowedHosts: true,
    },
  },

  compatibilityDate: '2024-04-03',

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'node-server',
    prerender: {
      crawlLinks: true,
      failOnError: false,
      ignore: ['/Moodle/'],
      routes: ['/', '/appunti/4CIIN', '/appunti/5CIIN'],
    },
    mimeTypes: {
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
  },

  tailwindcss: {
    configPath: '~/tailwind.config.js',
  },

  app: {
    head: {
      titleTemplate: '%s · Scrivania IS Fermi di Kevin',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // No index, no follow su tutto il sito
        { name: 'robots', content: 'noindex, nofollow' },
        // OG defaults (sovrascritti per pagina)
        { property: 'og:site_name', content: 'Scrivania IS Fermi di Kevin' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'it_IT' },
        { property: 'og:image', content: '/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/og.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap',
        },
      ],
    },
  },
})
