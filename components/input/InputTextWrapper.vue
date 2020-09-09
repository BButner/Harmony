<template>
  <div class="input-text-wrapper">
    <div class="icon icon-custom">
      <fa :icon="['fas', 'search']" />
    </div>
    <!-- <input ref="input" v-model="inputVModel" type="text"> -->
    <div>
      <slot />
    </div>
    <div class="icon clear" @click="handleClear">
      <fa :icon="['fas', 'times']" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class InputTextWrapper extends Vue {
  @Prop() inputVModel!: string

  @Emit()
  handleClear (): void {
    if (this.$slots.default && this.$slots.default[0]) {
      (this.$slots.default[0].elm as HTMLInputElement).value = ''
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
