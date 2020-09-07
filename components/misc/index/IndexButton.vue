<template>
  <a v-scroll-to="{ el: scrollTo, container: '#page-content', duration: 750 }" href="#how">
    <button class="index-button">
      {{ content }}
    </button>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexButton extends Vue {
  @Prop() content!: string
  @Prop() scrollTo!: string
}
</script>

<style lang="sass" scoped>
a
  text-decoration: none

  &:visited, &:visited:active, &:link, &:link:active
    color: white

.index-button
  font-size: 150%
  padding: 10px 50px 10px 50px
  animation: bounce 10s linear infinite
  width: 250px
  height: 50px
  box-shadow: 0 8px 20px 0 hsla(245, 92%, 60%, 0.35)
</style>
