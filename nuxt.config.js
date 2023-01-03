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
    }
})
