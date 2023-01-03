import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { appDefault } from '~~/firebase-services/apps/firebaseAppDefault'

export const signInUser = async (email, password) => {
    const auth = getAuth(appDefault)

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        return credentials
    } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
    }

}

export const initUser = async () => {
    const auth = getAuth(appDefault)

    const userCookie = useCookie('__session')
    const user = useUser()

    onAuthStateChanged(auth, async (snapshot) => {
        let token = ''
        let userValue = null

        if (snapshot) {
            token = await snapshot.getIdToken()
            userValue = { uid: snapshot.uid, email: snapshot.email }
        }

        userCookie.value = token
        user.value = userValue
    })
}

export const currentUser = () => {
    const auth = getAuth(appDefault)
    return auth.currentUser
}

export const signOutUser = async () => {
    const auth = getAuth(appDefault)
    const result = await auth.signOut()
    return result
}