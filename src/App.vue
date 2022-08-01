<template>
  <v-app id="app">
    <div v-if="userVerified">
      <NavigationDrawer/>
      <Header/>
      <AppBody />
    </div>

    <RegistrationView v-if="!userVerified" @userVerified="setUser($event)"/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import RegistrationView from '@/views/RegistrationView.vue'
import Header from '@/components/Header.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import AppBody from '@/views/AppBody.vue'

@Component({
  components: {
    RegistrationView,
    Header,
    NavigationDrawer,
    AppBody
  }
})
export default class App extends Vue {
  userVerified = false;

  created (): void {
    const isSuccess = JSON.parse(localStorage.getItem('isAuthenticated') as string)?.isAuthenticated
    this.userVerified = !!isSuccess
  }

  @Watch('$route')
  onCheckAuthentification (): void {
    if (this.$route.path === '/') {
      localStorage.setItem('isAuthenticated', JSON.stringify({ isAuthenticated: false }))
      this.userVerified = false
    }
  }

  setUser (userData: any): void {
    this.userVerified = userData.success
    this.$router.push({
      name: 'CurrenciesView',
      params: { username: userData.user }
    })

    localStorage.setItem('isAuthenticated', JSON.stringify({ isAuthenticated: true }))
    this.userVerified = true
  }
}
</script>

<style lang="scss">
</style>
