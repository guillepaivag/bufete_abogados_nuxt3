<template>

    <div>
        <v-app>
            <Header></Header>
            
            <v-container v-if="quienesSomos" class="mb-15">
                <h1 class="mb-2" id="firma">Nuestra Firma</h1>
                <hr class="mb-7">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-img class="bg-white" max-width="700" :aspect-ratio="1.3" :src="quienesSomos.foto"
                            cover></v-img>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="px-0" v-html="quienesSomos.texto"></div>
                    </v-col>
                </v-row>
            </v-container>

            <v-container class="mb-15">
                <h1 id="servicios" class="mb-2">Servicios</h1>
                <hr class="mb-7">
                <Swiper1 :servicios="items" />
            </v-container>

            <v-container class="mb-15 contactos">
                <h1 id="contactos" class="mb-2">Contactos</h1>
                <hr class="mb-7">
                <v-row>
                    <v-col class="pa-2" cols="12" md="7">
                        <v-text-field 
                            class="input-contacto" 
                            v-model="emailDataCorreo" 
                            label="Mi correo"
                            required
                        ></v-text-field>
                        <v-text-field 
                            class="input-contacto" 
                            v-model="emailDataAsunto" 
                            label="Asunto"
                            required
                        ></v-text-field>
                        <TipTap 
                            v-model="emailDataContenido" 
                            :max-limit="2500" 
                            class="tiptap" 
                        />
                        <div class="container text-right">
                            <v-btn 
                                class="read-more" 
                                @click="enviarMensaje" 
                                style="text-decoration: none;" 
                                :disabled="!emailDataCorreo.length || !emailDataAsunto.length || emailDataContenido.length < 8 "
                                :loading="enviandoCorreo"
                            >
                                Enviar
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col cols="12" md="5">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d241.32895825324812!2d-90.48637906063676!3d14.584065131636544!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a375b85c9525%3A0xe6635e1b73a81a0e!2sBlvd.%20Vista%20Hermosa%2C%20Cdad.%20de%20Guatemala!5e0!3m2!1ses!2sgt!4v1673065863885!5m2!1ses!2sgt"
                            width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </v-col>
                </v-row>
            </v-container>

            <Footer></Footer>
        </v-app>
    </div>
</template>

<script setup>
import Swiper1 from "@/components/Swiper1.vue"
import $ from 'jquery'
import { onMounted } from "vue";
const items = ref([])
const quienesSomos = ref(null)

const emailDataCorreo = ref('')
const emailDataAsunto = ref('')
const emailDataContenido = ref('')
const enviandoCorreo = ref(false)

useAsyncData(async (context) => {
    console.log('process server:', process.server)

    const config = {
        headers: { 'Content-Type': 'application/json' }
    }

    try {
        const response_quienesSomos = await context.$apiContenido.get(`/contenidos/codigo/quienes-somos`, config)
        quienesSomos.value = response_quienesSomos.data.resultado

        const response_servicios = await context.$apiContenido.get(`/contenidos/servicios`, config)
        items.value = response_servicios.data.resultado
    } catch (error) {
        console.log('ERROR: ', error)
    }
})

const enviarMensaje = async () => {
    enviandoCorreo.value = true
    const nuxtApp = useNuxtApp()

    const body = { 
        correo: emailDataCorreo.value, 
        asunto: emailDataAsunto.value, 
        contenido: emailDataContenido.value 
    }
    const config = { 
        headers: { 'Content-Type': 'application/json' } 
    }
    await nuxtApp.$apiCorreo.post('/correos/correo-de-contacto', body, config)

    emailDataCorreo.value = ''
    emailDataAsunto.value = ''
    emailDataContenido.value = ''

    enviandoCorreo.value = false
}

onMounted(async (context) => {
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
})

</script>

<script>
import Footer from "~~/components/Footer.vue";
import Header from "~~/components/Header.vue";
export default {
    components: {
        Footer,
        Header
    }
}
</script>


<style lang="scss" scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap'); */
hr {
    width: 90px;
    height: 3px;
    background: #f7d584;
    border: 0;
}

.tiptap {
    background: #ffffff;
}


.new_container {
    text-align: center;
    max-width: 1100px;
    padding: 30px;
    margin-top: 8%;
    margin: 0 120px;
}

.conteiner_quienesSomos {
    margin: 0 0;
}

.conteiner_servicios {
    margin: 0 0;
}

.conteiner_contactos {
    margin: 0 0;
}

.read-more {
    cursor: pointer;
    margin-top: 10px;
    display: inline-block;
    width: auto;
    height: 50px;
    text-align: center;
    text-transform: uppercase;
    background: #dfb758;
    color: #fff;
    margin-bottom: 30px;
    letter-spacing: 2px;
    font-family: 'Poppins' !important;
    border-radius: 0;
    box-shadow: none;
    &:hover {
        background: darken(#dfb758, 20%);
    }
}
</style>