<template lang="pug">
  div.side-panel
    header.header
        div.back(@click="back") < {{ backbutton }}
    main.main
      header.title {{ title }}
</template>

<script>
export default {
  name: 'side-panel',
  props: {
    map: Object
  },
  methods: {
      back() {
        if (this.currentPlace) {
          this.$store.dispatch('CLEAR_CURRENT_PLACE')
          return
        }

        if (this.currentRegion) {
          this.close()
        }
      },
      close() {
        this.$store.dispatch('PANEL_CLOSED')
        this.$store.dispatch('CLEAR_PANEL')
        this.map.invalidateSize()
        this.$emit('close')
      }
  },
  mounted: function () {
    this.map.invalidateSize()
  },
  computed: {
    title() {
      return this.$store.state.sidepanel.title
    },
    backbutton() {
      return this.$store.state.sidepanel.backbutton
    },
    currentPlace() {
      return this.$store.state.current.place
    },
    currentRegion() {
      return this.$store.state.current.region
    }
  }
}
</script>

<style scoped lang="scss">
  .side-panel {
    width: 40%;
    height: 100%;
    background: white;
  }

  .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
  }

  .close,
  .back {
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
  }
</style>
