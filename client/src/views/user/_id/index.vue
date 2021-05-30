// INDEX FILE FOR USER/:ID

<template>
  <div class="body">
    <h1>Hey {{ user.firstname }}! </h1>
    <router-link to="/drawmap">
      <button>Add Field</button>
    </router-link>

    <div class="fields__container">
      <div class="field__card" v-for="field in fields" :key="field.id">
        <h3> {{ field.name }}</h3>
        <router-link class="field__button" :to='{ name: "Field", params: {userId: user.id, fieldId: field.id}}'>
          <button>Mehr anzeigen...</button>
        </router-link>
      </div>
    </div>
    <div class="map__container">
      <fields-map :userId="user.id" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted
} from "vue";
// import { useGetters, useState } from "vuex-composition-helpers";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import { getFieldsByUser } from "../../../utils/functions/getFieldsByUser"
import FieldsMap from "../../../components/FieldsMap.vue";

export default defineComponent({
  name: "indexUser",
  components: { FieldsMap },

  async setup() {
    const route = useRoute();
    const store = useStore();

    let user = computed(() => store.state.user).value

    const fields = (await getFieldsByUser(user.id)).response.data

    return {
      user,
      fields
    }
  }
})
</script>

<style lang="scss" scoped>
.fields__container {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 90vw;
}
// .map__container {
//   position: relative;
//   height: 40vh;
//   width: 100vw;
// }
.field__card {
  width: 18vw;
  height: 15vh;
  background: lightgray;
  border: 1px grey solid;
  border-radius: 15px;
  margin: 1vh;
}
</style>
