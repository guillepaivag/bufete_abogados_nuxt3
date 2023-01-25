<template>
    <div class="wrp">
        <div class="portada"></div>
        <div class="contenido">
            <div class="info">
                <h1>Consultoría: Legal, Fiscal, Corporativa y Procesal</h1>
                <a class="btn-servicios" href="/#servicios">Servicios</a>
                <a class="btn-contactar" style="margin-left: 20px;" href="/#contactos">Contactar</a>
            </div>
        </div>
        <div class="curveado">
            <img src="~/assets/images/img2.svg">
        </div>
    </div>
</template>

<style scoped>
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
.curveado {
    position: absolute;
    width: 100%;
    bottom: -10px;
}

.curveado img {
    width: 100%;
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

</style>