<template>
  <main class="content">
    <l-map ref="map" @update:bounds="boundsUpdated" :center="center" :zoom="zoom" :fadeAnimation="fadeAnimation" :zoomAnimation="zoomAnimation" :maxBounds="maxBounds" :maxZoom="maxZoom" :minZoom="minZoom" :options="options">
      <div>
        <l-geo-json :geojson="country.extrenal_borders.geoJSON"></l-geo-json>
        <l-geo-json :geojson="country.border.geoJSON"></l-geo-json>
        <l-tile-layer :url="url"></l-tile-layer>
      </div>
      <div v-if="loaded">
        <region v-for="region in regions" :ref="'region_' + region.id" :key="region.id" :id="region.id" @select="regionSelected"/>
      </div>
    </l-map>
    <side-panel v-if="regionIsSelected" :map="map.mapObject" @close="fitCountry"/>
  </main>
</template>

<script>
import { MAP_CONFIG, COUNTRY_ZOOM_BOUNDS, PLACE_ZOOM_LEVEL } from '@/const.js'
import { mapActions } from 'vuex'
import Region from '@/components/Region'
import SidePanel from '@/components/SidePanel'

export default {
  name: 'countrymap',
  created: async function() {
    await this.loadContryMap()
    this.loaded = true
    window.M = this.map.mapObject
  },
  computed: {
    countryBounds() {
      return window.L.latLngBounds(COUNTRY_ZOOM_BOUNDS[0], COUNTRY_ZOOM_BOUNDS[1])
    },
    regionIsSelected() {
      return this.$store.state.current.region !== null
    },
    places() {
      return this.$store.state.regions[this.id].places
    },
    country() {
      return this.$store.state.country
    },
    regions() {
      return this.$store.state.regions
    },
    map() {
      return this.$refs.map
    },
    currentPlace() {
      return this.$store.state.current.place
    },
    currentRegion() {
      return this.$store.state.current.region
    }
  },
  watch: {
    currentPlace: function (currentPlace) {
      if (currentPlace) {
        this.map.mapObject.flyTo(currentPlace.latLng, PLACE_ZOOM_LEVEL)
      } else {
        this.$refs['region_' + this.currentRegion][0].select() //TODO: wtf? returns array
      }
    }
  },
  methods: {
    ...mapActions({
      loadContryMap: 'LOAD_COUNTRY_MAP_LAYER'
    }),
    fitCountry() {
      this.map.mapObject.fitBounds(this.countryBounds);
    },
    boundsUpdated() {
      this.map.mapObject.invalidateSize()
    },
    regionSelected(data) {
      this.boundaries = data.bounds
      this.$refs.map.fitBounds(data.bounds)
    }
  },
  data() {
    return {
      url: 'http://c.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      ...MAP_CONFIG,
      loaded: false
    }
  },
  components: {
    Region,
    SidePanel
  }
}
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
</style>

