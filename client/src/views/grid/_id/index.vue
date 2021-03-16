// INDEX FILE FOR GRID/:ID

<template>
  <div>
    <div class="header">
      <div class="map-container">
        <static-map :gridId="true" :id="$route.params.gridId.toString()" />
      </div>
    </div>
    <div class="body">
      <h1>Grid Id: {{ gridId }}</h1>
      <h2>Niederschlag der letzten {{ numberOfDays }} Tage: {{ complete }}mm</h2>
      <!-- <h3>Stand: {{ lastData }}</h3> -->
      <div class="test">
        <div class="chart-container">
          <my-chart :labels='timestampsDailyChart' :data='radolanDailyValuesArray' />
        </div>
        <p />
        <div class="table-container">
          <my-table :cols='timestampsDailyTable' :data='radolanHourlyValuesArray' />
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import MyChart from "../../../components/chart.vue"
import MyTable from "../../../components/table.vue"
import StaticMap from "../../../components/StaticMap.vue"
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
    StaticMap,
    MyChart,
    MyTable
  },

  async setup() {
    const route = useRoute();
    const gridId = parseInt(route.params.gridId.toString());

    const eventDateString = ref("")

    const radolanDailyValuesArray = ref([])

    const numberOfDays = ref(14);
    let { startDateString, endDateString } = createStartEndDateString(numberOfDays.value)

    const { timestampsHourly } = createDatetimeArray()
    const timestampsDailyChart = ref(createDatetimeArray().timestampsDaily)
    const timestampsDailyTable = ref(createDatetimeArray().timestampsDaily)
    const APIResultRadolan = await getRadolanDataByGridId(gridId, startDateString, endDateString)
    const radolan = APIResultRadolan.response.data

    // const datetimeOptions = {
    //   weekday: 'long',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric'
    // }

    // const lastData = new Date(radolan.slice(-1)[0].createdAt).toLocaleDateString("de-DE", datetimeOptions)


    const radolanHourlyValuesArray = createRadolanHourlyValuesArray(radolan, timestampsHourly)
    radolanDailyValuesArray.value = createRadolanDailyValuesArray(radolanHourlyValuesArray)

    let complete = 0
    radolanDailyValuesArray.value.forEach((value) => {
      complete += value
    })

    complete = Math.round(complete * 10) / 10

    return {
      gridId,
      numberOfDays,
      // lastData,
      timestampsDailyChart,
      timestampsDailyTable,
      radolanDailyValuesArray,
      radolanHourlyValuesArray,
      complete,
      eventDateString
    };
  }
});
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  height: 40vh;
  width: 100vw;
  pointer-events: none;
}
.chart-container,
.table-container {
  position: relative;
  height: 40vh;
  width: 90vw;
}
.test {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
}
</style>
