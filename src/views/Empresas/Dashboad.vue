<template>
  <div>
    <v-card class="mb-6" v-if="$can('read', 'dashboad-empresa')">
      <v-card-title>Seja bem vindo na área da empresa 🚀</v-card-title>
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
      
    })
    return {

    }
  },
};
</script>

<style>
</style>