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
                                <h3>Servicios</h3>
                                <v-divider class="mb-3" />

                                <div v-for="(servicio, index) in listaServicios" :key="index"
                                    on-click="" style="text-decoration: none;">
                                    <div class="card_usuario">
                                        <span>{{ servicio.titulo }}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </v-col>
                    <v-col cols="12" md="8">
                        <div class="pa-5">
                            <v-card class="mx-auto" max-width="650" v-if="servicioSeleccionado">
                                <v-img class="align-end text-white" height="400" :src=servicioSeleccionado.foto cover>
                                    <v-card-title>Quienes Somos</v-card-title>
                                </v-img>
                                <v-card-text>
                                    <div v-html="servicioSeleccionado.texto"></div>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn color="primary" @click="dialog = true">
                                        Editar datos
                                    </v-btn>
                                    <v-btn color="primary" @click="dialog = true">
                                        Editar contenido
                                    </v-btn>
                                    <v-btn color="primary" @click="dialog = true">
                                        Cambiar Imagen
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
                                @click="content === servicioSeleccionado.texto ? dialog = false : dialogSalir = true">
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
                                @click="dialogSalir = false; dialog = false; content = servicioSeleccionado.texto">
                                Salir sin guardar
                            </v-btn>
                            <v-btn color="green-darken-1" variant="text" @click="dialogSalir = false">
                                Seguir Editando
                            </v-btn>
                            <v-btn color="primary-darken-1" variant="text"
                                @click="dialogSalir = false; dialog = false; actualizar()" :loading="actualizando">
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
import { doc, getDoc, query, collection, where, getDocs  } from "firebase/firestore";
import { db } from "../../../firebase-services/apps/firebaseFirestoreDefault.js"

let actualizando = ref(false)
let dialogSalir = ref(false)
let dialog = ref(false)
let listaServicios = ref([])
let servicioSeleccionado = ref(null)
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
        disabled: false,
        href: '/administracion/contenidos',
    },
    {
        title: 'Servicios',
        disabled: true,
        href: '/administracion/contenidos/servicios',
    },
]

onMounted(async () => {
    await obtenerServicios()
})

const obtenerServicios = async () => {
    listaServicios.value = []
    const q = query(collection(db, "Contenidos"), where("tipo", "==", "Servicio"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        listaServicios.value.push(doc.data())
    });
}

const obtenerservicioSeleccionado = async () => {
    const { $apiContenido } = useNuxtApp()

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await $apiContenido.get('/codigo/quienes-somos', config)

    servicioSeleccionado.value = response.data.resultado
    content.value = servicioSeleccionado.value.texto
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
            'codigo': servicioSeleccionado.value.codigo,
            'titulo': servicioSeleccionado.value.titulo,
            'descripcion': "--------------",
            'texto': content.value,
            'foto': servicioSeleccionado.value.foto,
            'tipo': servicioSeleccionado.value.tipo
        }
        const response = await $apiContenido.put(`/${servicioSeleccionado.value.uid}`, body, config)
        dialog.value = false
        servicioSeleccionado.value.texto = response.data.resultado.texto
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