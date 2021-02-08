// INDEX FILE FOR GRID/:ID

<template>
  <div>
    <h1>{{ $route.params.gridId }}</h1>
    <h2>{{ complete }}</h2>
    <my-chart :labels="timestampsDaily" :data="radolanDailyValuesArray" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import MyChart from "../../../components/chart.vue"
import {
  getRadolanDataByGridId
} from "../../../utils/functions/getRadolanDataByGridId";
import {
  createDatetimeArray
} from "../../../utils/functions/helper/createDatetimeArray";
import {
  createStartEndDateString
} from "../../../utils/functions/helper/createStartEndDateString";
import {
  createRadolanHourlyValuesArray
} from "../../../utils/functions/helper/createRadolanHourlyValuesArray";
import {
  createRadolanDailyValuesArray
} from "../../../utils/functions/helper/createRadolanDailyValuesArray";

export default defineComponent({
  name: "indexGrid",
  components: {
    MyChart
  },

  async setup() {
    const route = useRoute();
    const gridId = parseInt(route.params.gridId.toString());

    const radolanDailyValuesArray = ref([]);
    const timestampsDaily = ref([])

    const numberOfDays = 14;
    const { startDateString, endDateString } = createStartEndDateString(numberOfDays)

    const { timestampsHourly } = createDatetimeArray()
    timestampsDaily.value = createDatetimeArray().timestampsDaily
    const APIResultRadolan = await getRadolanDataByGridId(gridId, startDateString, endDateString)
    const radolan = APIResultRadolan.response.data

    const radolanHourlyValuesArray = createRadolanHourlyValuesArray(radolan, timestampsHourly)
    radolanDailyValuesArray.value = createRadolanDailyValuesArray(radolanHourlyValuesArray)

    const complete = ref(radolanDailyValuesArray.value.reduce((a, b) => a + b, 0))

    return { gridId, timestampsDaily, radolanDailyValuesArray, complete };
  }
});
</script>

<style lang="scss" scoped></style>
