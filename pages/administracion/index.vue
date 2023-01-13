<template>
    <ClientOnly>

        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:prepend>
                <v-icon size="small" icon="mdi-vuetify"></v-icon>
            </template>
        </v-breadcrumbs>

        <h1 class="d-flex align-center flex-column mt-5 mb-10">Administración</h1>

        <v-card class="pa-3 mx-auto" :max-width="user ? 1000 : 500">
            <div v-if="user">
                <h2 class="mb-5">Bienvenido! {{ user.email }}</h2>

                <div class="mb-7" v-for="(operacion, index) in operaciones" :key="index">
                    <h3>{{ operacion.titulo }}</h3>
                    <v-divider class="mb-3" />

                    <v-btn class="mr-4" :color="operacion.color" :to="operacion.to">
                        {{ operacion.btnTitle }}
                    </v-btn>
                </div>

                <v-divider class="my-6" />

                <v-btn class="mr-4" color="green" to="/">
                    Volver
                </v-btn>

                <v-btn color="red" @click="logout">
                    Cerrar sesión
                </v-btn>
            </div>
            <div v-else>
                <h2 class="mb-3">Iniciar sesión</h2>
                <v-alert v-if="errorInicio" density="compact" type="error" variant="outlined" class="mb-3">
                    Correo o contraseña incorrectos
                </v-alert>

                <v-form @submit.prevent="login">
                    <div>
                        <v-text-field v-model="dataLogin.email" :error-messages="emailVerification" label="Correo"
                            required outlined></v-text-field>
                        <v-text-field v-model="dataLogin.password" :error-messages="passwordVerification" :counter="20"
                            type="password" label="Contraseña" required outlined></v-text-field>
                    </div>
                    <div class="olvideContra mb-3" @click="dialogRecuperar = true">Olvidé mi contraseña</div>
                    <div>
                        <v-btn class="mr-4" color="primary" @click="login" :loading="cargando">
                            Iniciar Sesion
                        </v-btn>
                        <v-btn color="blue-grey" @click="clear">
                            Limpiar
                        </v-btn>
                    </div>
                </v-form>
            </div>
        </v-card>
        <v-row justify="center">
            <v-dialog max-width="600" v-model="dialogRecuperar" persistent>
                <v-card class="px-3">
                    <v-card-title class="mt-3">
                        Ingrese el correo
                    </v-card-title>
                    <v-card-text>
                        <v-alert v-if="alertMensajeEnviado" density="compact" type="success" variant="outlined"
                            class="mb-3">
                            Correo de recuperación enviado!
                        </v-alert>
                        <v-alert v-if="errorRecuperar" density="compact" type="error" variant="outlined" class="mb-3">
                            Correo inválido o no existe
                        </v-alert>
                        Se le enviará un enlace al correo para cambiar la contraseña.
                    </v-card-text>

                    <v-card-text>
                        <v-text-field v-model="emailRecuperar" :error-messages="emailVerificationRecuperar"
                            label="Correo" required outlined></v-text-field>
                    </v-card-text>
                    <v-card-actions class="mb-3">
                        <v-btn color="green-darken-1" variant="outlined" @click="recuperarPass()"
                            :loading="enviandoMensajeRecuperar">
                            Enviar
                        </v-btn>
                        <v-btn color="red-darken-1" variant="outlined"
                            @click="dialogRecuperar = false; emailRecuperar = ''; errorRecuperar = false; alertMensajeEnviado = false">
                            Cancelar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </ClientOnly>
</template>

<script setup>
definePageMeta({
    layout: 'administracion'
})

// Data
const user = useUser()
const errorInicio = ref(false)
const cargando = ref(false)
const dialogRecuperar = ref(false)
const emailRecuperar = ref('')
const errorRecuperar = ref(false)
const alertMensajeEnviado = ref(false)
const enviandoMensajeRecuperar = ref(false)
const dataLogin = ref({
    email: '',
    password: '',
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
const login = async () => {
    try {
        errorInicio.value = false
        cargando.value = true
        let res = await signInUser(dataLogin.value.email, dataLogin.value.password)
        cargando.value = false
        if (!res) {
            errorInicio.value = true
        }
    } catch (error) {
        cargando.value = false
        errorInicio.value = true
    }
}

const logout = () => signOutUser()

const clear = () => {
    dataLogin.value.email = ''
    dataLogin.value.password = ''
    errorInicio.value = false
}

const recuperarPass = async () => {
    try {
        enviandoMensajeRecuperar.value = true
        errorRecuperar.value = false
        alertMensajeEnviado.value = false
        await recuperarContrasenha(emailRecuperar.value)
        enviandoMensajeRecuperar.value = false
        alertMensajeEnviado.value = true
        emailRecuperar.value = ""
    } catch (error) {
        enviandoMensajeRecuperar.value = false
        errorRecuperar.value = true
    }

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

// Computed
const emailVerificationRecuperar = computed(() => {
    const errors = []

    const validateEmail = (email) => {
        return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }

    if (!emailRecuperar.value) return errors
    if (!validateEmail(emailRecuperar.value)) errors.push('El correo no es válido.')

    return errors
})

const passwordVerification = computed(() => {
    const errors = []

    if (!dataLogin.value.password) return errors
    if (dataLogin.value.password.length < 6) errors.push('La contraseña necesita de al menos 6 caracteres.')

    return errors
})

</script>
<style scoped>
.olvideContra {
    font-size: small;
    cursor: pointer;
    color: blue;
    text-decoration-line: underline;
}
</style>