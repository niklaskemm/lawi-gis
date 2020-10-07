<template>
  <div>
    <h1>This is the testing page.</h1>
    <div class="map-container"><OLMap /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OLMap from "@/components/OLMap.vue";

export default defineComponent({
  name: "Testing",
  components: {
    OLMap,
  },
});
</script>

<style lang="scss" scoped>
.map-container {
  position: absolute;
  left: 0;
  height: 50vh;
  width: 100vw;
}
</style>
