<template>
    <div class="base-autocomplete-container">
        <v-autocomplete
            solo
            flat
            dense
            placeholder="Search"
            append-icon=""
            :items="items"
            :return-object="$attrs['return-object']"
            v-bind="$attrs"
            :value="$attrs.value"
            @update:search-input="(e) => $emit('search', e)"
        >
            <template #prepend-inner>
                <img src="@/assets/search-icon.svg" >
            </template>

            <template #item="{ item }">
                <slot name="item" :item="item">
                    <span class="autocomplete-items">{{ getDisplayText(item, $attrs) }}</span>
                </slot>
            </template>

            <template #no-data>
                <span class="no-data-text">{{ noDataText }}</span>
            </template>
        </v-autocomplete>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'BaseAutocomplete',
  components: {}
})
export default class BaseAutocomplete extends Vue {
    @Prop({ default: () => [] }) items!: Array<any>;

    @Prop({ default: null }) searchValue!: string;

    get noDataText (): string {
      return 'No currency found'
    }

    getDisplayText (item: any, attr: any): string {
      if (attr['return-object']) {
        console.log('da vidimo ', attr['item-text'])
        return item[attr['item-text']]
      }
      return item
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.base-autocomplete-container {
    margin-top: 24px;
}

.autocomplete-items {
    font-weight: $normal;
    font-size: $medium-font-size;
    font-family: $font-family;
}

.no-data-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: $normal;
    font-family: $font-family;
    font-size: $medium-font-size;
    color: $light-gray;
}
</style>

<style lang="scss">
.base-autocomplete-container {
    .v-input__control {
        .v-input__slot {
            border: 1px solid #CCCCCC;
            border-radius: 4px;
            max-width: 300px;
        }
    }
}

.base-autocomplete-container {
    .v-input.v-input--is-focused.v-select.v-select--is-menu-active {
        .v-input__control {
            .v-input__slot  {
                border: 1px solid rgba(255, 102, 0, 0.6);
            }
        }
    }

}

</style>
