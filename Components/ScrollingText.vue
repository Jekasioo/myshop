<template>
  <div
    class="bg-black text-white py-8 overflow-hidden"
    @mousedown.prevent
    @selectstart.prevent
    @copy.prevent
  >
    <div class="scrolling-container whitespace-nowrap flex">
      <div class="scrolling-text inline-block font-light tracking-widest no-select">
        EVALANE PARIS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EVALANE PARIS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EVALANE PARIS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EVALANE PARIS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EVALANE PARIS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div class="scrolling-text inline-block font-light tracking-widest no-select">
        EVALANE PARIS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EVALANE PARIS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EVALANE PARIS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EVALANE PARIS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EVALANE PARIS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.scrolling-container {
  display: flex;
}

.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.scrolling-text {
  font-size: 1.5rem;
  animation: scroll 30s linear infinite;
}

@media (max-width: 767px) {
  .scrolling-text {
    animation: none !important;
  }
}
</style>
