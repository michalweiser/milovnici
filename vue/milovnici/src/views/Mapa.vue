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
import { MAP_CONFIG, COUNTRY_ZOOM_BOUNDS, ZOOM_SNAP, ZOOM_CONTROL, PLACE_ZOOM_LEVEL } from '@/const.js'
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
    // addLayersToMap() {
    //   const onRegionSelected = function(e, previous_region, next_region) {
    //       if (previous_region) {
    //           previous_region.places.layer.remove();
    //       }

    //       next_region.places.layer.addTo(map);
    //   }

    //   const selectCurrentRegion = function(e, next_region) {
    //       const previous_region = data.current.region;

    //       const fit = map.fitBounds(next_region.border.layer.getBounds());
    //       fit.on('moveend', (e) => onRegionSelected(e, previous_region, next_region));

    //       data.current.region = next_region;
    //   }

    //   this.country.extrenal_borders.layer.addTo(this.map);
    //   this.country.border.layer.addTo(this.map);
    //   this.regions.forEach(region => {
    //       region.border.layer.addTo(this.map);
    //       region.border.layer.on('click', (e) => selectCurrentRegion(e, region));
    //   });
    // },
    fitCountry() {
      const fit = this.map.mapObject.fitBounds(window.L.latLngBounds(COUNTRY_ZOOM_BOUNDS[0], COUNTRY_ZOOM_BOUNDS[1]));
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

