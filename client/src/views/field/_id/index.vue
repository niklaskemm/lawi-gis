// INDEX FILE FOR FIELD/:ID

<template>
  <div>
    <h1>{{ $route.params.fieldId }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "indexField",
  components: {},

  setup() {
    const route = useRoute();
    const gridId = route.params.fieldId;
  }
})
</script>
