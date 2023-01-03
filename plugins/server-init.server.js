import { getUserFromToken } from "~~/helpers"

export default defineNuxtPlugin(async (nuxtApp) => {
    const token = useCookie('__session').value
    console.log('server-init - token', token) 

    const decodeToken = getUserFromToken(token)
    console.log('server-init - decodeToken', decodeToken)
    
    const user = useUser()
    user.value = decodeToken ? { uid: decodeToken.user_id, email: decodeToken.email } : null
})