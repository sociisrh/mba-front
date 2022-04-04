<template>
  <div>
    <v-card class="mb-6">
      <v-card-title>Seja bem vindo 🚀</v-card-title>
      <v-card-text>Sprint 1.</v-card-text>
      <v-card-text>
        Sistema em fase de construção.
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import store from "@/store";
import { onUnmounted, onMounted, ref, reactive, computed, nextTick, watch, onUpdated } from "@vue/composition-api";


export default {
  name: "Dashboard-Administrativo",
  components: {
    
  },
  setup() {
    
    onMounted(() => {
      document.location.reload(true);
    })
    return {

    }
  },
};
</script>

<style>
</style>