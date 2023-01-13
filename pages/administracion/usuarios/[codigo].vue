<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
            <template v-slot:prepend>
                <v-icon size="small" icon="mdi-vuetify"></v-icon>
            </template>
        </v-breadcrumbs>

        <v-container v-if="!cargandoUsuario">
            <v-card class="pa-5 mb-15">
                <h2>Datos del usuario</h2>
                <hr width="50%" class="mb-5">

                <v-text-field
                    v-model="usuario.uid"
                    readonly
                    label="ID del usuario"
                ></v-text-field>
                
                <v-text-field
                    v-if="esMiUsuario"
                    v-model="newEmail"
                    :error-messages="emailVerification"
                    label="Correo"
                ></v-text-field>
                <v-text-field
                    v-else
                    v-model="usuario.email"
                    readonly
                    label="Correo"
                ></v-text-field>

                <v-text-field
                    v-model="usuario.metadata.creationTime"
                    readonly
                    label="Fecha de registro"
                ></v-text-field>

                <v-text-field
                    v-model="usuario.metadata.lastSignInTime"
                    readonly
                    label="Fecha de inicio de sesión"
                ></v-text-field>

                <v-btn
                    v-if="esMiUsuario"
                    class="mt-3 mr-4"
                    color="primary"
                    @click="actualizarCorreo"
                >
                    Actualizar correo
                </v-btn>
            </v-card>

            <v-card class="pa-5 mb-15" v-if="esMiUsuario">
                <h2>Contraseña</h2>
                <hr width="50%" class="mb-5">

                <v-text-field
                    v-model="newContrasena"
                    :error-messages="contrasenaVerification"
                    label="Contraseña"
                ></v-text-field>

                <v-text-field
                    v-model="confirmacionContrasena"
                    :error-messages="confirmacionContrasenaVerification"
                    label="Confirmación de contraseña"
                ></v-text-field>

                <v-btn
                    class="mt-3 mr-4"
                    color="primary"
                    @click="actualizarContrasena"
                >
                    Actualizar contraseña
                </v-btn>
            </v-card>

            <v-card class="pa-5" v-if="esMiUsuario">
                <h2>Eliminar usuario</h2>
                <hr width="50%" class="mb-5">

                <v-text-field
                    v-model="contrasenaVerificationEliminacion"
                    :error-messages="computedContrasenaVerificationEliminacion"
                    label="Ingrese tu contraseña para eliminar tu usuario"
                ></v-text-field>

                <v-btn
                    :disabled="contrasenaVerificationEliminacion.length < 6"
                    class="mt-3 mr-4"
                    color="red"
                    @click="eliminarUsuario"
                >
                    Eliminar mi usuario
                </v-btn>
            </v-card>
        </v-container>
        <div class="container_cargando" v-else>
            <v-progress-linear
                indeterminate
                color="yellow darken-2"
            ></v-progress-linear>
        </div>


        <v-dialog max-width="600" v-model="dialogMensaje">
            <v-card class="pa-3">
                <v-card-text class="mb-3">
                    <span>{{ mensaje }}</span>
                </v-card-text>

                <div class="">
                    <v-btn 
                        color="red"
                        @click="dialogMensaje = false; mensaje = ''"
                    >
                        Cerrar
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
// Imports
import { onMounted } from 'vue'

// Define page meta
definePageMeta({
    middleware: 'autenticado'
})

// Data
const route = useRoute()
const router = useRouter()
const myUser = useUser()
const esMiUsuario = route.params.codigo === myUser.value.uid
const cargandoUsuario = ref(true)
const usuario = ref(null)
const newEmail = ref('')
const newContrasena = ref('')
const confirmacionContrasena = ref('')
const contrasenaVerificationEliminacion = ref('')
const dialogMensaje = ref(false)
const mensaje = ref('')
const breadcrumbs = [
    {
        title: 'Inicio',
        disabled: false,
        href: '/',
    },
    {
        title: 'Administración',
        disabled: false,
        href: '/administracion',
    },
    {
        title: 'Usuarios',
        disabled: false,
        href: '/administracion/usuarios',
    },
    {
        title: 'Usuario',
        disabled: true,
        href: '',
    },
]

// Methods
const cargarUsuario = async () => {
    cargandoUsuario.value = true

    const { $apiUsuario } = useNuxtApp()
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await $apiUsuario.get(`/usuarios/uid/${route.params.codigo}`, config)
    usuario.value = response.data.resultado
    newEmail.value = usuario.value.email

    cargandoUsuario.value = false
}

const actualizarCorreo = async () => {
    const user = currentUser()
    const { $apiUsuario } = useNuxtApp()

    let token = ''
    if (user) token = await user.getIdToken()
    const body = { correo: newEmail.value }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    // await $apiUsuario.put(`/usuarios/correo`, body, config)
    logout()
    myUser.value = null
    router.push('/administracion')
}

const actualizarContrasena = async () => {
    const user = currentUser()
    const { $apiUsuario } = useNuxtApp()

    let token = ''
    if (user) token = await user.getIdToken()
    const body = { contrasena: newContrasena.value, confirmacionContrasena: confirmacionContrasena.value }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    await $apiUsuario.put(`/usuarios/contrasena`, body, config)
    logout()
    myUser.value = null
    router.push('/administracion')
}

const eliminarUsuario = async () => {
    const user = currentUser()
    const { $apiUsuario } = useNuxtApp()

    let token = ''
    if (user) token = await user.getIdToken()
    const body = { contrasena: contrasenaVerificationEliminacion.value }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    await $apiUsuario.put(`/usuarios/eliminar-usuario`, body, config)
    logout()
    myUser.value = null
    router.push('/')

    contrasenaVerificationEliminacion.value = ''
}

const logout = () => signOutUser()


// Computed
const emailVerification = computed(() => {
    const errors = []

    const validateEmail = (email) => {
        return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }

    if (!newEmail.value) return errors
    if (!validateEmail(newEmail.value)) errors.push('El correo no es válido.')

    return errors
})

const contrasenaVerification = computed(() => {
    const errors = []

    if (!newContrasena.value) return errors
    if (newContrasena.value.length < 6) errors.push('La contraseña debe tener al menos 6 caracteres.')

    return errors
})

const confirmacionContrasenaVerification = computed(() => {
    const errors = []

    if (!confirmacionContrasena.value) return errors
    if (confirmacionContrasena.value.length < 6) errors.push('La contraseña debe tener al menos 6 caracteres.')
    if (newContrasena.value !== confirmacionContrasena.value) errors.push('La confirmación de contraseña debe ser igual a la contraseña.')

    return errors
})

const computedContrasenaVerificationEliminacion = computed(() => {
    const errors = []

    if (!contrasenaVerificationEliminacion.value) return errors
    if (contrasenaVerificationEliminacion.value.length < 6) errors.push('La contraseña debe tener al menos 6 caracteres.')

    return errors
})


// Hooks
onMounted(async () => {
    await cargarUsuario()
})


</script>



<style scoped>


</style>