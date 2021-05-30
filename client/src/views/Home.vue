<template>
  <div>
    <div class="main-container">
      <h1>Niederschlagsdaten des Deutschen Wetterdienstes</h1>
      <h3>Stündliche, millimetergenaue Niederschlagsdaten für jedes Feld, jedes Grundstück und jeden Schlag</h3>
      <router-link to="/about"><button class="btn">Worum geht's?</button></router-link>
      <br />
      <router-link to="/explore"><button class="btn">Explore</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  components: {
  }
});
</script>

<style lang="scss" scoped>
.main-container {
  margin: 0 auto;
  width: 50%;
}

.btn {
  cursor: pointer;
}
</style>
