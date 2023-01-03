import { getAuth } from 'firebase/auth'
import { appDefault } from '~~/firebase-services/apps/firebaseAppDefault'

export default defineNuxtPlugin(nuxtApp => {
    initUser()

    const auth = getAuth(appDefault)
    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)
})