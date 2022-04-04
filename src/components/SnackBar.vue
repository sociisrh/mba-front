<template lang="html">

  <section class="snack-bar">
    <v-snackbar
      :light="$vuetify.theme.dark"
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :color="color"
      :vertical="mode === 'vertical'"
    >
      <span style="color:white;" v-html="text"></span>
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Fechar
      </v-btn>
    </v-snackbar>
  </section>

</template>

<script lang="js">
export default  {
  name: 'snack-bar',
  props: [],
  mounted() {

  },
  data() {
    return {
      y: 'top',
      x: 'right',
      mode: ''
    }
  },
  methods: {
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.getters['module/getSnackBar']
      },
      set(value) {
        this.$store.dispatch('module/setSnackBar',value)
      }
    },
    timeout() { return this.$store.getters['module/getTimeout'] },
    text() { return this.$store.getters['module/getText'] },
    color() { return this.$store.getters['module/getColor'] },
  }
}
</script>

<style scoped lang="scss">
.snack-bar .v-snack {
  margin-top: 50px;
}
</style>
