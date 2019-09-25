<template lang="pug">
  div.side-panel(v-if="hasContent" :class="{ 'expanded': isExpanded }")
    header.header
        div.back(@click="back") < {{ backbutton }}
        div.expand(v-if="couldBeExpanded" @click="expand") expand
        div.collapse(v-if="isExpanded" @click="collapse") x
    main.main
      //- header.title {{ title }}
      main.content(v-if="!isExpanded" v-html="compiledContent")
      main.content(v-if="isExpanded" v-html="compiledExpandedContent")
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
          this.$router.replace('/region/' + this.currentRegion)
          this.$store.dispatch('CLEAR_CURRENT_PLACE')
          return
        }

        if (this.currentRegion) {
          this.$router.replace('/')
          this.close()
        }
      },
      close() {
        this.$store.dispatch('PANEL_CLOSED')
        this.$store.dispatch('CLEAR_PANEL')
        this.map.invalidateSize()
        this.$emit('close')
      },
      expand() {
        this.$store.dispatch('EXPAND_PANEL')
        this.content
      },
      collapse() {
        this.$store.dispatch('COLLAPSE_PANEL')
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
    compiledContent() {
      return window.marked(this.$store.state.sidepanel.content, { sanitize: true })
    },
    compiledExpandedContent() {
      return window.marked(this.$store.state.sidepanel.expandedContent, { sanitize: true })
    },
    currentPlace() {
      return this.$store.state.current.place
    },
    currentRegion() {
      return this.$store.state.current.region
    },
    couldBeExpanded() {
      console.log(this.$store.state.sidepanel.expandedContent)
      return (this.$store.state.sidepanel.expandedContent !== "") && !this.isExpanded
    },
    hasContent() {
      return this.$store.state.sidepanel.content !== ""
    },
    isExpanded() {
      return this.$store.state.sidepanel.expanded
    }
  }
}
</script>

<style scoped lang="scss">
  .side-panel {
    height: 100%;
    background: white;
    overflow-x: auto;
    flex-basis: 30%;
  }

  .side-panel.expanded {
    flex-basis: 80%;
  }

  .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
  }

  .close,
  .back,
  .expand,
  .collapse {
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
  }

  .content {
    text-align: justify;
    padding: 2% 10%;
  }
</style>
