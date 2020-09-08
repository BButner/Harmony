<template>
  <fa :icon="['fas', 'times-circle']" class="close" @click="handleClick" />
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
  color: var(--text-color-alt)
  transition: color $animation-duration, transform $animation-duration
  font-size: 120%

  &:hover
    cursor: pointer
    transform: scale(1.1)
</style>
