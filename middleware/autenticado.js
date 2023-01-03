export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUser()
    const router = useRouter()
    console.log('middleware_autenticado-is server?: ', process.server)
    console.log('middleware_autenticado-user', user)
    console.log('middleware_autenticado-user.value', user.value)
    
    if (!user.value) return navigateTo('/')
    // if (!user.value) return router.push('/')
})