<template>
  <div>
    <v-app>
      <Header></Header>

      <v-container v-if="servicio" class="mb-15">
        <h1 class="mb-2" id="firma">{{servicio.titulo}}</h1>
        <hr class="mb-7" />
        <v-row>
          <v-col cols="12" md="6">
            <v-img
              class="bg-white"
              max-width="700"
              :aspect-ratio="1.3"
              :src="servicio.foto"
              cover
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <div class="px-0" v-html="servicio.texto"></div>
          </v-col>
        </v-row>
      </v-container>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
const  { $apiContenido }  = useNuxtApp()

const servicio = ref(null)

const codigo = ref(useRoute().params.codigo)

onMounted(async () => {

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  try {
    console.log("codigo.value",codigo.value)
    const response_servicio = await $apiContenido.get(`/contenidos/codigo/${codigo.value}`,config);
    servicio.value = response_servicio.data.resultado;
  } catch (error) {
    console.log("ERROR: ", error);
  }
});
</script>

<script>
import Header from "~~/components/Header.vue";

export default {
  data: () => ({
    servicio: null,
    codigo: "",
  }),

  components: {
    Header,
  },

};
</script>

<style scoped>
hr {
    width: 90px;
    height: 3px;
    background: #f7d584;
    border: 0;
}
</style>
