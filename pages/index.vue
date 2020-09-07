<template>
  <div class="container">
    <IndexSplash />
    <IndexHow />
    <IndexPrice />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SidebarUserCard extends Vue {}
</script>

<style lang="sass" scoped>
.container
 width: 100%

section
  min-height: 100vh

  &:first-of-type
    min-height: calc(100vh - 20px)
</style>
