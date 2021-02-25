// INDEX FILE FOR FIELD/:ID

<template>
  <div>
    <div class="header">
      <div class="map-container">
        <static-map :fieldId="true" :id=fieldId />
      </div>
    </div>
    <div class="body">
      <h1>{{ fieldName }}</h1>
      <br />
      <input type="date" name="eventDateString" v-model="eventDateString">
      <br />
      <button @click=printDate()>Print Date</button>
      <br />
      <h2>Gesamtniederschlag zwischen</h2>
      <h2>{{ startDatePrint }} und {{ endDatePrint }}:</h2>
      <h2>{{ complete }}mm</h2>

      <div class="test">
        <div class="chart-container">
          <my-chart :labels='timestampsDailyChart' :data='radolanDailyValuesArray' :key="chartKey" />
        </div>
        <p />
        <div class="table-container">
          <my-table :cols='timestampsDailyTable' :data='radolanHourlyValuesArray' :key="tableKey" />
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import MyChart from "../../../components/chart.vue"
import MyTable from "../../../components/table.vue"
import StaticMap from "../../../components/StaticMap.vue"
import {
  getRadolanDataByFieldId
} from "../../../utils/functions/getRadolanDataByFieldId";
import {
  createStartEndDateString
} from "../../../utils/functions/helper/createStartEndDateString";
import { getFieldById } from "../../../utils/functions/getFieldById";


export default defineComponent({
  name: "indexField",
  components: {
    StaticMap,
    MyChart,
    MyTable
  },

  async setup() {
    const route = useRoute();
    const fieldId = route.params.fieldId.toString();

    const eventDateString = ref("")
    const chartKey = ref(0)
    const tableKey = ref(0)

    const field = await getFieldById(fieldId)
    const fieldName = ref(field.response.data.name)

    const numberOfDays = ref(14);
    const startDateString = ref(createStartEndDateString(numberOfDays.value).startDateString)
    const endDateString = ref(createStartEndDateString(numberOfDays.value).endDateString)


    const datetimeOptions = {
      // weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }

    const startDatePrint = ref(new Date(startDateString.value).toLocaleDateString("de-DE", datetimeOptions))
    const endDatePrint = ref(new Date(endDateString.value).toLocaleDateString("de-DE", datetimeOptions))

    const response = await getRadolanDataByFieldId(fieldId, startDateString.value, endDateString.value)

    const radolanDailyValuesArray = ref(response.radolanDaily)
    const radolanHourlyValuesArray = ref(response.radolanHourly)
    const timestampsDailyChart = ref(response.timestampsDaily)
    const timestampsDailyTable = ref(response.timestampsDaily)
    const complete = ref(Math.round((response.complete * 100) / 100) / 10)

    async function printDate() {
      let eventDate = new Date(eventDateString.value)
      let startDate = new Date(eventDate)
      startDate.setDate(eventDate.getDate() - 14)
      let endDate = new Date(eventDate)
      endDate.setDate(eventDate.getDate() + 14)

      startDateString.value = startDate.toISOString().split("T")[0]
      endDateString.value = endDate.toISOString().split("T")[0]

      const newResponse = await getRadolanDataByFieldId(fieldId, startDateString.value, endDateString.value, true)

      radolanDailyValuesArray.value = newResponse.radolanDaily
      radolanHourlyValuesArray.value = newResponse.radolanHourly
      timestampsDailyChart.value = newResponse.timestampsDaily
      timestampsDailyTable.value = newResponse.timestampsDaily
      complete.value = Math.round((newResponse.complete * 100) / 100) / 10

      chartKey.value += 1
      tableKey.value += 1
    }

    return {
      fieldId,
      fieldName,
      numberOfDays,
      timestampsDailyChart,
      timestampsDailyTable,
      radolanDailyValuesArray,
      radolanHourlyValuesArray,
      complete,
      printDate,
      startDateString,
      endDateString,
      startDatePrint,
      endDatePrint,
      eventDateString,
      chartKey,
      tableKey
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
