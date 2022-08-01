<template>
  <div>
    <div>
        <v-btn class="add-button-wrapper" @click="addCurrency()">
            <img src="../assets/plus-icon.svg"/>
            <span class="add-button-title ml-2">Add Currency</span>
        </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'AddButton',
  components: {}
})
export default class AddButton extends Vue {
  addCurrency (): void {
    this.$emit('press')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.add-button-wrapper {
    background: $light-orange !important;

    .add-button-title {
        font-weight: $medium-weight;
        font-family: $font-family;
        font-size: $medium-font-size;
        color: $white;
        text-transform: capitalize;
    }
}
</style>
