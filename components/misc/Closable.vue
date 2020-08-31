<template>
  <fa :icon="['fas', 'times']" class="close" @click="handleClick" />
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator'

@Component
export default class SidebarUserCard extends Vue {
  @Prop(String) readonly namespace!: string
  @Prop(String) readonly commit!: string

  @Emit()
  handleClick (): void {
    this.$store.commit(`${this.namespace}/${this.commit}`, false)
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_globals'
@import '@/assets/css/_colors'

.close
  position: absolute
  top: 6px
  right: 6px
  color: $red-500;
  transition: color $animation-duration
  text-size: 125%;

  &:hover
    cursor: pointer
    color: $red-700
</style>
