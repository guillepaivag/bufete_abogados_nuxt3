<template>
    <v-footer color="#888888">
        <v-row justify="center" no-gutters class="mt-4 mb-2">
            <v-btn v-for="link in links" :key="link" color="white" variant="text" class="mx-2" rounded="xl"
                :to="link.to">
                {{ link.nombre }}
            </v-btn>
            <v-col class="text-center mt-4" cols="12">
                {{ new Date().getFullYear() }} — <strong>Consultoría Legal</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script setup>
const links = ref([{
    nombre: 'Inicio',
    to: '/'
},
{
    nombre: 'Nuestra Firma',
    to: '/#firma'
},
{
    nombre: 'Servicios',
    to: '/#servicios'
},
{
    nombre: 'Contáctanos',
    to: '/#contactos'
},
{
    nombre: 'Inicio Sesión',
    to: '/administracion'
},
])
</script>
