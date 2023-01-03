<template>
    <ClientOnly>
        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:prepend>
                <v-icon size="small" icon="mdi-vuetify"></v-icon>
            </template>
        </v-breadcrumbs>

        <h1 class="d-flex align-center flex-column mt-5 mb-10">Administración</h1>

        <v-card 
            class="pa-3 mx-auto" 
            :max-width="user ? 1000 : 500"
        >
            <div v-if="user">
                <h2 class="mb-5">Bienvenido! {{ user.email }}</h2>

                <div class="mb-7" v-for="(operacion, index) in operaciones" :key="index">
                    <h3>{{ operacion.titulo }}</h3>
                    <v-divider class="mb-3" />

                    <v-btn
                        class="mr-4"
                        :color="operacion.color"
                        :to="operacion.to"
                    >
                        {{ operacion.btnTitle }}
                    </v-btn>
                </div>

                <v-divider class="my-6" />

                <v-btn 
                    class="mr-4"
                    color="green"
                    to="/"
                >
                    Volver
                </v-btn>

                <v-btn 
                    color="red"
                    @click="logout"
                >
                    Cerrar sesión
                </v-btn>
            </div>
            <div v-else>
                <h2 class="mb-3">Iniciar sesión</h2>

                <v-form @submit.prevent="login">
                    <div class="mb-3">
                        <v-text-field
                            v-model="dataLogin.email"
                            :error-messages="emailVerification"
                            label="Correo"
                            required
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="dataLogin.password"
                            :error-messages="passwordVerification"
                            :counter="20"
                            label="Contraseña"
                            required
                            outlined
                        ></v-text-field>
                    </div>
                    
                    <div class="">
                        
                        <v-btn
                            class="mr-4"
                            color="primary"
                            @click="login"
                        >
                            Iniciar Sesion
                        </v-btn>
                        <v-btn 
                            color="blue-grey"
                            @click="clear"
                        >
                            Limpiar
                        </v-btn>
                    </div>
                </v-form>
            </div>
        </v-card>
    </ClientOnly>
</template>

<script setup>
definePageMeta({
    layout: 'administracion'
})

// Data
const user = useUser()
const dataLogin = ref({
    email: 'guillepaivag@gmail.com',
    password: '123456',
})
const operaciones = [
    { titulo: 'Usuarios', color: 'primary', to: '/administracion/usuarios', btnTitle: 'Usuarios' },
    { titulo: 'Contenidos', color: 'primary', to: '/administracion/contenidos', btnTitle: 'Contenidos' },
]
const breadcrumbs = [
    {
        title: 'Inicio',
        disabled: false,
        href: '/',
    },
    {
        title: 'Administración',
        disabled: true,
        href: '/administracion',
    },
]

// Methods
const login = () => signInUser(dataLogin.value.email, dataLogin.value.password)

const logout = () => signOutUser()

const clear = () => {
    dataLogin.value.email = ''
    dataLogin.value.password = ''
}


// Computed
const emailVerification = computed(() => {
    const errors = []

    const validateEmail = (email) => {
        return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }

    if (!dataLogin.value.email) return errors
    if (!validateEmail(dataLogin.value.email)) errors.push('El correo no es válido.')

    return errors
})

const passwordVerification = computed(() => {
    const errors = []

    if (!dataLogin.value.password) return errors
    if (dataLogin.value.password.length < 6) errors.push('La contraseña necesita de al meno 6 caracteres.')

    return errors
})

</script>