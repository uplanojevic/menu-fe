<template>
    <div class="header-container">
        <v-toolbar class="header-wrapper">
            <div class="d-flex">
                <img src="../assets/header-logo.svg"/>
                <div class="ml-3">
                    <span class="header-logo-title">Brand name</span>
                    <span class="header-logo-subtitle">All Stores</span>
                </div>
            </div>

            <v-spacer></v-spacer>

            <div class="corner-icons-wrapper">
                <v-img src="../assets/notification-icon.svg"/>
                <v-img src="../assets/user-icon.svg" class="user-icon"/>
            </div>
        </v-toolbar>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Header'
})
export default class Header extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.header-container {
    position: fixed;
    width: 100%;
    z-index: 99;

    .header-wrapper {
        height: 60px;

        .header-logo-title {
            display: block;
            text-transform: uppercase;
            font-weight: $medium-weight;
            font-size: 11px;
            font-family: $font-family;
            color: $gray;
        }

        .header-logo-subtitle {
            color: $black;
            font-family: $font-family;
            font-weight: $bold;
            font-size: $medium-font-size;
        }

        .corner-icons-wrapper {
            display: flex;
            align-items: center;

            .user-icon {
                margin: 0 16px 0 24px;
            }
        }
    }
}

</style>
