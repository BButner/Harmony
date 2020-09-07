<template>
  <section class="splash">
    <div class="info">
      <h1 class="motto">
        Playlist Management<br>made easy.
      </h1>
      <p class="motto-secondary">
        <span class="title">Harmony</span> bridges the gap and unifies each music<br>service for easy playlist sharing and collaboration.
      </p>
      <p class="motto-how">
        <IndexButton content="How?" scroll-to="#how" />
      </p>
    </div>
    <div class="playlist-display-wrapper">
      <div class="playlist-services">
        <PlaylistPlaceholder service="spotify" />
        <PlaylistPlaceholder service="youtube" />
        <PlaylistPlaceholder service="apple" />
      </div>
      <div class="icons">
        <fa class="icon-up" :icon="['fas', 'long-arrow-alt-up']" />
        <fa class="icon-down" :icon="['fas', 'long-arrow-alt-down']" />
      </div>
      <PlaylistPlaceholder service="all" />
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '@/assets/css/_settings'
@import '@/assets/css/_colors'

.splash
  display: flex
  justify-content: space-around
  align-items: center

.title
  color: $purple-500

.motto
  font-size: 350%
  padding-bottom: 40px

.motto-secondary
  font-size: 200%

.motto-how
  padding-top: 60px

.playlist-display-wrapper
  margin-left: 40px
  width: 550px

.icons
  height: 75px
  display: flex
  justify-content: center
  align-items: center
  font-size: 225%
  color: var(--text-color-alt)

.icon-up
  animation: pulse-up 2s ease infinite

.icon-down
  animation: pulse-down 2s ease infinite

.playlist-services
  display: flex
  flex-wrap: wrap
  justify-content: space-between

  .wrapper
    margin: auto

  .wrapper:first-of-type
    animation: all-services 5s ease

@keyframes pulse-up
  0%
    transform: translateY(0px)
  50%
    transform: translateY(-8px)
  100%
    transform: translateY(0px)

@keyframes pulse-down
  0%
    transform: translateY(0px)
  50%
    transform: translateY(8px)
  100%
    transform: translateY(0px)

@keyframes bounce
  1.5%
    transform: translateY(0)
  3%
    transform: translateY(-10px)
  4.5%
    transform: translateY(0)
  6%
    transform: translateY(-5px)
  7.5%, 100%
    transform: translateY(0)

@media (max-width: 1000px)
  .splash
    display: block
    font-size: 70%

  .info
    margin-bottom: 40px
    text-align: center

  .playlist-display-wrapper
    margin: 0
    width: auto

  .playlist-services
    justify-content: space-between

    .wrapper
      width: 160px
      margin: 10px auto 0 auto

    .wrapper
      margin: 10px auto 0 auto
</style>
