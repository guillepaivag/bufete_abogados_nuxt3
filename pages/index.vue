<template>

    <div>
        <v-app>
            <div class="wrp">
                <div class="portada"></div>
                <div class="contenido">
                    <div class="info">
                        <h1>Consultoría: Legal, Fiscal, Corporativa y Procesal</h1>
                        <a class="btn-servicios" href="#servicios">Servicios</a>
                        <a class="btn-contactar" style="margin-left: 20px;" href="#contactos">Contactar</a>
                    </div>
                </div>
                <div class="curveado">
                    <img src="~/assets/images/img2.svg">
                </div>
            </div>

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
                        <v-text-field class="input-contacto" v-model="emailDataCorreo" label="Correo"
                            required></v-text-field>
                        <v-text-field class="input-contacto" v-model="emailDataAsunto" label="Asunto"
                            required></v-text-field>
                        <TipTap v-model="emailDataContenido" :max-limit="2500" class="tiptap" />
                        <div class="container text-right">
                            <v-btn class="read-more" @click="enviarMensaje" style="text-decoration: none;" 
                            :disabled="!emailDataCorreo.length || !emailDataAsunto.length || emailDataContenido.length < 8 ">
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

            <div class="">

            </div>

            <v-footer color="#888888">
                <v-row justify="center" no-gutters class="mt-4 mb-2">
                    <v-btn v-for="link in links" :key="link" color="white" variant="text" class="mx-2"
                        rounded="xl" :to="link.to">
                        {{ link.nombre }}
                    </v-btn>
                    <v-col class="text-center mt-4" cols="12">
                        {{ new Date().getFullYear() }} — <strong>Consultoría Legal</strong>
                    </v-col>
                </v-row>
            </v-footer>
        </v-app>
    </div>
</template>

<script setup>
import Swiper1 from "@/components/Swiper1.vue"
import $ from 'jquery'
import { onMounted } from "vue";
const items = ref([])
const quienesSomos = ref(null)

const emailDataCorreo=ref('')
const emailDataAsunto=ref('')
const emailDataContenido=ref('')


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

await useAsyncData(async (context) => {
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

.wrp {
    width: 100%;
    height: 540px;
    position: relative;
    margin-bottom: 20px;
}

.portada {
    width: 100%;
    height: 100%;
    background: url("~/assets/images/portada_3.png");
    background-attachment: fixed;
}

.contenido {
    margin-top: -20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 11, 0.6);
}

.contenido .info {
    width: 100%;
    max-width: 750px;
    text-align: center;
}

.contenido .info h1 {
    color: #fff;
    font-size: 50px;
    text-shadow: 0px 1px 10px rgba(0, 0, 0, 0.4);
    margin-bottom: 25px;
    letter-spacing: 1px;
}

.contenido .info a {
    display: inline-block;
    text-decoration: none;
    font-size: 19px;
    padding: 10px 25px;
    color: #fff;
    border-radius: 50px;
    margin-bottom: 40px;
    border: 2px solid transparent;
    transition: all 300ms ease;
    letter-spacing: 0.5px;
    /*Para separar un poco las letras*/
}

.contenido .info a:hover {
    background: transparent;
    /*Fondo transparente*/
    border: 2px solid #fff;
}

.btn-servicios {
    background: #888888;
}

.btn-contactar {
    background: #dfb758;
}

.curveado {
    position: absolute;
    width: 100%;
    bottom: -10px;
}

.curveado img {
    width: 100%;
}

@media (max-width: 768px) {
    .contenido .info h1 {
        font-size: 35px;
    }
}

@media (max-width: 520px) {
    .contenido .info h1 {
        font-size: 30px;
    }
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