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
import {
  createStartEndDateString
} from "../utils/functions/helper/createStartEndDateString";

export default defineComponent({
  name: "Testing",

  setup() {
    onMounted(async () => {
      const numberOfDays = 7;
      const fieldId = "c128bfd3-40ec-480a-b215-d885c439a9f4"
      const { startDateString, endDateString } = createStartEndDateString(numberOfDays)
      const result = await getRadolanDataByFieldId(fieldId, startDateString, endDateString)
      console.log(result)
    })
  }
});


</script>

<style lang="scss" scoped>
</style>
