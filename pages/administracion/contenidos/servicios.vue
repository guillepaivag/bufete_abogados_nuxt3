<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
            <template v-slot:prepend>
                <v-icon size="small" icon="mdi-vuetify"></v-icon>
            </template>
        </v-breadcrumbs>

        <v-container>
            <v-card class="">
                <v-row>
                    <v-col cols="12" md="4">
                        <div class="pa-2">

                            <div class="mb-5">
                                <v-btn class="mb-5" block variant="tonal" color="green"
                                    @click="dialogCreacionServicio = true">
                                    Crear servicio
                                </v-btn>

                                <h3>Servicios</h3>
                                <v-divider class="mb-3" />

                                <div v-for="(servicio, index) in listaServicios" :key="index"
                                    @click="seleccionarServicio(index)" style="text-decoration: none;">
                                    <div class="card_usuario">
                                        <span>{{ servicio.titulo }}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </v-col>
                    <v-col cols="12" md="8">
                        <div class="pa-2">
                            <v-card class="mx-auto" max-width="650" v-if="servicioSeleccionado">
                                <v-card-actions>
                                    <v-btn variant="tonal" color="primary" @click="dialogActualizacionServicio = true">
                                        Editar datos
                                    </v-btn>
                                    <v-btn variant="tonal" color="primary" @click="dialogActualizacionContenido = true">
                                        Editar contenido
                                    </v-btn>
                                    <v-btn variant="tonal" color="primary" @click="dialogCambiarImagen = true">
                                        Cambiar Imagen
                                    </v-btn>
                                </v-card-actions>

                                <v-img class="align-end text-white mb-3" height="400" :src="servicioSeleccionado.foto"
                                    cover>
                                    <v-card-title
                                        style="font-size: 30px;">{{ servicioSeleccionado.titulo }}</v-card-title>
                                </v-img>

                                <div class="pa-3">
                                    <h3>Descripción</h3>
                                    <hr class="mb-3">
                                    <v-card-text v-html="servicioSeleccionado.descripcion" />

                                    <h3>Contenido</h3>
                                    <hr class="mb-3">
                                    <v-card-text v-html="servicioSeleccionado.texto" />
                                </div>

                                <v-card-actions>
                                    <v-btn v-if="listaServicios.length" block variant="outlined" color="red"
                                        @click="eliminar">
                                        Eliminar servicio
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </v-card>

            <!-- editar -->
            <v-dialog max-width="1000" v-model="dialogActualizacionContenido" persistent>
                <v-card class="pa-3">
                    <v-card-text class="mb-3">
                        <div class="mb-3">
                            <TipTap v-model="contenidoActualizado" :max-limit="2500" />
                        </div>

                        <div class="">
                            <v-btn class="mr-4" color="primary" @click="actualizarContenido" :loading="actualizando">
                                Actualizar
                            </v-btn>
                            <v-btn color="red" variant="outlined"
                                @click="dialogActualizacionContenido = false; seleccionarServicio(indexServicioSeleccionado);">
                                Cancelar
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog max-width="1000" v-model="dialogActualizacionServicio" persistent>
                <v-card v-if="datosActualizacionServicio" class="pa-3">
                    <v-card-text class="mb-3">
                        <div class="mb-3">
                            <h3>Codigo</h3>
                            <hr class="mb-5">
                            <v-text-field v-model="datosActualizacionServicio.codigo"
                                :error-messages="codigoVerificacionActualizar" label="Codigo"></v-text-field>

                            <h3>Titulo</h3>
                            <hr class="mb-5">
                            <v-text-field v-model="datosActualizacionServicio.titulo"
                                :error-messages="tituloVerificacionActualizar" label="Titulo"></v-text-field>

                            <h3>Descripción</h3>
                            <hr class="mb-5">
                            <TipTap v-model="datosActualizacionServicio.descripcion" :max-limit="700" />
                        </div>

                        <div class="">
                            <v-btn
                                :disabled="!datosActualizacionServicio.codigo || !datosActualizacionServicio.titulo || !datosValidosParaActualizar"
                                class="mr-4" color="primary" @click="actualizar" :loading="actualizando">
                                Actualizar
                            </v-btn>
                            <v-btn color="red" variant="outlined"
                                @click="dialogActualizacionServicio = false; seleccionarServicio(indexServicioSeleccionado);">
                                Cancelar
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog max-width="1000" v-model="dialogCambiarImagen" persistent>
                <v-card class="pa-3">
                    <v-card-text class="mb-3">
                        <h3>Cambiar Imagen</h3>
                            <hr class="mb-5">
                        <Foto :servicio="servicioSeleccionado" :estado="cargandoImagen"></Foto>
                        <v-btn color="red" variant="outlined" class="mt-3"
                        @click="dialogCambiarImagen = false" :disabled="cargandoImagen.cargando">
                        Cerrar
                    </v-btn>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog max-width="1000" v-model="dialogCreacionServicio" persistent>
                <v-card class="pa-3">
                    <v-card-text class="mb-3">
                        <div class="mb-3">
                            <h3>Codigo</h3>
                            <hr class="mb-5">
                            <v-text-field v-model="datosCreacionServicio.codigo"
                                :error-messages="codigoVerificacionCreacion" label="Codigo"></v-text-field>

                            <h3>Titulo</h3>
                            <hr class="mb-5">
                            <v-text-field v-model="datosCreacionServicio.titulo"
                                :error-messages="tituloVerificacionCreacion" label="Titulo"></v-text-field>
                        </div>

                        <div class="">
                            <v-btn
                                :disabled="!datosCreacionServicio.codigo || !datosCreacionServicio.titulo || !datosValidosParaCrear"
                                class="mr-4" color="primary" @click="crear" :loading="creando">
                                Crear
                            </v-btn>
                            <v-btn color="red" variant="outlined"
                                @click="dialogCreacionServicio = false; datosCreacionServicio = { codigo: '', titulo: '' }">
                                Cancelar
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>

        </v-container>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-services/apps/firebaseFirestoreDefault.js"

// Components
import TipTap from '../../../components/TipTap.vue';

definePageMeta({
    middleware: 'autenticado'
})

// Data
const listaServicios = ref([])
const servicioSeleccionado = ref(null)
const indexServicioSeleccionado = ref(-1)

const creando = ref(false)
const dialogCreacionServicio = ref(false)
const datosCreacionServicio = ref({ codigo: '', titulo: '' })
const datosValidosParaCrear = ref(false)

const actualizando = ref(false)
const dialogActualizacionServicio = ref(false)
const datosActualizacionServicio = ref(null)
const dialogActualizacionContenido = ref(false)
const contenidoActualizado = ref('')
const datosValidosParaActualizar = ref(false)

const dialogCambiarImagen = ref(false)
const cargandoImagen = ref({})
cargandoImagen.value.cargando = false

const eliminando = ref(false)

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

const obtenerServicios = async () => {
    listaServicios.value = []
    const q = query(collection(db, "Contenidos"), where("tipo", "==", "Servicio"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        listaServicios.value.push(doc.data())
    })
}

const seleccionarServicio = (index) => {
    servicioSeleccionado.value = listaServicios.value[index]
    indexServicioSeleccionado.value = index
    datosActualizacionServicio.value = {
        titulo: listaServicios.value[index].titulo,
        codigo: listaServicios.value[index].codigo,
        descripcion: listaServicios.value[index].descripcion,
    }
    contenidoActualizado.value = listaServicios.value[index].texto
}

const crear = async () => {
    creando.value = true
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
            codigo: datosCreacionServicio.value.codigo,
            titulo: datosCreacionServicio.value.titulo,
        }
        const response = await $apiContenido.post(`/contenidos`, body, config)
        listaServicios.value.push(response.data.resultado)
        dialogCreacionServicio.value = false
        datosCreacionServicio.value.codigo = ''
        datosCreacionServicio.value.titulo = ''
    }
    creando.value = false
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
            codigo: datosActualizacionServicio.value.codigo,
            titulo: datosActualizacionServicio.value.titulo,
            descripcion: datosActualizacionServicio.value.descripcion,
        }
        const response = await $apiContenido.put(`/contenidos/${servicioSeleccionado.value.uid}`, body, config)
        dialogActualizacionServicio.value = false
        servicioSeleccionado.value.codigo = response.data.resultado.codigo
        servicioSeleccionado.value.titulo = response.data.resultado.titulo
        servicioSeleccionado.value.descripcion = response.data.resultado.descripcion
    }
    actualizando.value = false
}

const actualizarContenido = async () => {
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
            texto: contenidoActualizado.value,
        }
        const response = await $apiContenido.put(`/contenidos/${servicioSeleccionado.value.uid}`, body, config)
        dialogActualizacionContenido.value = false
        servicioSeleccionado.value.texto = response.data.resultado.texto
    }
    actualizando.value = false
}

const eliminar = async () => {
    // Eliminar
    eliminando.value = true
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

        await $apiContenido.delete(`/contenidos/${servicioSeleccionado.value.uid}`, config)
    }
    eliminando.value = false

    // Eliminar elemento eliminado de listaServicios
    const index = listaServicios.value.findIndex(v => v.uid === servicioSeleccionado.value.uid)
    listaServicios.value.splice(index, 1)

    // Seleccionar el index en 0 eliminado en seleccionarServicio()
    seleccionarServicio(0)
}

// Computed
const codigoVerificacionCreacion = computed(() => {
    const errors = []

    const esCodigo = (cadena) => /^[a-zA-Z0-9-]+$/.test(cadena)

    if (!datosCreacionServicio.value.codigo) return errors
    if (!esCodigo(datosCreacionServicio.value.codigo)) errors.push('El codigo es invalido. Solo puede tener a-z A-Z 0-9 -')

    datosValidosParaCrear.value = !errors.length

    return errors
})

const tituloVerificacionCreacion = computed(() => {
    const errors = []

    if (!datosCreacionServicio.value.titulo) return errors
    if (datosCreacionServicio.value.titulo.length < 2) errors.push('El titulo es desde 2 caracteres.')
    if (datosCreacionServicio.value.titulo.length > 100) errors.push('El titulo es hasta 100 caracteres.')

    datosValidosParaCrear.value = !errors.length

    return errors
})

const codigoVerificacionActualizar = computed(() => {
    const errors = []

    const esCodigo = (cadena) => /^[a-zA-Z0-9-]+$/.test(cadena)

    if (!datosActualizacionServicio.value.codigo) return errors
    if (!esCodigo(datosActualizacionServicio.value.codigo)) errors.push('El codigo es invalido. Solo puede tener a-z A-Z 0-9 -')

    datosValidosParaActualizar.value = !errors.length

    return errors
})

const tituloVerificacionActualizar = computed(() => {
    const errors = []

    if (!datosActualizacionServicio.value.titulo) return errors
    if (datosActualizacionServicio.value.titulo.length < 2) errors.push('El titulo es desde 2 caracteres.')
    if (datosActualizacionServicio.value.titulo.length > 100) errors.push('El titulo es hasta 100 caracteres.')

    datosValidosParaActualizar.value = !errors.length

    return errors
})

onMounted(async () => {
    await obtenerServicios()
    seleccionarServicio(0)
})

</script>

<script>
import Foto from "@/components/Foto.vue"
export default {
    components: {
        Foto,
    }
}
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