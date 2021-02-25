<template>
  <div ref="table"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

export default defineComponent({
  name: "MyTable",
  props: {
    cols: {
      type: Array as any,
      required: true
    },
    data: {
      type: Array as any,
      default: []
    },
    search: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const table = ref(null)

    const timestampArray = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00"
    ]

    const data = [] as any
    for (let x = 0; x < 24; x++) {
      const temp = [] as any
      temp.push(timestampArray[x])
      for (let y = 0; y < (props.data.length / 24); y++) {
        temp.push(props.data[(y * 24) + x].toString())
      }
      temp.push(timestampArray[x])
      data.push(temp)
    }

    const datetimeOptions = {
      month: "2-digit",
      day: "2-digit"
    }

    function returnStyle(color) {
      return {
        "style": {
          "background": color,
          "text-align": "center",
          "font-size": "16px",
          "width": "20px",
          "overflow": "hidden",
          "white-space": "nowrap",
          "cursor": "pointer"
        }
      }
    }

    const cols = [] as any
    cols.push("Uhrzeit")
    for (const day of props.cols) {
      const d = new Date(day)
      const date = d.toLocaleString("de-DE", { day: "2-digit" })
      const month = d.toLocaleString("de-DE", { month: "2-digit" })
      const year = d.getFullYear().toString().split("20")[1]
      cols.push({
        name: `${date}.${month}.`,
        attributes: (cell) => {
          const value = parseFloat(cell);
          if (value == 0) {
            return returnStyle("white")
          } else if (value == 0.1) {
            return returnStyle("#FCFDC1")
          } else if (value >= 0.2 && value < 0.5) {
            return returnStyle("#FBFC5C")
          } else if (value >= 0.5 && value < 1) {
            return returnStyle("#DFFC26")
          } else if (value >= 1 && value < 2) {
            return returnStyle("#A0D626")
          } else if (value >= 2 && value < 5) {
            return returnStyle("#45C379")
          } else if (value >= 5 && value < 10) {
            return returnStyle("#38D6D8")
          } else if (value >= 10 && value < 15) {
            return returnStyle("#1EA1D6")
          } else if (value >= 15 && value < 25) {
            return returnStyle("#1030FC")
          } else if (value >= 25 && value < 40) {
            return returnStyle("#9232B7")
          } else if (value >= 40 && value < 60) {
            return returnStyle("#DA28C6")
          } else if (value >= 60 && value < 80) {
            return returnStyle("#E70C0C")
          } else if (value >= 80 && value < 100) {
            return returnStyle("#880F0D")
          } else if (value >= 100) {
            return returnStyle("#4F0E0D")
          }
        }
      })
    }
    cols.push("Uhrzeit")

    onMounted(() => {
      const myTable = new Grid({
        columns: cols,
        data: data,
        search: props.search,
        pagination: props.pagination,
        fixedHeader: true,
        autoWidth: true,
        height: "400px",
        style: {
          th: {
            "text-align": "center",
            "font-size": "16px"
          },
          td: {
            "text-align": "center",
            "color": "#6b7280",
            "background-color": "#f9fafb",
            "font-size": "16px",
            "font-weight": "bold"
          }
        }
      }).render(table.value!)

      // myTable.on('cellClick', (...args) => {
      //   console.log(args[3].cells[0].data)
      // })
    })

    return { table }
  }
});
</script>

<style lang="scss" scoped>
</style>
