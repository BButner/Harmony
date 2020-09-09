<template>
  <div class="input-text-wrapper">
    <div class="icon icon-custom">
      <fa :icon="icon" />
    </div>
    <slot />
    <div class="icon clear" @click="handleClear">
      <fa :icon="['fas', 'times']" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class InputTextWrapper extends Vue {
  @Prop() icon!: string[]
  @Prop() modelName!: string

  @Emit()
  handleClear (): void {
    const slots = this.$slots.default
    if (slots && slots[0] && slots[0].context) {
      slots[0].context.$data[this.modelName] = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.input-text-wrapper
  display: flex
  justify-content: center

.icon
  display: flex
  justify-content: center
  align-items: center
  min-height: 100%
  padding: 0 6px 0 6px
  background-color: var(--main-400)

.icon-custom
 border-radius: 6px 0 0 6px

.clear
  border-radius: 0 6px 6px 0

  &:hover
    cursor: pointer
    background-color: var(--main-500)

input[type="text"]
  border-radius: 0
</style>
