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
                    <v-col cols="12" md="3">
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
                    <v-col cols="12" md="9">
                        <div class="pa-5">
                            <v-card class="mx-auto" max-width="650" v-if="quienesSomos">
                                <v-img class="align-end text-white" height="400"
                                    :src=quienesSomos.foto cover>
                                    <v-card-title>Quienes Somos</v-card-title>
                                </v-img>
                                <v-card-text>
                                    <div >{{ quienesSomos.texto }}</div>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn color="orange">
                                        Editar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
            <!-- editar -->
            <v-dialog max-width="600" v-model="dialog">
                <v-card class="pa-3">
                    <v-card-text class="mb-3">
                        <v-form @submit.prevent="actualizar">
                            <div class="mb-3">
                                <TipTap v-model="content" :max-limit="2500" />
                            </div>
                            
                            <div class="">
                                <v-btn
                                    class="mr-4"
                                    color="primary"
                                    @click="actualizar"
                                >
                                    Actualizar
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
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

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
    content = quienesSomos.value.texto
    console.log('response', response)
}

</script>

<script>
import TipTap from '../../../components/TipTap.vue';

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