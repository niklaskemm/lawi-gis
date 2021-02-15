// INDEX FILE FOR USER/:ID

<template>
  <div>
    <h1>{{ userId }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "indexUser",
  components: {},

  setup() {
    const route = useRoute();
    const userId = ref(route.params.userId);

    return { userId }
  }
})
</script>
