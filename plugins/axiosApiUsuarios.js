import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const defaultUrl = { value: '' }
    
    const config = useRuntimeConfig()

    process.env.NODE_ENV === 'production' && config.public.TIPO_PROYECTO === 'prod' ? 
    defaultUrl.value = 'https://southamerica-east1-consultoria-legal.cloudfunctions.net/service_usuario' : ''
    
    process.env.NODE_ENV === 'production' && config.public.TIPO_PROYECTO === 'dev' ? 
    defaultUrl.value = 'https://southamerica-east1-consultoria-legal-dev.cloudfunctions.net/service_usuario' : ''
    
    process.env.NODE_ENV === 'development' && config.public.TIPO_PROYECTO === 'dev' ? 
    defaultUrl.value = 'http://127.0.0.1:7000/consultoria-legal-dev/southamerica-east1/service_usuario' : ''

    console.log('defaultUrl', defaultUrl)
    const apiUsuario = axios.create({ baseURL: defaultUrl.value })
    // nuxtApp.vueApp.provide('apiUsuario', apiUsuario)
    nuxtApp.provide('apiUsuario', apiUsuario)
})