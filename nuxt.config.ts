// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
      '@nuxt/image',
      '@nuxt/ui',
      'shadcn-nuxt',
      ['@nuxtjs/google-fonts', {
          families: {
              Lato: {
                  wght: [300, 400, 700],
                  ital: [300]
              },
          },
      }],
      '@pinia/nuxt',
      [
          '@vee-validate/nuxt',
          {
              autoImports: true,
          },
      ],
  ],
    shadcn: {
        prefix: 'Ui',
        componentDir: './components/ui'
    },
    pinia: {
      storesDirs: ['./store/**'],
    }
})
