<template>
  <transition
    name="blur"
  >
    <div v-if="display" class="blur-wrapper" @click="handleClick" ref="blur">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { popupsStore } from '~/store'

@Component
export default class ScreenBlur extends Vue {
  @Prop() display!: boolean

  @Emit()
  handleClick (event: MouseEvent): void {
    const el: Element | null = document.elementFromPoint(event.x, event.y)

    if (el === this.$refs.blur) {
      popupsStore.closeAllPopups()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_animations'

.blur-wrapper
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  display: flex
  justify-content: center
  align-items: center
  @extend .blur-background
</style>
