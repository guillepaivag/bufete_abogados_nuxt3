<template>
  <div>
    <v-app>
      <v-parallax
        src="https://media.istockphoto.com/id/1351895555/photo/orange-and-yellow-gradient-defocused-blurred-motion-abstract-background.jpg?b=1&s=170667a&w=0&k=20&c=pUsEOtS6PgM-WX-tGf7C0_G6_rrukwMfguxJp0zfkww="
        height="200"
      >
        <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <h1 v-if="servicio" class="mb-4">
            {{ servicio.titulo }}
          </h1>
          <h4 class="subheading">
            Consultoría Legal
          </h4>
        </div>
      </v-parallax>

      <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:prepend>
              <v-icon size="small" icon="mdi-vuetify"></v-icon>
          </template>
      </v-breadcrumbs>

      <v-container v-if="servicio" class="mb-15">
        <h1 class="mb-2" id="">{{servicio.titulo}}</h1>
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

// Variables
const route = useRoute()
const servicio = ref(null)
const codigo = ref('')
const breadcrumbs = [
    {
        title: 'Inicio',
        disabled: false,
        href: '/',
    },
    {
        title: 'Servicio',
        disabled: true,
        href: '',
    },
]

useAsyncData(async (context) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    }
    codigo.value = route.params.codigo

    try {
      const response_servicio = await context.$apiContenido.get(`/contenidos/codigo/${codigo.value}`,config)
      servicio.value = response_servicio.data.resultado
    } catch (error) {
      console.log("ERROR: ", error);
    }
})

</script>

<style scoped>
hr {
    width: 90px;
    height: 3px;
    background: #f7d584;
    border: 0;
}
</style>
