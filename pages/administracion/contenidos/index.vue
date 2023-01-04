<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:prepend>
                <v-icon size="small" icon="mdi-vuetify"></v-icon>
            </template>
        </v-breadcrumbs>

        <div>
            <v-card class="ma-15">
                <v-row>
                    <v-col cols="12" md="4">
                        <div class="pa-5">

                            <div class="mb-5">
                                <h3>Quienes Somos</h3>
                                <v-divider class="mb-3" />

                                <v-btn color="primary" @click="dialog = true">
                                    Editar Quienes Somos
                                </v-btn>
                            </div>

                            <div class="mb-5">
                                <h3>Servicios</h3>
                                <v-divider class="mb-3" />

                                <v-btn color="primary" :to="`/administracion/usuarios/`">
                                    Ver Servicios
                                </v-btn>
                            </div>

                        </div>
                    </v-col>
                    <v-col cols="12" md="8">
                        <div class="pa-5">
                            <v-card class="mx-auto" max-width="650" v-if="quienesSomos">
                                <v-img class="align-end text-white" height="400" :src=quienesSomos.foto cover>
                                    <v-card-title>Quienes Somos</v-card-title>
                                </v-img>
                                <v-card-text>
                                    <div v-html="quienesSomos.texto"></div>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn color="primary" @click="dialog = true">
                                        Editar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
            <!-- editar -->
            <v-dialog max-width="800" v-model="dialog" persistent>
                <v-card class="pa-3">
                    <v-card-text class="mb-3">
                        <div class="mb-3">
                            <TipTap v-model="content" :max-limit="2500" />
                        </div>

                        <div class="">
                            <v-btn class="mr-4" color="primary" @click="actualizar" :loading="actualizando">
                                Actualizar
                            </v-btn>
                            <v-btn color="red"
                                @click="content === quienesSomos.texto ? dialog = false : dialogSalir = true">
                                Cancelar
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-row justify="center">
                <v-dialog max-width="600" v-model="dialogSalir" persistent>
                    <v-card>
                        <v-card-title class="text-h5">
                            Hay cambios sin guardar
                        </v-card-title>
                        <v-card-text>Si sales, se perderán tus cambios.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red-darken-1" variant="text" 
                            @click="dialogSalir = false; dialog = false; content = quienesSomos.texto">
                                Salir sin guardar
                            </v-btn>
                            <v-btn color="green-darken-1" variant="text" 
                            @click="dialogSalir = false">
                                Seguir Editando
                            </v-btn>
                            <v-btn color="primary-darken-1" variant="text" 
                            @click="dialogSalir = false; dialog = false; actualizar()" 
                            :loading="actualizando">
                                Actualizar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

let actualizando=ref(false)
let dialogSalir = ref(false)
let dialog = ref(false)
let quienesSomos = ref(null)
let content = ref("")
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
        title: 'Contenidos',
        disabled: true,
        href: '/administracion/contenidos',
    },
]

onMounted(async () => {
    await obtenerQuienesSomos()
})

const obtenerQuienesSomos = async () => {
    const { $apiContenido } = useNuxtApp()

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await $apiContenido.get('/codigo/quienes-somos', config)

    quienesSomos.value = response.data.resultado
    content.value = quienesSomos.value.texto
    console.log('response', response)
}

const actualizar = async () => {
    actualizando.value = true
    const { $apiContenido } = useNuxtApp()
    const user = currentUser()
    let token = ""

    if (user) {
        token = await user.getIdToken()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const body = {
            'codigo': quienesSomos.value.codigo,
            'titulo': quienesSomos.value.titulo,
            'descripcion': "--------------",
            'texto': content.value,
            'foto': quienesSomos.value.foto,
            'tipo': quienesSomos.value.tipo
        }
        const response = await $apiContenido.put(`/${quienesSomos.value.uid}`, body, config)
        dialog.value = false
        quienesSomos.value.texto = response.data.resultado.texto
    }
    actualizando.value = false
}

</script>

<script>
import TipTap from '../../../components/TipTap.vue';
import { currentUser } from '~~/composables/useFirebaseAuth';
export default {
    name: 'App',
    components: {
        TipTap,
    },
    data() {
        return {
            content: '',
        };
    },
    methods: {
        onSubmit() {
            alert(JSON.stringify(this.content));
        },
    },
    watch: {
        content: function (n, v) {
            console.log(this.content)
        }
    }
    
};
</script>