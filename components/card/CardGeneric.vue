<template>
  <div :class="'card-wrapper soft-shadow' + (animated ? ' card-animated' : '')">
    <Closable v-if="closable" :namespace="namespace" :commit="commit" />
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class SidebarUserCard extends Vue {
  @Prop(Boolean) readonly animated!: boolean
  @Prop(Boolean) readonly closable: boolean | undefined
  @Prop(String) readonly namespace: string | undefined
  @Prop(String) readonly commit: string | undefined
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_animations'
@import '@/assets/css/_globals'

.card-wrapper
  background-color: var(--main-200)
  padding: 20px
  border-radius: 10px

.card-animated
  animation: fade-slide-up $animation-duration 1
</style>
