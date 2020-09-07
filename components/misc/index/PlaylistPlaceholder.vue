<template>
  <div
    :class="'wrapper soft-shadow ' + service"
  >
    <div class="header">
      <fa :icon="['fas', 'music']" />
    </div>
    <div class="content">
      <transition-group name="slide-left">
        <div v-for="(row, index) in rows" :key="row + '' + index" :style="row" class="row" />
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class PlaylistPlaceholder extends Vue {
  @Prop() service!: string
  playlistRows: any[] = []

  @Emit()
  populateRows (): void {
    this.playlistRows = []
    for (let x = 0; x < 7; x++) {
      this.playlistRows.push({ width: Math.floor(Math.random() * 90) + 10 + '%' })
    }

    setTimeout((): void => this.updateRows(), 10000)
  }

  @Emit()
  updateRows (): void {
    for (let x = 0; x < this.playlistRows.length; x++) {
      this.playlistRows[x].width = Math.floor(Math.random() * 90) + 10 + '%'
    }

    setTimeout((): void => this.updateRows(), 10000)
  }

  get rows () {
    return this.playlistRows
  }

  mounted () {
    this.populateRows()
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_colors'
@import '@/assets/css/_settings'

.wrapper
  width: 175px
  background-color: var(--main-200)
  border-radius: 7px
  transition: background-color $animation-duration ease, transform $animation-duration ease

  &:hover
    transform: scale(1.2)
    z-index: 10

.spotify
  .header
    background-color: $spotify-100

.youtube
  .header
    background-color: $youtube-100

.apple
  .header
    background-color: $apple-100

.pandora
  .header
    background-color: $pandora-100

.header
  height: 20px
  width: 100%
  border-radius: 7px 7px 0 0
  display: flex
  justify-content: center
  align-items: center
  font-size: 90%
  color: white

  svg
    margin-left: 5px

.content
  display: grid
  grid-grid-template-rows: repeat(10, 9)
  padding: 4px

.row
  height: 8px
  background-color: var(--text-color-alt-opposite)
  border-radius: 7px
  transition: all $animation-duration ease, width 1s ease

  &:not(:last-of-type)
    margin-bottom: 4px

.all
  margin: 0 auto
  width: 263px

  .header
    background-color: $purple-300
    height: 30px
    font-size: 100%

  .content
    padding: 6px

  .row
    height: 12px
</style>
