<template lang="pug">
  div
    l-geo-json(:geojson="border.geoJSON" :optionsStyle="style" ref="region" @click="select")
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
    //TODO: remove async lifecycle hooks!
    // {
    //   created: function(){
    //     this.waitData = asyncCall();
    //   },
    //   mounted: function(){
    //     this.waitData.then(function(data) { ... })
    //   }
    // }
    await this.$store.dispatch('LOAD_REGION_BORDER', { id: this.id })
    if (this.content) {
      await this.$store.dispatch('LOAD_REGION_CONTENT', { id: this.id })
    }
  },
  methods: {
    select() {
      const content = (this.content && this.content.data) ? this.content.data : ""
      this.$store.dispatch('SET_CURRENT_REGION', { id: this.id })
      this.$store.dispatch('SET_PANEL', { title: this.name, content, backbutton: "mapa"})
      this.$router.replace('/region/' + this.id)

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
    },
    content() {
      return this.$store.getters.region(this.id).content
    },
    name() {
      return this.$store.getters.region(this.id).name
    },
    style() {
      return {
        weight: 0,
        color: 'red',
        cursor: 'pointer'
      }
    }
  },
  components: {
    Places
  }
}
</script>

<style scoped lang="scss">

</style>
