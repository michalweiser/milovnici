<template>
  <main class="content" :class="{'with-sidepanel': isSidePanelOpen, 'sidepanel-expanded': isSidePanelExpanded}">
    <l-map class="map" ref="map" @update:bounds="boundsUpdated" :center="center" :zoom="zoom" :fadeAnimation="fadeAnimation" :zoomAnimation="zoomAnimation" :maxBounds="maxBounds" :maxZoom="maxZoom" :minZoom="minZoom" :options="options">
      <div>
        <!-- <l-geo-json :geojson="country.extrenal_borders.geoJSON" :options-style="styleFunction" @ready="bordersReady"></l-geo-json> -->
        <l-geo-json :geojson="country.border.geoJSON" :options-style="countryStyleFunction"></l-geo-json>
        <!-- <l-tile-layer :url="url"></l-tile-layer> -->
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
  props: {
    region_id: String
  },
  created: async function() {
    await this.loadContryMap()
    this.loaded = true
    window.L_PREFER_CANVAS = true // ? TODO: needed?
    if (this.map && this.map.mapObject) {
      window.M = this.map.mapObject
    }
  },
  mounted: function() {
    if (this.region_id) {
      //HERE CALL SELECT ... REFs not awailable?!
    }
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
    isSidePanelOpen() {
      return this.$store.state.sidepanel.content !== ""
    },
    isSidePanelExpanded() {
      return this.$store.state.sidepanel.expanded
    },
    currentPlace() {
      return this.$store.state.current.place
    },
    currentRegion() {
      return this.$store.state.current.region
    },
    styleFunction() {
      return () => {
        return {
          weight: 0,
          color: "#FFFFFF",
          opacity: 1,
          fillColor: "#FFFFFF",
          fillOpacity: 1
        }
      }
    },
    countryStyleFunction() {
      return () => {
        return {
          weight: 0,
          color: "green"
        }
      }
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
    bordersReady() {
      this.bordersready = true;
    },
    fitCountry() {
      this.flyTo(this.countryBounds);
    },
    boundsUpdated() {
      this.map.mapObject.invalidateSize()
    },
    regionSelected(data) {
      this.flyTo(data.bounds)
    },
    flyTo(bounds) {
      this.map.mapObject.flyToBounds(bounds)
    }
  },
  data() {
    return {
      url: 'https://api.mapbox.com/styles/v1/milovnici-sk/cju5pct5b0yj31fo3qmkh6f6x/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWlsb3ZuaWNpLXNrIiwiYSI6ImNqdTVseGdvODBsb200ZW81Ym56anRwYzcifQ.YzSDUOwEaw9pCAZyXcbmvw',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      ...MAP_CONFIG,
      loaded: false,
      bordersready: false
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

  .content .map {
    flex-basis: 100%;
  }

  .content.with-sidepanel .map {
    flex-basis: 70%;
  }

  .content.with-sidepanel.sidepanel-expanded .map {
    flex-basis: 20%;
  }

  .leaflet-container {
    background: white;
  }
</style>

