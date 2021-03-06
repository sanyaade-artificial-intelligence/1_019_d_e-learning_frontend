<template>
  <ViewWrapper class="h-screen">
    <div class="flex flex-col w-full h-full justify-center items-center">
      <section class="max-w-80 w-full rounded-lg">
        <div class="w-full mb-4">
          <h1 class="text-center font-semibold text-2xl">{{ $t('signUp') }}</h1>
        </div>
        <div class="w-full">
          <form
            class="form login-form"
            @submit.prevent="signup"
          >
            <SelectField
              v-model="form.role"
              :label="$t('iAm')"
              required
            >
              <option value="teacher">{{ $t('teacher') }}</option>
              <option value="student">{{ $t('student') }}</option>
            </SelectField>
            <TextField
              v-model="form.firstname"
              :label="$t('firstName')"
              required
              :minlength="3"
              :maxlength="50"
            />
            <TextField
              v-model="form.name"
              :label="$t('lastName')"
              :minlength="3"
              :maxlength="50"
              required
            />
            <TextField
              v-model="form.username"
              :label="$t('username')"
              :minlength="6"
              :maxlength="50"
              :custom-error="userNameInUse ? true : false"
              :custom-error-msg="$t('usernameAlreadyInUse')"
              required
            />
            <TextField
              v-model="form.email"
              :label="$t('email')"
              :custom-error="emailInUse ? true : false"
              :custom-error-msg="$t('emailAlreadyInUse')"
              :maxlength="255"
              required
              type="email"
            />
            <TextField
              v-model="form.password"
              :label="$t('password')"
              :minlength="6"
              :maxlength="255"
              required
              type="password"
            />
            <PasswordSecurity
              v-model="passwordSecurity"
              :password="form.password"
              show-warning
            />
            <Button
              theme="primary"
              class="w-full"
              type="submit"
              :loading="loading"
              :disabled="passwordSecurity <= 1"
            >
              {{ $t('signUp') }}
            </Button>
            <div class="flex my-4 items-center">
              <hr class="flex flex-1">
              <span class="px-2 text-sm font-medium text-gray-600">{{ $t('haveAlreadyAnAccount') }}</span>
              <hr class="flex flex-1">
            </div>
            <Button class="w-full" to="/login">{{ $t('signInNow') }}</Button>
          </form>
        </div>
      </section>
    </div>
  </ViewWrapper>
</template>

<script>
export default {
  injectModels: ['Authentication'],

  data() {
    return {
      form: {
        role: null,
        firstname: null,
        name: null,
        username: null,
        email: null,
        password: null,
      },
      passwordSecurity: 0,

      emailInUse: false,
      userNameInUse: false,
      loading: false,
    };
  },

  methods: {
    signup() {
      this.loading = true;
      this.Authentication.signup(this.form)
        .then(() => {
          this.form = {
            role: null,
            firstname: null,
            name: null,
            username: null,
            email: null,
            password: null,
          };
          this.passwordSecurity = 0;

          this.emailInUse = false;
          this.userNameInUse = false;
          this.loading = false;
        })
        .catch((err) => {
          const error = err.response.data;
          this.loading = false;
          if (error.message === 'EMAIL_ALREADY_REGISTERED') {
            this.emailInUse = true;
          } else if (error.message === 'USERNAME_ALREADY_REGISTERED') {
            this.userNameInUse = true;
          }
        });
    },
  },
};
</script>
