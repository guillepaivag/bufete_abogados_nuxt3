<template>
  <div class="blog-wrapper">
    <div class="blog-card">
      <div class="card-img">
        <img :src="servicio.foto">
        <h1>{{ servicio.titulo }}</h1>
      </div>
      <div class="card-text"><p v-html="servicio.descripcion"></p></div>
      <NuxtLink class="read-more" :to="`servicio/${servicio.codigo}`" style="text-decoration: none;">
        Ver Más
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    servicio: Object,
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
@import url(https://fonts.googleapis.com/css?family=Oswald|Roboto|Slabo+27px);
h1{
  font-size:32px;
  margin-top:30px;
  text-align:center;
}

.blog-wrapper{
  display:flex;
  flex-direction:row;
  justify-content:center;
  flex-wrap:wrap;
  .blog-card{
    max-width:600px;
    background:#fff;
    border:1px solid #dfb758;
    text-align:center;
    // cursor:pointer;
    &:hover{
      box-shadow: 0 3px 10px 0 rgba(0,0,0,.1);
      .card-img{
        img{
          opacity:0.8;
        }
      }
    }
    .card-img{
      position:relative;
      text-align:center;
      background:#dfb758;
      img{
        object-fit: cover;
        max-height:220px;
        width:100%;
        border-bottom:4px solid #dfb758;

      }
      &:before{
        content:'';
        position: absolute;
        bottom: -8px;
        left: 50%;
        margin-left: -10px;
        width: 0;
        height: 0;
        border-top: solid 10px #dfb758;
        border-left: solid 10px transparent;
        border-right: solid 10px transparent;
      }
      h1{
        position:absolute;
        margin:0;
        font-size:35px;
        bottom:15px;
        width:100%;
        color:#fff;

      }
    }
    .card-details{
      margin-top:30px;
      font-family: 'Roboto', sans-serif;
      color:#3C3C3C;
      span{   
        padding:0 30px;
        i{
          margin-right:5px;
        }
        
      }
    }
    .card-text{
      padding:30px 15px;
      font-family: 'Roboto', sans-serif;
      line-height:22px;
    }
    .read-more{
      display:inline-block;
      width:auto;
      text-align:center;
      text-transform:uppercase;
      background:#dfb758;
      color:#fff;
      padding:15px;
      margin-bottom:30px;
      letter-spacing: 2px;
      font-family: 'Poppins' !important;
      &:hover{
        background: darken(#dfb758,20%);
      }
    }
  }
}

</style>