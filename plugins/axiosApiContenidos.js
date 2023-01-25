import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const defaultUrl = { value: '' }
    
    const config = useRuntimeConfig()
    console.log('config.public', config.public)

    process.env.NODE_ENV === 'production' && config.public.TIPO_PROYECTO === 'prod' ? 
    defaultUrl.value = 'https://southamerica-east1-consultoria-legal.cloudfunctions.net/service_contenido' : ''
    
    process.env.NODE_ENV === 'production' && config.public.TIPO_PROYECTO === 'dev' ? 
    defaultUrl.value = 'https://southamerica-east1-consultoria-legal-dev.cloudfunctions.net/service_contenido' : ''
    
    process.env.NODE_ENV === 'development' && config.public.TIPO_PROYECTO === 'dev' ? 
    defaultUrl.value = 'http://127.0.0.1:7002/consultoria-legal-dev/southamerica-east1/service_contenido' : ''

    const apiContenido = axios.create({ baseURL: defaultUrl.value })
    // nuxtApp.vueApp.provide('apiContenido', apiContenido)
    nuxtApp.provide('apiContenido', apiContenido)
})