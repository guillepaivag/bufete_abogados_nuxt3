import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const defaultUrl = process.env.NODE_ENV === 'production' ? 
    '' : 
    'http://127.0.0.1:5002/consultoria-legal-dev/southamerica-east1/service_contenido/contenidos'

    const apiContenido = axios.create({ baseURL: defaultUrl })
    // nuxtApp.vueApp.provide('apiContenido', apiContenido)
    nuxtApp.provide('apiContenido', apiContenido)
})