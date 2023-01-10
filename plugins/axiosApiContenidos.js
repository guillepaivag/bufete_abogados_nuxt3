import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const defaultUrl = process.env.NODE_ENV === 'production' ? 
    'https://southamerica-east1-consultoria-legal-dev.cloudfunctions.net/service_contenido' : 
    'http://127.0.0.1:5002/consultoria-legal-dev/southamerica-east1/service_contenido'

    const apiContenido = axios.create({ baseURL: defaultUrl })
    // nuxtApp.vueApp.provide('apiContenido', apiContenido)
    nuxtApp.provide('apiContenido', apiContenido)
})