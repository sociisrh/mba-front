<template>
  <layout-blank>
    <slot></slot>
    <SnackBar />
  </layout-blank>
</template>

<script>
import LayoutBlank from '@/@core/layouts/variants/blank/LayoutBlank.vue'
import SnackBar from '@/components/SnackBar.vue'

export default {
  components: {
    LayoutBlank,
    SnackBar
  },
}
</script>

<style>
</style>
