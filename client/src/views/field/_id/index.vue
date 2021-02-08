// INDEX FILE FOR FIELD/:ID

<template>
  <div>
    <h1>{{ $route.params.fieldId }}</h1>
    <h2>{{ complete }}</h2>
    <my-chart :labels="timestampsDaily" :data="radolanDailyValuesArray" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import MyChart from "../../../components/chart.vue"
import {
  getRadolanDataByFieldId
} from "../../../utils/functions/getRadolanDataByFieldId";
import {
  createStartEndDateString
} from "../../../utils/functions/helper/createStartEndDateString";


export default defineComponent({
  name: "indexField",
  components: {
    MyChart
  },

  async setup() {
    const route = useRoute();
    const fieldId = route.params.fieldId.toString();

    const numberOfDays = 14;
    const { startDateString, endDateString } = createStartEndDateString(numberOfDays)

    const response = await getRadolanDataByFieldId(fieldId, startDateString, endDateString)

    const radolanDailyValuesArray = ref(response.radolanDaily)
    const timestampsDaily = ref(response.timestampsDaily)
    const complete = ref(response.complete)

    return { fieldId, timestampsDaily, radolanDailyValuesArray, complete };
  }
});
</script>

<style lang="scss" scoped></style>
