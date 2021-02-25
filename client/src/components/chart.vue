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

    const bgColors = [] as any

    for (let i = 0; i < props.data.length; i++) {
      bgColors.push("#FFF")
    }

    const datetimeOptions = {
      // weekday: 'long',
      // year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }

    const labels = [] as any
    for (const day of props.labels) {
      const d = new Date(day).toLocaleDateString("de-DE", datetimeOptions)
      labels.push(d)
    }

    onMounted(() => {
      const myChart = new Chart(chart.value!, {
        type: "bar",
        data: {
          labels: labels,
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
              backgroundColor: bgColors
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

      const dataset = myChart.data.datasets[1];
      for (let i = 0; i < dataset.data.length; i++) {
        if (dataset.data[i] == 0) {
          dataset.backgroundColor[i] = "#FFF";
        } else if (dataset.data[i] >= 0.1 && dataset.data[i] < 1) {
          dataset.backgroundColor[i] = "#FCFFC1";
        } else if (dataset.data[i] >= 1 && dataset.data[i] < 2) {
          dataset.backgroundColor[i] = "#FBFF5C";
        } else if (dataset.data[i] >= 2 && dataset.data[i] < 5) {
          dataset.backgroundColor[i] = "#DFFC26";
        } else if (dataset.data[i] >= 5 && dataset.data[i] < 10) {
          dataset.backgroundColor[i] = "#A0D626";
        } else if (dataset.data[i] >= 10 && dataset.data[i] < 15) {
          dataset.backgroundColor[i] = "#45C379";
        } else if (dataset.data[i] >= 15 && dataset.data[i] < 20) {
          dataset.backgroundColor[i] = "#00D6D8";
        } else if (dataset.data[i] >= 20 && dataset.data[i] < 30) {
          dataset.backgroundColor[i] = "#11A1D6";
        } else if (dataset.data[i] >= 30 && dataset.data[i] < 50) {
          dataset.backgroundColor[i] = "#0702FC";
        } else if (dataset.data[i] >= 50 && dataset.data[i] < 80) {
          dataset.backgroundColor[i] = "#9232B7";
        } else if (dataset.data[i] >= 80 && dataset.data[i] < 100) {
          dataset.backgroundColor[i] = "#DA28C6";
        } else if (dataset.data[i] >= 100 && dataset.data[i] < 150) {
          dataset.backgroundColor[i] = "#E70D0C";
        } else if (dataset.data[i] >= 150 && dataset.data[i] < 200) {
          dataset.backgroundColor[i] = "#880E0D";
        } else if (dataset.data[i] >= 200) {
          dataset.backgroundColor[i] = "#4F0E0D";
        }
      }
      myChart.update();
    })
    return { chart };
  }
});
</script>

<style lang="scss" scoped>
</style>
