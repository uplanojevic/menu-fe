<template>
  <div class="registration-view-background">
    <registration-form @onSubmit="submitUser($event)"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RegistrationForm from '../components/RegistrationForm.vue'

type User = {
  username: string;
  password: string;
}

@Component({
  name: 'RegistrationView',
  components: {
    RegistrationForm
  }
})
export default class RegistrationView extends Vue {
  submitUser (user: User) {
    this.$emit('userVerified', { user, success: true })
  }
}
</script>

<style lang="scss" scoped>
.registration-view-background {
    background: url('../assets/login-background.svg') no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100%;
}
</style>
