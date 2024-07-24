// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  nitro: {
    plugins: ['~/server/plugins/mongodb.ts'],
    experimental: {
      websocket: true
    }
  },
  
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@pinia/nuxt", "@nuxtjs/color-mode", '@nuxt/test-utils/module'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  css: ["~/assets/css/typography.css", "~/assets/css/base.css", '~/assets/css/flow.css'],
  runtimeConfig: {
    // Will be available in both server and client
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: process.env.TOKEN_EXPIRES,
    tokenName: process.env.TOKEN_NAME
  },
})
