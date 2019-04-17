<template lang="pug">
    l-geo-json(:geojson="places.geoJSON" :options="options" ref="places")
</template>

<script>
import { debuggerStatement } from 'babel-types';
export default {
  name: 'places',
  props: {
    id: String
  },
  created: async function() {
    await this.$store.dispatch('LOAD_REGION_PLACES', { id: this.id })
  },
  methods: {
    select(feature, layer) {
      const place = {
        feature,
        layer,
        latLng: layer.getLatLng()
      }

      this.$store.dispatch('SET_CURRENT_PLACE', { place })
      this.$store.dispatch('SET_PANEL', { title: feature.properties.name, content: "", backbutton: this.currentRegionName})
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
            style: function style(feature) {
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
