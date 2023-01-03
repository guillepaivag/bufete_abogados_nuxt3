<template>
    <div>
        <div class="wrp">
            <div class="portada"></div>
            <div class="contenido">
                <div class="info">
                    <h1>Consultoría: Legal, Fiscal, Corporativa y Procesal</h1>
                    <a class="btn-servicios" href="#">Servicios</a>
                    <a class="btn-contactar" style="margin-left: 20px;" href="#">Contactar</a>
                </div>
            </div>
            <div class="curveado">
                <img src="~/assets/images/img2.svg">
            </div>
        </div>

        <div class="conteiner_servicios">
            <h1>Servicios</h1>
            <hr>
        </div>
        <br><br><br><br><br><br>

        <div class="conteiner_contactos">
            <h1>Contactos</h1>
            <hr>
        </div>
        <br><br><br><br><br><br>
    </div>
</template>

<script setup>
import { ref } from 'vue'

</script>

<style>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
}

</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

.wrp {
    width: 100%; height: 540px;
    position: relative;
    margin-bottom: 40px;
}
.portada {
    width: 100%; height: 100%;
    background: url("~/assets/images/portada_3.png");
    background-attachment: fixed;
}
.contenido {
    margin-top: -20px;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,11,0.6);
}
.contenido .info {
    width: 100%;
    max-width: 750px;
    text-align: center;
}
.contenido .info h1 {
    color: #fff;
    font-size: 50px;
    text-shadow: 0px 1px 10px rgba(0,0,0,0.4);
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
    letter-spacing: 0.5px; /*Para separar un poco las letras*/
}
.contenido .info a:hover {
    background: transparent; /*Fondo transparente*/
    border: 2px solid #fff;
}
.btn-servicios {
    background: #888888;
}
.btn-contactar {
    background: #caba10;
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

.conteiner_servicios {
    margin: 0 120px;
}

.conteiner_contactos {
    margin: 0 120px;
}
</style>