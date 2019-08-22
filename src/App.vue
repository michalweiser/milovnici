<template lang="pug">
  div#app
    Loader(:state="loading")(@input="state => { loading = state }")
    div#nav
      div.logo
        router-link(to="/")
          img(src="/img/logo_small.png")
      div.links
        router-link(to="/") Mapa
        span.spacer  | 
        router-link(to="/blog") Blog
        span.spacer  | 
        router-link(to="/tanecne-domy") Tanečné domy
        span.spacer  | 
        router-link(to="/milovnici") Milovníci
        span.spacer  | 
        router-link(to="/projekt") O projekte
        span.spacer  | 
        router-link(to="/kontakt") Kontakt
      div.fpu
        img.fpu-logo(src="/img/fpu.jpg")
    transition(name="page")(v-on:before-enter="beforeEnter")(v-on:after-enter="afterEnter")
      router-view
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  data() {
    return {
      loading: false
    };
  },
  components: {
    Loader
  },
  methods: {
    beforeEnter: function() {
      // console.log("start");
      this.loading = true;
    },
    afterEnter: function() {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.links {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.logo {
  position: absolute;
}

.spacer {
  cursor: default;
  margin: 0 10px;
}

.fpu-logo {
  width: 130px;
}

.page-enter-active {
  transition: all 0.5s linear;
}
.page-leave-active {
  transition: all 0.5s linear;
}
.page-enter{
  transform: translateY(10%);
  opacity: 0;
}
.page-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}
</style>
