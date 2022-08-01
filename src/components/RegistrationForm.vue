<template>
  <div class="registration-form-wrapper">
    <img src="../assets/menu-logo.svg"/>
    <div class="form-fields">
        <span class="registration-form-title">Sign In</span>
        <span class="registration-form-subtitle pt-1">Please enter your email and password</span>
        <v-text-field
            outlined
            autofocus
            full-width
            height="34px"
            class="pt-3"
            placeholder="Your email address"
            type="email"
            color="rgba(255, 102, 0, 0.6)"
            @input="emailFilled($event)"
        />

        <v-text-field
            outlined
            full-width
            class="pt-3"
            height="34px"
            placeholder="Password"
            type="password"
            color="rgba(255, 102, 0, 0.6)"
            @input="passwordFilled($event)"
        />

        <v-btn
            block
            class="registration-button"
            @click="registerUser()">
        Sign in
        </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'RegistrationForm',
  components: {}
})
export default class RegistrationForm extends Vue {
    email = '';

    password = '';

    emailFilled (email: string): void {
      this.email = email
    }

    passwordFilled (password: string): void {
      this.password = password
    }

    registerUser (): void {
      const newUser = { username: this.email, password: this.password }
      this.$emit('onSubmit', newUser)
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.registration-form-wrapper {
    position: absolute;
    top: 35%;
    left: 45%;
    background: $white;
    padding: 60px;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    .registration-form-title {
        display: block;
        font-weight: $bold;
        font-family: $font-family;
        font-size: 22px;
        padding-top: 16px;
    }

    .registration-form-subtitle {
        font-weight: $normal;
        font-family: $font-family;
        font-size: $medium-font-size;
    }

    .registration-button {
        margin-top: 24px;
        background: $light-orange;
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.08), inset 0px -1px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }
}

</style>

<style lang="scss">
@import '@/styles/variables.scss';

.registration-form-wrapper {
    .form-fields {
      .v-input.v-text-field.v-text-field--full-width.v-text-field--single-line.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined {
        height: 48px;
      }
      .v-text-field--full-width > .v-input__control > .v-input__slot, .v-text-field--outlined > .v-input__control > .v-input__slot {
          min-height: 28px;
      }

      .v-text-field__details {
          margin-bottom: 0;
      }

      .registration-button {
        > span {
          color: $white;
          font-weight: $medium-weight;
          font-family: $font-family;
          font-size: $medium-font-size;
          text-transform: initial;
        }
      }
    }
}

</style>
