import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const region_postproc = {
  style: function (feature) {
      return { color: feature.properties.fill };
  }
}

const loadGeoJsonLayer = async function(item, postprocess) {
  return {
    fetchURL: item.fetchURL,
    geoJSON: await fetch(item.fetchURL).then(res => res.json()),
    layer: (postprocess) ? await window.L.geoJSON(item.geoJSON, postprocess) : await window.L.geoJSON(item.geoJSON)
  }
}

export default new Vuex.Store({
  state: {
    "current": {
      "region": null,
      "place": null
    },
    "sidepanel": {
      title: "",
      backbutton: "",
      content: "",
      expandedContent: "",
      expanded: false
    },
    "country": {
        "border": {
            "fetchURL": "/data/geojson/slovakia_esri_epsg_4326.geojson",
            "geoJSON": null,
            "layer": null
        },
        "extrenal_borders": {
            "fetchURL": "/data/geojson/external_borders.geojson",
            "geoJSON": null,
            "layer": null
        }
    },
    "regions": [{
      "id": "zemplin",
      "name": "Zemplín",
      "border": {
          "fetchURL": "/data/geojson/zemplin-region.geojson",
          "geoJSON": null,
          "layer": null
      },
      "places": {
          "fetchURL": "/data/geojson/zemplin-miesta-base.geojson",
          "geoJSON": null,
          "layer": null
      },
      "content": {
        "short": {
          "fetchURL": "/data/md/regions/zemplin/short.md",
          "data": ""
        },
        "long": {
          "fetchURL": "/data/md/regions/zemplin/long.md",
          "data": ""
        }
      }
  }]
  },
  mutations: {
    SET_CURRENT_REGION(store, { id }) {
      store.current.region = id
    },
    SET_CURRENT_PLACE(store, { place }) {
      store.current.place = place
    },
    CLEAR_CURRENT_PLACE(store) {
      store.current.place = null
    },
    SET_REGION_BORDER_DATA( store, { id, data } ) {
      store.regions.find(region => region.id === id).border = data
    },
    SET_REGION_PLACES_DATA( store, { id, data } ) {
      store.regions.find(region => region.id === id).places = data
    },
    SET_REGION_SHORT_CONTENT ( store, { id, data } ) {
      store.regions.find(region => region.id === id).content.short.data = data
    },
    SET_REGION_LONG_CONTENT ( store, { id, data } ) {
      store.regions.find(region => region.id === id).content.long.data = data
    },
    SET_COUNTY_BORDER_DATA( store, data ) {
      store.country.border = data
    },
    SET_COUNTY_EXTERNAL_BORDER_DATA( store, data ) {
      store.country.extrenal_borders = data
    },
    PANEL_CLOSED(store) {
      store.current.region = null
    },
    SET_EXPAND_PANEL(store, { expanded }) {
      store.sidepanel.expanded = expanded
    },
    SET_PANEL_TITLE(store, { title }) {
      store.sidepanel.title = title
    },
    SET_PANEL_BACKBUTTON(store, { text }) {
      store.sidepanel.backbutton = text
    },
    SET_PANEL_CONTENT(store, { content }) {
      store.sidepanel.content = content
    },
    SET_PANEL_EXPANDED_CONTENT(store, { expandedContent }) {
      store.sidepanel.expandedContent = expandedContent
    }
  },
  actions: {
    SET_CURRENT_REGION ({commit}, { id }) {
      commit('SET_CURRENT_REGION', { id })
    },
    async LOAD_REGION_PLACES ({ getters, commit }, { id }) {
      const region = getters.region(id)
      const places = await loadGeoJsonLayer(region.places)

      commit('SET_REGION_PLACES_DATA', { id, data: places })
    },
    async LOAD_REGION_BORDER ({ getters, commit }, { id }) {
      const region = getters.region(id)
      const border = await loadGeoJsonLayer(region.border, region_postproc)

      commit('SET_REGION_BORDER_DATA', { id, data: border })
    },
    async LOAD_REGION_CONTENT ({ getters, dispatch }, { id }) {
      const region = getters.region(id)
      
      dispatch('LOAD_REGION_SHORT_CONTENT', { id, region })
      dispatch('LOAD_REGION_LONG_CONTENT', { id, region })
    },
    async LOAD_REGION_SHORT_CONTENT ({ commit }, { id, region }) {
      const content = await fetch(region.content.short.fetchURL).then(function(res) {
        return res.text()
      })

      commit('SET_REGION_SHORT_CONTENT', { id, data: content })
    },
    async LOAD_REGION_LONG_CONTENT ({ commit }, { id, region }) {
      const content = await fetch(region.content.long.fetchURL).then(function(res) {
        return res.text()
      })

      commit('SET_REGION_LONG_CONTENT', { id, data: content })
    },
    async LOAD_REGION_MAP_LAYERS ({ state, commit }, { id }) {
      const region = state.regions.find(region => region.id === id)
      const border = await loadGeoJsonLayer(region.border, region_postproc)
      const places = await loadGeoJsonLayer(region.places)

      commit('SET_REGION_BORDER_DATA', { id, data: border })
      commit('SET_REGION_PLACES_DATA', { id, data: places })
    },
    async LOAD_REGIONS_MAP_LAYERS ({ state, dispatch }) {
      const regions = state.regions.map(async region => await dispatch('LOAD_REGION_MAP_LAYERS', { id: region.id }))
      await Promise.all(regions)
    },
    async LOAD_COUNTRY_BORDER ({ state, commit }) {
      const boreder = await loadGeoJsonLayer(state.country.border)
      commit('SET_COUNTY_BORDER_DATA', boreder)
    },
    async LOAD_COUNTRY_EXTERNAL_BORDER ({ state, commit }) {
      const external_borders = await loadGeoJsonLayer(state.country.extrenal_borders)
      commit('SET_COUNTY_EXTERNAL_BORDER_DATA', external_borders)
    },
    //{ state, getters, commit, dispatch }
    async LOAD_COUNTRY_MAP_LAYER ({ dispatch }) {
      await dispatch('LOAD_COUNTRY_BORDER')
      await dispatch('LOAD_COUNTRY_EXTERNAL_BORDER')
    },
    async LOAD_INITIAL_MAP_DATA ({ dispatch }) {
      await Promise.all([
        dispatch('LOAD_COUNTRY_MAP_LAYER'),
        dispatch('LOAD_REGIONS_MAP_LAYERS')
      ])
    },
    PANEL_CLOSED ({ commit }) {
      commit('PANEL_CLOSED')
    },
    SET_PANEL({ commit }, { title, content, expandedContent, backbutton }) {
      commit('SET_PANEL_TITLE', { title })
      commit('SET_PANEL_CONTENT', { content })
      commit('SET_PANEL_EXPANDED_CONTENT', { expandedContent })
      commit('SET_PANEL_BACKBUTTON', { text: backbutton })
    },
    CLEAR_PANEL({ commit }) {
      commit('SET_PANEL_TITLE', { title: "" })
      commit('SET_PANEL_CONTENT', { content: "" })
      commit('SET_PANEL_BACKBUTTON', { text: "" })
      commit('SET_EXPAND_PANEL', { expanded: false })
    },
    EXPAND_PANEL({ commit }) {
      commit('SET_EXPAND_PANEL', { expanded: true })
    },
    COLLAPSE_PANEL({ commit }) {
      commit('SET_EXPAND_PANEL', { expanded: false })
    },
    SET_CURRENT_PLACE({ commit }, { place }) {
      commit('SET_CURRENT_PLACE', { place })
    },
    CLEAR_CURRENT_PLACE({ commit }) {
      commit('CLEAR_CURRENT_PLACE')
    }
  },
  getters: {
    region: (state) => (id) => {
      return state.regions.find(region => region.id === id)
    },
    currentRegionName: (state, getters) => {
      if (state.current.region) {
        return getters.region(state.current.region).name
      } else {
        return ""
      }
    }
  }
})
