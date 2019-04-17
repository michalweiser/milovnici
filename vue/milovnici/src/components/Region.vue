<template lang="pug">
  div
    l-geo-json(:geojson="border.geoJSON" ref="region" @click="select")
    places(v-if="selected" :id="id")
</template>

<script>
import Places from '@/components/Places'

export default {
  name: 'region',
  props: {
    id: String
  },
  created: async function() {
    await this.$store.dispatch('LOAD_REGION_BORDER', { id: this.id })
  },
  methods: {
    select() {
      this.$store.dispatch('SET_CURRENT_REGION', { id: this.id })
      this.$store.dispatch('SET_PANEL', { title: this.id, content: "", backbutton: "mapa"})

      this.$emit('select', {
        id: this.id,
        bounds: this.bounds
      })
    }
  },
  computed: {
    selected() {
      return this.$store.state.current.region === this.id
    },
    bounds() {
      return this.$refs.region.getBounds()
    },
    border() {
      return this.$store.getters.region(this.id).border
    }
  },
  components: {
    Places
  }
}
</script>

<style scoped lang="scss">

</style>
