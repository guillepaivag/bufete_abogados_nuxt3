<template>
    <div>
        Hola mundo - {{ variable }}
    
        <button v-on:click="incrementar">siuuu
        </button>
        
        <!-- <br><br><br><br><br><br> -->
        <v-card
            class="mx-auto"
            max-width="344"
            variant="outlined"
        >
            <v-card-item>
            <div>
                <div class="text-overline mb-1">
                OVERLINE
                </div>
                <div class="text-h6 mb-1">
                Headline
                </div>
                <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
            </div>
            </v-card-item>

            <v-card-actions>
            <v-btn variant="outlined" v-on:click="incrementar">
                Button
            </v-btn>
            </v-card-actions>
        </v-card>
        
        <!-- <br><br><br><br><br><br> -->
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