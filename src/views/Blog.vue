<template lang="pug">
  div.wrapper
    h1 Blog
    div.content
      p Pripravuje sa!
</template>


<script>
export default {
  name: 'milovnici',
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
  }

  .content {
    max-width: 800px;
    text-align: justify;
    padding-bottom: 60px;
  }
</style>

