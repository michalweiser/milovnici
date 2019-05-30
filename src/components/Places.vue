<template lang="pug">
    l-geo-json(:geojson="places.geoJSON" :options="options" ref="places")
</template>

<script>
export default {
  name: 'places',
  props: {
    id: String
  },
  created: async function() {
    await this.$store.dispatch('LOAD_REGION_PLACES', { id: this.id })
  },
  methods: {
    async getContent(contentUrl) {
      const content = await fetch(contentUrl).then(res => res.text())
      console.log(content)
      return content
    },
    async select(feature, layer) {
      let content = '';
      
      const place = {
        feature,
        layer,
        latLng: layer.getLatLng()
      }

      if (feature.properties.content) {
        content = await this.getContent(feature.properties.content)
      }
      
      this.$store.dispatch('SET_CURRENT_PLACE', { place })
      this.$store.dispatch('SET_PANEL', { title: feature.properties.name, content: content, backbutton: this.currentRegionName})
      this.$emit('select', place)
    }
  },
  computed: {
    selected() {
      return this.$store.state.current.place === this.id
    },
    places() {
      return this.$store.getters.region(this.id).places
    },
    currentRegionName() {
      return this.$store.getters.currentRegionName
    },
    options() {
        return {
            style: function style() {
                return {
                    weight: 4,
                    opacity: 0.7,
                    color: '#666',
                    fillOpacity: 0.3
                };
            },
            onEachFeature: (feature, layer) => {
                layer.on('click', () => this.select(feature, layer) )
                //layer.bindTooltip('Some description')
                // layer.bindPopup('<h1>'+feature.properties.name+'</h1>');
            }
        }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
