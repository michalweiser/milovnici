<template lang="pug">
  div.side-panel(:class="detail ? 'full':''")
    header.header
        div.back
          p(@click="back")  < {{ backbutton }}
          p(@click="detail = !detail")
            span(v-if="detail") skrýt detail
            span(v-else) detail
    main.main
      //- header.title {{ title }}
      main.content(v-html="compiledMarkdown")
</template>

<script>
export default {
  name: "side-panel",
  props: {
    map: Object
  },
  data() {
    return {
      detail: false
    };
  },
  methods: {
    back() {
      if (this.currentPlace) {
        this.$router.replace("/region/" + this.currentRegion);
        this.$store.dispatch("CLEAR_CURRENT_PLACE");
        return;
      }

      if (this.currentRegion) {
        this.$router.replace("/");
        this.close();
      }
    },
    close() {
      this.$store.dispatch("PANEL_CLOSED");
      this.$store.dispatch("CLEAR_PANEL");
      this.map.invalidateSize();
      this.$emit("close");
    }
  },
  mounted: function() {
    this.map.invalidateSize();
  },
  computed: {
    title() {
      return this.$store.state.sidepanel.title;
    },
    backbutton() {
      return this.$store.state.sidepanel.backbutton;
    },
    content() {
      return this.$store.state.sidepanel.content;
    },
    currentPlace() {
      return this.$store.state.current.place;
    },
    currentRegion() {
      return this.$store.state.current.region;
    },
    compiledMarkdown: function() {
      return window.marked(this.content, { sanitize: true });
    }
  }
};
</script>

<style scoped lang="scss">
.side-panel {
  width: 50%;
  height: 100%;
  background: white;
  overflow-x: auto;
  transition: width 0.25s ease-out;
  &.full {
    width: 100%;
  }
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.close,
.back {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.content {
  text-align: justify;
  padding: 2% 10%;
}
</style>
