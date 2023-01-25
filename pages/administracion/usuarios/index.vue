<template>
    <div class="">

        <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
            <template v-slot:prepend>
                <v-icon size="small" icon="mdi-vuetify"></v-icon>
            </template>
        </v-breadcrumbs>

        <v-container>
            <v-card class="">
                <v-row>
                    <v-col cols="12" md="6">
                        <div class="pa-5">
                
                            <div class="mb-5">
                                <h3>Crear usuario</h3>
                                <v-divider class="mb-3" />

                                <v-btn
                                    color="primary"
                                    @click="dialog = true"
                                >
                                    Crear usuario
                                </v-btn>
                            </div>

                            <div class="mb-5">
                                <h3>Ver mi usuario</h3>
                                <v-divider class="mb-3" />

                                <v-btn
                                    color="primary"
                                    :to="`/administracion/usuarios/${myUser.uid}`"
                                >
                                    Ver mi usuario
                                </v-btn>
                            </div>

                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="pa-5">
                            <h3 class="mb-4">Todos los usuarios</h3>

                            <div v-if="cargandoListaUsuarios">
                                <v-progress-linear
                                    indeterminate
                                    color="yellow darken-2"
                                ></v-progress-linear>
                            </div>
                            <div v-else>
                                <NuxtLink 
                                    v-for="(usuario, index) in listaUsuarios" 
                                    :key="index" 
                                    :to="`/administracion/usuarios/${usuario.uid}`" 
                                    style="text-decoration: none;"
                                >
                                    <div class="card_usuario">
                                        <span>{{ usuario.email }}</span>
                                    </div>
                                </NuxtLink>

                                <v-btn
                                    v-if="pageToken"
                                    block
                                    color="primary"
                                    @click="paginarLista"
                                >
                                    Ver más
                                </v-btn>
                            </div>                            
                        </div>
                    </v-col>
                </v-row>
            </v-card>

            

            
            
            <!-- Crear -->
            <v-dialog max-width="600" v-model="dialog">
                <v-card class="pa-3">
                    <v-card-text class="mb-3">
                        <v-form @submit.prevent="create">
                            <div class="mb-3">
                                <v-alert
                                    color="purple"
                                    variant="outlined"
                                    class="mb-3"
                                >
                                    <span style="font-size: 14px;">
                                        Todos los usuarios tienen como contraseña: <b>123456</b> <p>Puedes actualizar tu contraseña luego</p>
                                    </span>
                                </v-alert>

                                <v-text-field
                                    v-model="newEmail"
                                    :error-messages="emailVerification"
                                    label="Ingrese un correo electronico"
                                    required
                                    outlined
                                ></v-text-field>
                            </div>
                            
                            <div class="">
                                <v-btn
                                    class="mr-4"
                                    color="primary"
                                    @click="create"
                                >
                                    Crear usuario
                                </v-btn>
                                <v-btn 
                                    class="mr-4"
                                    color="blue-grey"
                                    @click="clear"
                                >
                                    Limpiar
                                </v-btn>
                                <v-btn 
                                    color="red"
                                    @click="dialog = false"
                                >
                                    Cancelar
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>

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

            <!-- Ver mi usuario -->

            <!-- Listar -->
        </v-container>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

definePageMeta({
    middleware: 'autenticado'
})

// Data
const myUser = useUser()
const dialog = ref(false)
const newEmail = ref('')
const listaUsuarios = ref([])
const cargandoListaUsuarios = ref(true)
const pageToken = ref('')
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
        disabled: true,
        href: '/administracion/usuarios',
    },
]

// Methos
const create = async () => {
    const { $apiUsuario } = useNuxtApp()
    const body = { correo: newEmail.value }
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await $apiUsuario.post('/usuarios', body, config)
    console.log('response', response)

    clear()
    comenzarLista()

    listaUsuarios.value = []
    pageToken.value = ''
    dialog.value = false

    dialogMensaje.value = true
    mensaje.value = 'Se creó el usuario correctamente.'
}

const clear = () => {
    newEmail.value = ''
}

const comenzarLista = async () => {
    cargandoListaUsuarios.value = true
    await listar('')
    cargandoListaUsuarios.value = false
}

const paginarLista = async () => {
    if (!pageToken.value) return

    listar(pageToken.value)
}

const listar = async (nextPageToken) => {
    const { $apiUsuario } = useNuxtApp()
    const body = {
        cantidad: 5,
        nextPageToken
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await $apiUsuario.post('/usuarios/listar', body, config)
    console.log('response', response)

    const listaUsuariosAux = response.data.resultado.users
    pageToken.value = response.data.resultado.pageToken

    for (const iterator of listaUsuariosAux) 
        listaUsuarios.value.push(iterator)
}

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

onMounted(async () => {
    await comenzarLista()
})


</script>

<style scoped>
.card_usuario {
    padding: 7px;
    background: #c8640c;
    border-radius: .4rem;
    transition: 300ms;
    cursor: pointer;
    margin-bottom: 20px;
}

.card_usuario:hover {
    padding: 7px;
    background: #fa7d0f;
    border-radius: .4rem;
    transition: 300ms;
}

.card_usuario span {
    color: white;
}
</style>