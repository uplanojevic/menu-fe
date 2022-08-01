<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="items"
            :hide-default-footer="hasFooter"
            @click:row="(item) => openCurrency(item)"
        >

        <template v-slot:[`item.isDeletable`]="{ item }">
            <img src="@/assets/trash-icon.svg" @click="deleteCurrency(item)"/>
        </template>

        <template #no-data>
            {{ noDataText }}
        </template>
        </v-data-table>
        </div>
</template>

<script lang="ts">
import Currency from '@/models/Currency'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DataTableHeader } from 'vuetify'
import store from '@/store'

@Component({
  name: 'BaseTable',
  components: {}
})
export default class BaseTable extends Vue {
    @Prop({ default: () => [] }) readonly headers!: Array<DataTableHeader>;

    @Prop({ default: () => [] }) readonly items!: Array<Currency>;

    @Prop({ default: null }) noDataText!: string;

    @Prop({ default: true }) hasFooter!: boolean;

    deleteCurrency (currency: Currency): void {
      store.dispatch('deleteCurrency', { currencies: this.items, currency })
      localStorage.setItem('currency', JSON.stringify({ currencies: this.items }))
    }

    openCurrency (currency: Currency): void {
      this.$emit('openCurrency', currency)
    }
}
</script>

<style lang="scss" scoped>
</style>
