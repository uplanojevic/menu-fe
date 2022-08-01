<template>
    <div class="side-panel-wrapper pt-4">
        <aside>
            <div class="side-panel-header">
                <img src="../assets/close-icon.svg" @click="closeSidePanel()"/>
                <span class="side-panel-title">{{ headerTitle }}</span>
                <v-spacer></v-spacer>
                <v-btn
                    class="cancel-btn mr-2"
                    small
                    @click="closeSidePanel()"
                >Cancel
                </v-btn>
                <v-btn
                    class="add-btn"
                    small
                    @click="addCurrency(currency)"
                >Add
                </v-btn>
            </div>

            <div class="side-panel-form-container">
                <div class="mt-4">
                    <span class="side-panel-label-form">Currency name</span>
                    <v-text-field
                        outlined
                        autofocus
                        full-width
                        height="34px"
                        color="rgba(255, 102, 0, 0.6)"
                        placeholder="Add name"
                        class="side-panel-input-form"
                        v-model="currency.name"
                    />
                </div>

                <div>
                    <span class="side-panel-label-form">Currency code</span>
                    <v-text-field
                        outlined
                        full-width
                        required
                        height="34px"
                        color="rgba(255, 102, 0, 0.6)"
                        placeholder="Add code"
                        class="side-panel-input-form"
                        :rules="getCodeErrorMessage"
                        v-model="currency.isoMark"
                    />
                </div>

                <div>
                    <span class="side-panel-label-form">Currency symbol</span>
                    <v-text-field
                        outlined
                        full-width
                        required
                        height="34px"
                        color="rgba(255, 102, 0, 0.6)"
                        placeholder="Add symbol"
                        class="side-panel-input-form"
                        :rules="getErrorSymbolMessage"
                        v-model="currency.symbol"
                    />
                </div>
            </div>
        </aside>
    </div>
</template>

<script lang="ts">
import Currency from '@/models/Currency'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'SidePanel',
  components: {
  }
})
export default class SidePanel extends Vue {
    @Prop({ default: null }) headerTitle!: string;

    @Prop({ default: null }) currency!: Currency;

    get getCodeErrorMessage (): any {
      if (this.currency.isoMark.length !== 3) {
        return ['Please enter a unique code with 3 characters']
      }
    }

    get getErrorSymbolMessage (): any {
      if (!this.currency.symbol || this.currency.symbol === '') {
        return ['Please enter a symbol']
      }
    }

    closeSidePanel (): void {
      this.$emit('closePanel')
    }

    addCurrency (currency: Currency): void {
      currency.isDeletable = true
      if (this.currency.isoMark !== '' && this.currency.isoMark.length === 3 && this.currency.symbol !== '') {
        this.$emit('addCurrency', currency)
      }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.side-panel-wrapper {
    height: 100vh;
    width: 40%;
    padding: 0 12px 0 24px;
    box-shadow: -1px 0px 0px rgb(0 0 0 / 15%);

    .side-panel-header {
        display: flex;
        align-items: center;
        padding-bottom: 12px;
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.15);

        .side-panel-title {
            font-family: $font-family;
            font-weight: $bold;
            font-size: 17px;
            padding-left: 16px;
        }

        .cancel-btn.theme--light.v-btn.v-btn--has-bg {
            background: $white;
        }

        .add-btn.theme--light.v-btn.v-btn--has-bg {
            background: $light-orange;
        }
    }

    .side-panel-form-container {
        .side-panel-label-form {
            padding-top: 16px;
            font-weight: $medium-weight;
            font-family: $font-family;
            font-size: $medium-font-size;
        }

        .side-panel-input-form {
            margin-top: 4px;
        }
    }
}

</style>

<style lang="scss">
@import '@/styles/variables.scss';

.side-panel-wrapper {
    .side-panel-header {
        .cancel-btn.theme--light.v-btn.v-btn--has-bg {
            .v-btn__content {
                font-weight: $medium-weight;
                font-family: $font-family;
                font-size: $medium-font-size;
                text-align: center;
                color: $light-black;
                text-transform: capitalize;
            }
        }

        .add-btn.theme--light.v-btn.v-btn--has-bg {
            .v-btn__content {
                font-weight: $medium-weight;
                font-family: $font-family;
                font-size: $medium-font-size;
                text-align: center;
                color: $white;
                text-transform: capitalize;
            }
        }
    }

    .side-panel-form-container {
        .v-text-field--full-width > .v-input__control > .v-input__slot, .v-text-field--outlined > .v-input__control > .v-input__slot {
            min-height: 48px;
        }

        .v-text-field__details {
            margin-bottom: 0;
        }
    }
}

</style>
