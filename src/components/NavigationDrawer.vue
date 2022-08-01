<template>
    <v-navigation-drawer
        :fixed="$vuetify.breakpoint.smAndDown"
        :permanent="$vuetify.breakpoint.mdAndUp"
        app
        left
        width="256"
        color="#F2F2F2"
    >

    <v-list class="navigation-container">
        <v-list-item-group>
            <v-list-item
                v-for="option in navigationOptions"
                :key="option.title"
                :class="{'active-page': isSelected(option.value)}"
                @click="goToRoute(option.value)"
            >
            <v-list-item-icon>
                <img :src="option.icon"/>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title v-text="option.title" class="navigation-option-title"></v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'NavigationDrawer'
})
export default class NavigationDrawer extends Vue {
    navigationOptions = [
      {
        title: 'Analytics',
        icon: require('@/assets/analytics-icon.svg'),
        value: 'AnalyticsView'
      },
      {
        title: 'Offers',
        icon: require('../assets/offers-icon.svg'),
        value: 'OffersView'
      },
      {
        title: 'Loyality',
        icon: require('../assets/loyality-icon.svg'),
        value: 'LoyalityView'
      },
      {
        title: 'Currencies',
        icon: require('../assets/currencies-icon.svg'),
        value: 'CurrenciesView'
      },
      {
        title: 'Dispatch',
        icon: require('../assets/driver-icon.svg'),
        value: 'DispatchView'
      },
      {
        title: 'Configurations',
        icon: require('../assets/settings-icon.svg'),
        value: 'ConfigurationsView'
      }
    ]

    activeRoute = ''

    @Watch('$route')
    onCheckRoute (): void {
      this.activeRoute = this.$route.name as string
    }

    goToRoute (value: string): void {
      if (this.$route.name !== value) {
        this.$router.push({ name: value })
      }
    }

    isSelected (name: string): boolean {
      return name === this.activeRoute
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.navigation-container {
    margin-top: 60px;
}

.active-page {
  background: rgba(255, 102, 0, 0.07);
  border-radius: 4px;

  .v-list-item__title.navigation-option-title {
    color: $light-orange ;
    font-weight: $medium-weight;
    font-family: $font-family;
    font-size: $medium-font-size;
  }
}

</style>

<style lang="scss">
@import '@/styles/variables.scss';

.navigation-container {
    .v-list-item__title.navigation-option-title {
        font-weight: $normal;
        font-family: $font-family;
        font-size: $medium-font-size;
    }
}

</style>
