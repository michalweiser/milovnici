<template >
  <div class="stripes">
    <transition name="slide-1">
      <div v-show="animation" class="stripe stripe--1"></div>
    </transition>
    <transition name="slide-2">
      <div v-show="animation" class="stripe stripe--2"></div>
    </transition>
    <transition name="slide-3">
      <div v-show="animation" class="stripe stripe--3"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animation: false
    };
  },
  props: {
    state: Boolean
  },
  watch: {
    state: function() {
      if (this.state) {
        this.animation = true;
      } else {
        setTimeout(() => {
          this.stop();
        }, 300);
      }
    }
  },
  methods: {
    stop() {
      // console.log("stop");
      this.animation = false;
      this.$emit("input", false);
    }
  }
};
</script>

<style lang="scss">
.stripes {
  width: 100%;
  height: 100%;
  top: 0px;
  bottom: 0px;
  z-index: 9999;
  display: block;
  position: absolute;
  pointer-events: none;
}
.stripe {
  pointer-events: all;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  transform: translateY(0%);
  &--1 {
    background-color: blueviolet;
  }
  &--2 {
    background-color: yellowgreen;
  }
  &--3 {
    background-color: orangered;
  }
}

@keyframes moving-in {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes moving-out {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}

.slide-1-enter-active {
  animation: moving-in 0.4s linear 0s;
}
.slide-1-leave-active {
  animation: moving-out 0.6s linear 0s;
}
.slide-2-enter-active {
  animation: moving-in 0.6s linear 0s;
}
.slide-2-leave-active {
  animation: moving-out 0.4s linear 0s;
}
.slide-3-enter-active {
  animation: moving-in 0.7s linear 0s;
}
.slide-3-leave-active {
  animation: moving-out 0.3s linear 0s;
}
</style>