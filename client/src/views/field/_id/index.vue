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
      <h2>Niederschlag der letzten {{ numberOfDays}} Tage: {{ complete }}mm</h2>
      <div class="test">
        <div class="chart-container">
          <my-chart :labels=timestampsDailyChart :data=radolanDailyValuesArray />
        </div>
        <p />
        <div class="table-container">
          <my-table :cols=timestampsDailyTable :data=radolanHourlyValuesArray />
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

    const field = await getFieldById(fieldId)
    const fieldName = ref(field.response.data.name)

    const numberOfDays = ref(14);
    const { startDateString, endDateString } = createStartEndDateString(numberOfDays.value)

    const response = await getRadolanDataByFieldId(fieldId, startDateString, endDateString)

    const radolanDailyValuesArray = ref(response.radolanDaily)
    const radolanHourlyValuesArray = ref(response.radolanHourly)
    const timestampsDailyChart = ref(response.timestampsDaily)
    const timestampsDailyTable = ref(response.timestampsDaily)
    const complete = ref(Math.round((response.complete * 100) / 100))

    return {
      fieldId,
      fieldName,
      numberOfDays,
      timestampsDailyChart,
      timestampsDailyTable,
      radolanDailyValuesArray,
      radolanHourlyValuesArray,
      complete
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
