// INDEX FILE FOR USER/:ID

<template>
  <div>
    <h1>Fields of user {{ userId }}</h1>
    <fields-map :centerLon="centerLon" :centerLat="centerLat" :zoom="zoom" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import FieldsMap from "@/components/FieldsMap.vue";

export default defineComponent({
  name: "indexUser",
  components: {
    FieldsMap
  },

  setup() {
    const route = useRoute();
    const userId = route.params.userId
    const centerLon = 10;
    const centerLat = 54.4;
    const zoom = 8;

    return {
      userId,
      centerLon,
      centerLat,
      zoom
    }
  }
})
</script>
