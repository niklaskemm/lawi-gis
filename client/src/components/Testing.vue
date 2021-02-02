<template>
  <div>
    <h1> Hi World! </h1>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue';
import {
  getRadolanDataByFieldId
} from "../utils/functions/getRadolanDataByFieldId";

export default defineComponent({
  name: "Testing",

  setup() {
    onMounted(async () => {
      const fieldId = "94601639-7055-4bcc-abfe-90b8c1dc6cf9"
      const startDate = ""
      const endDate = ""
      const result = await getRadolanDataByFieldId(fieldId, startDate, endDate)
    })
  }
});


</script>

<style lang="scss" scoped>
</style>
