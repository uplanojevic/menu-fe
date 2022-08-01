<template>
  <div :class="{'currencies-open-panel': isSidePanelOpened}" class="currencies-container">
    <div :class="{'currencies-wrapper': isSidePanelOpened}" class="pl-4">
      <div class="currencies-header-wrapper">
        <span class="currency-title">Currencies</span>
        <v-spacer></v-spacer>
        <add-button @press="openSidePanel()"></add-button>
      </div>

      <base-autocomplete
        :items="currencies"
        :return-object="true"
        item-text="isoMark"
        @search="filterCurrencies($event)"
      />

      <base-table
        class="table-wrapper"
        :headers="headers"
        :items="currencies"
        :noDataText="noDataText"
        @openCurrency="openCurrency($event)"
      />
    </div>

    <side-panel
      v-if="isSidePanelOpened"
      :currency="currency"
      :headerTitle="'Add Currency'"
      @closePanel="closeSidePanel()"
      @addCurrency="addCurrency($event)"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddButton from '@/components/AddButton.vue'
import SidePanel from '@/components/SidePanel.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseAutocomplete from '@/components/BaseAutocomplete.vue'
import Currency from '@/models/Currency'
import store from '@/store'

@Component({
  name: 'CurrenciesView',
  components: {
    AddButton,
    SidePanel,
    BaseTable,
    BaseAutocomplete
  }
})
export default class CurrenciesView extends Vue {
  isSidePanelOpened = false;

  headers = [
    {
      text: 'Currency name',
      value: 'name',
      width: '50%',
      class: 'table-header-item',
      cellClass: 'table-cell-name'
    },
    {
      text: 'Currency Code ',
      value: 'isoMark',
      width: '25%',
      class: 'table-header-item',
      cellClass: 'table-cell'
    },
    {
      text: 'Currency Symbol ',
      value: 'symbol',
      width: '25%',
      class: 'table-header-item',
      cellClass: 'table-cell'
    },
    {
      value: 'isDeletable',
      width: '10%'
    }
  ]

  currencies: Currency[] = []

  currency: Currency = {
    id: '',
    isoMark: '',
    symbol: ''
  }

  get noDataText (): string {
    return 'There are no currencies added'
  }

  get uuid (): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = Math.random() * 100 | 0
      const value = char === 'x' ? random : (random % 4 + 8)
      return value.toString(16)
    })
  }

  created (): void {
    const savedCurrencies = JSON.parse(localStorage.getItem('currency') as string)?.currencies
    if (savedCurrencies && savedCurrencies.length > 0) {
      this.currencies = savedCurrencies
    }
  }

  openSidePanel (): void {
    // I oversaw it supposted to work with routes
    // in that case I would do something like: this.$router.push({ name: SidePanel , params: { currencyId: currency.id }})
    this.isSidePanelOpened = true
  }

  closeSidePanel (): void {
    this.isSidePanelOpened = false
    this.clearCurrency()
  }

  addCurrency (currency: Currency): void {
    if (currency.id === '') {
      this.createNewCurrency(currency)
    } else {
      this.modifyExistingCurrency(currency)
    }
    this.clearCurrency()
  }

  createNewCurrency (currency: Currency): void {
    currency.id = this.uuid

    /*
    this.currencies.forEach((c: Currency) => {
      if (c.isoMark !== currency.isoMark && c.symbol !== currency.symbol && c.id !== currency.id) {
        store.dispatch('addCurrency', { currency })
      }
    }) */

    store.dispatch('addCurrency', { currency })

    const newlyAdded = store.state.currencies as Currency[]
    newlyAdded.forEach((added: Currency) => {
      this.currencies.push(added)
    })
    localStorage.setItem('currency', JSON.stringify({ currencies: this.currencies }))
  }

  modifyExistingCurrency (currency: Currency): void {
    this.currency = currency
    store.dispatch('editCurrency', { currencies: this.currencies, currency })
    this.isSidePanelOpened = false
    localStorage.setItem('currency', JSON.stringify({ currencies: this.currencies }))
  }

  openCurrency (currency: Currency): void {
    this.isSidePanelOpened = true
    this.currency = currency
  }

  clearCurrency (): void {
    this.currency = {
      id: '',
      isoMark: '',
      symbol: '',
      name: '',
      isDeletable: false
    }
  }

  filterCurrencies (value: string): void {
    if (!value || value === '') {
      this.currencies = JSON.parse(localStorage.getItem('currency') as string)?.currencies
      return
    }

    const tempCurrencies: Currency[] = []
    this.currencies.forEach((c: Currency) => {
      if (c.name?.includes(value) || c.isoMark.includes(value) || c.symbol.includes(value)) {
        tempCurrencies.push(c)
      }
    })

    this.currencies = tempCurrencies
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

$z_index: 100;
$min_width: 400px;

.currencies-open-panel {
  display: flex;
}

.currencies-wrapper {
  width: 70%;
  padding-right: 30px;
}

.currencies-container {
  .currencies-header-wrapper {
    display: flex;
    align-items: center;
    padding-top: 30px;

    .currency-title {
      font-weight: $bold;
      font-family: $font-family;
      font-size: 28px;
      color: $black;
    }

    .table-header-item {
      font-weight: $medium-weight;
      font-family: $font-family;
      font-size: 11px;
      color: $gray;
      text-transform: uppercase;
    }
  }
}

</style>

<style lang="scss">
@import '@/styles/variables.scss';

.table-wrapper {
  .v-data-table-header {
    tr {
    .table-header-item {
      span {
        font-family: $font-family;
        font-weight: $medium-weight;
        font-size: 11px;
        color: $gray;
        text-transform: uppercase;
      }
    }
    }
  }

  .table-cell-name {
    font-weight: $medium-weight;
    font-family: $font-family;
    font-size: $medium-font-size;
    color: $black;
    text-transform: capitalize;

    &:hover {
      cursor: pointer;
    }
  }

  .table-cell {
    font-weight: $normal;
    font-family: $font-family;
    font-size: $medium-font-size;
    text-transform: uppercase;
    color: $light-black;

    &:hover {
      cursor: pointer;
    }
  }
}

</style>
