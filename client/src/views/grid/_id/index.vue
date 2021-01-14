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
import { getRadolanDataByGridId } from "../../../utils/functions/getRadolanDataByGridId";
import { createDatetimeArray } from "../../../utils/functions/createDatetimeArray";

export default defineComponent({
  name: "indexGrid",
  components: {},

  setup() {
    const chart = ref(null);
    const route = useRoute();
    const gridId = route.params.gridId;

    const date = new Date();
    const daysBefore = 14;
    const includeAfter = false;

    const datetimes = createDatetimeArray(date, daysBefore, includeAfter);

    let days = daysBefore;

    if (includeAfter) {
      days = daysBefore * 2;
    }

    onMounted(async () => {
      const APIResultRadolan = await getRadolanDataByGridId(gridId, datetimes);

      const timestampsHourly = datetimes;
      const valuesHourly = APIResultRadolan.Data.values;

      // eslint-disable-next-line
      const timestampsDaily = [] as any;
      // eslint-disable-next-line
      const valuesDaily = [] as any;

      for (let i = 0; i < days; i++) {
        let sum = 0;
        timestampsDaily.push(timestampsHourly[i * 24].split("T")[0]);
        for (let j = 0; j < 24; j++) {
          sum += valuesHourly[i * 24 + j];
        }
        valuesDaily.push(sum);
      }

      // eslint-disable-next-line
      const myChart = new Chart(chart.value!, {
        type: "bar",
        data: {
          labels: timestampsDaily,
          datasets: [
            {
              type: "line",
              data: valuesDaily,
              borderColor: "blue",
              fill: false
            },
            {
              type: "bar",
              data: valuesDaily,
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
