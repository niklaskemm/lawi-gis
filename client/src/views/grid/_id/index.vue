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

export default defineComponent({
  name: "indexGrid",
  components: {},

  setup() {
    const chart = ref(null);

    onMounted(async () => {
      const route = useRoute();
      const APIResultRadolan = await getRadolanDataByGridId(
        route.params.gridId
      );

      const timestampsHourly = APIResultRadolan.Data.datetimes;
      const valuesHourly = APIResultRadolan.Data.values;
      
      // eslint-disable-next-line
      const timestampsDaily = [] as any;
      // eslint-disable-next-line
      const valuesDaily = [] as any;

      for (let i = 0; i < 14; i++) {
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
