// INDEX FILE FOR GRID/:ID

<template>
  <div>
    <h1>{{ $route.params.gridId }}</h1>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Chart } from "chart.js";
import { useRoute } from "vue-router";
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
  components: {},

  setup() {
    const chart = ref(null);
    const route = useRoute();
    const gridId = parseInt(route.params.gridId.toString());

    const numberOfDays = 14;
    const { startDateString, endDateString } = createStartEndDateString(numberOfDays)


    onMounted(async () => {
      const APIResultRadolan = await getRadolanDataByGridId(gridId, startDateString, endDateString);
      const radolan = APIResultRadolan.response.data

      const { timestampsHourly, timestampsDaily } = createDatetimeArray()

      const radolanHourlyValuesArray = createRadolanHourlyValuesArray(radolan, timestampsHourly)
      const radolanDailyValuesArray = createRadolanDailyValuesArray(radolanHourlyValuesArray)

      // eslint-disable-next-line
      const myChart = new Chart(chart.value!, {
        type: "bar",
        data: {
          labels: timestampsDaily,
          datasets: [
            {
              type: "line",
              data: radolanDailyValuesArray,
              borderColor: "blue",
              fill: false
            },
            {
              type: "bar",
              data: radolanDailyValuesArray,
              backgroundColor: "lightblue"
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Niederschlag in mm"
          },
          legend: { display: false }
        }
      });
    });

    return { chart };
  }
});
</script>

<style lang="scss" scoped></style>
