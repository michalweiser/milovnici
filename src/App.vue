<template lang="pug">
  div#app
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
    router-view
</template>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
</style>
