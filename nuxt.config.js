// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-16',
            title: 'My App',
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
            meta: [
                { name: 'description', content: 'My amazing site.' },
            ],
        }
    },
    css: [
        'vuetify/lib/styles/main.sass', 
        // '@mdi/font/css/materialdesignicons.min.css'
        '@/assets/css/style.css',
        '@/assets/css/proseMirror.less'
    ],
    build: {
        transpile: ['vuetify']
    },
    routeRules: {
        '/': { ssr: true },
        '/servicio/**': { ssr: true },
        
    },
    nitro: {
        preset: 'firebase'
    }
})
