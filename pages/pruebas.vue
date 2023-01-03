<template>
    <div>
        Hola mundo - {{ variable }}
    
        <button v-on:click="incrementar">siuuu
        </button>
        <br><br><br><br><br><br><br><br><br><br><br><br>

        <TipTap v-model="content" :max-limit="280" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const variable = ref(0)

const incrementar = () => {
    variable.value++
}
</script>

<script>
import TipTap from '../components/TipTap.vue';

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