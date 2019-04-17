<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Mapa</router-link> |
      <router-link to="/blog">Blog</router-link> |
      <router-link to="/tanecne-domy">Tanecne domy</router-link> |
      <router-link to="/milovnici">Milovnici</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
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
</style>
