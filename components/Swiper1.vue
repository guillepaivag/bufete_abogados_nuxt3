<template>
  <swiper 
    :centeredSlides="true"
    :breakpoints="{
      '640': {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      '768': {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      '1024': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    }"
    navigation
    :pagination="{ clickable: true }" 
    @swiper="onSwiper" 
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(servicio, index) in servicios" :key="index">
      <SwiperCard1 :servicio="servicio" />
    </swiper-slide>
  </swiper>
</template>

<script>
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cube'

import SwiperCard1 from './SwiperCard1.vue';

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y]);

// Import Swiper styles
export default {
  props: {
    servicios: Array,
  },
  components: {
    Swiper,
    SwiperSlide,
    SwiperCard1
  },
  methods: {
    onSwiper(swiper) {
      // console.log(swiper)
    },
    onSlideChange() {
      // console.log('slide change')
    },
  },
};
</script>

<style>

</style>