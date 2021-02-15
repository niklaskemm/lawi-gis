<template>
  <canvas ref="chart"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Chart } from "chart.js";

export default defineComponent({
  name: "MyChart",
  props: {
    labels: {
      type: Array as any,
      required: true
    },
    data: {
      type: Array as any,
      required: true
    }
  },

  setup(props) {
    const chart = ref(null)

    onMounted(() => {
      const myChart = new Chart(chart.value!, {
        type: "bar",
        data: {
          labels: props.labels,
          datasets: [
            {
              type: "line",
              data: props.data,
              borderColor: "blue",
              fill: false
            },
            {
              type: "bar",
              data: props.data,
              backgroundColor: "lightblue"
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Niederschlag in mm"
          },
          legend: { display: false },
          maintainAspectRatio: false
        }
      });
    })
    return { chart };
  }
});
</script>

<style lang="scss" scoped>
</style>
