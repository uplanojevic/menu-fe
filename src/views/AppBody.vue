<template>
  <v-main class="app-body">
    <v-container fluid>
      <router-view />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'AppBody',
  components: {}
})
export default class AppBody extends Vue {}
</script>

<style lang="scss">
.app-body {
  margin-top: 50px;
}
</style>
