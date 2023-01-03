<template>
    <div>
        Administracion

        <div v-if="user">
            Usuario - 
            <button @click="logout">
                LOGOUT
            </button>
        </div>

        <div v-else>
            <button @click="login">
                LOGIN
            </button>
        </div>
    </div>
</template>

<script setup>
const user = useUser()
console.log('user', user.value)

const login = () => {
    const email = 'guillepaivag@gmail.com'
    const password = '123456'

    signInUser(email, password)
}

const logout = () => {
    signOutUser()
}

</script>