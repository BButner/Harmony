<template>
  <section id="how" class="how">
    <div class="how-wrapper">
      <div class="info">
        <h1 class="motto">
          Features, Collaboration, and an Intuitive Design.
        </h1>
        <p class="motto-secondary">
          <span class="title">Harmony</span> can be used as a quick tool to transfer playlists, or it can be a platform for communities to collaborate and share their music.
        </p>
        <p class="motto-price">
          <IndexButton content="Pricing?" scroll-to="#price" />
        </p>
      </div>
      <div class="features-wrapper">
        <div class="connect">
          <div class="playlists-share">
            <PlaylistPlaceholder class="share-1" service="pandora" />
            <PlaylistPlaceholder class="share-2" service="spotify" />
            <div class="share-wrapper">
              <fa class="icon-share" :icon="['fas', 'share-square']" />
            </div>
          </div>
          <p>
            Cross-Platform Playlist Sharing
          </p>
        </div>
        <div class="manage">
          <div class="playlists playlists-manage">
            <PlaylistPlaceholder service="youtube" />
            <PlaylistPlaceholder service="apple" />
            <div class="cog-wrapper">
              <fa class="icon-cog" :icon="['fas', 'cog']" />
            </div>
          </div>
          <p>
            Simultaneous Playlist Management
          </p>
        </div>
        <div class="transfer">
          <div class="playlists">
            <PlaylistPlaceholder service="spotify" />
            <div class="transfer-arrows">
              <fa class="icon-up" :icon="['fas', 'long-arrow-alt-up']" />
              <fa class="icon-down" :icon="['fas', 'long-arrow-alt-down']" />
            </div>
            <PlaylistPlaceholder service="youtube" />
          </div>
          <p>
            Transfer between Services
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '@/assets/css/_settings'
@import '@/assets/css/_colors'

.how
  display: flex
  justify-content: space-around
  align-items: center
  flex-wrap: wrap
  text-align: center
  width: 85%
  margin: 0 auto
  margin-top: 200px

.how-wrapper
  display: flex
  justify-content: space-around
  align-items: center

.title
  color: $purple-500

.info
  width: 45%
  text-align: left

.motto
  font-size: 350%
  padding-bottom: 40px

.motto-secondary
  font-size: 200%

.motto-price
  padding-top: 60px

.features-wrapper
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  align-items: center
  width: 45%

  div
    margin: 0 auto

.connect, .manage, .transfer
  text-align: center

  p
    font-size: 150%
    margin: 20px 0 40px 0

.transfer p
  margin-bottom: 0

.playlists-share
  width: 350px
  display: flex
  position: relative

.playlists
  display: flex
  justify-content: center
  align-items: center
  position: relative

.playlists-manage
  div
    margin-left: 0
    margin-right: 0

.cog-wrapper, .share-wrapper
  width: 50px
  height: 50px
  display: flex
  justify-content: center
  align-items: center
  background-color: var(--main-200)
  border-radius: 50%
  position: absolute
  top: calc(50% - 25px)
  left: calc(50% - 25px)
  z-index: 100

.icon-cog
  font-size: 300%
  animation: spin 3s infinite linear

.transfer-arrows
  transform: rotate(90deg)
  color: var(--text-color-alt)
  width: 50px
  height: 50px
  display: flex
  justify-content: center
  align-items: center
  background-color: var(--main-200)
  border-radius: 50%
  position: absolute
  top: calc(50% - 25px)
  left: calc(50% - 25px)
  z-index: 100
  font-size: 150%

.icon-up
  animation: pulse-up 2s ease infinite

.icon-down
  animation: pulse-down 2s ease infinite

.icon-share
  font-size: 200%

.share-1
  animation: share-slide-right 10s infinite ease

.share-2
  animation: share-slide-left 10s infinite ease

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

@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

@keyframes share-slide-right
  0%
    transform: translateX(0%)
  5%
    transform: translateX(100%)
  10%, 100%
    transform: translateX(0%)

@keyframes share-slide-left
  0%
    transform: translateX(0%)
  5%
    transform: translateX(-100%)
  10%, 100%
    transform: translateX(0%)

@media (max-width: 1000px)
  .how
    font-size: 75%

  .how-wrapper
    display: block

  .features-wrapper
    margin-top: 40px
    margin: 40px auto 0 auto
    width: 100%

  .info
    text-align: center
    margin-top: 40px
    width: 100%

@media (max-width: 1920px)
  .how
    width: 100%
</style>
