<template>
  <section id="price" class="price">
    <div class="info">
      <h1 class="motto">
        No Pay-walls, and No Subscriptions!
      </h1>
      <p class="motto-secondary">
        <span class="title">Harmony</span> has zero monetization aspects, as we don't want to lock anything away from our users.
      </p>
      <p class="motto-price">
        <IndexButton content="Get Started!" />
      </p>
    </div>
    <div class="icon-wrapper">
      <fa class="icon-dollar" :icon="['fas', 'dollar-sign']" />
      <fa class="icon-slash" :icon="['fas', 'slash']" />
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '@/assets/css/_colors'
.price
  display: flex
  justify-content: space-around
  flex-wrap: wrap
  align-items: center
  margin-top: 200px

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

.icon-wrapper
  position: relative
  font-size: 1000%
  width: 300px
  height: 200px

  svg
    position: absolute

.icon-dollar
  top: 0
  left: 0
  width: 300px
  color: $teal-600

.icon-slash
  top: 0
  left: 0
  width: 20px
  width: 300px
  color: $red-500
  animation: pulse 4s linear infinite

@keyframes pulse
  0%
    transform: scale(0.8)
  50%
    transform: scale(0.7)
  100%
    transform: scale(0.8)

@media (max-width: 1000px)
  .price
    font-size: 75%
    width: 100%
    text-align: center

  .info
    width: 100%
    text-align: center
</style>
