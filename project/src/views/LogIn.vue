<template>
  <div style="margin-top: 1em;">
    <h1 class="title is-4">Bienvenue, connecte-toi !</h1>
    <br />
    <div class="columns">
      <div class="column has-text-right">
        <label for="email">Email</label><br />
        <label for="password1">Password</label> <br />
      </div>
      <div class="column has-text-left">
        <input
          v-model.trim="loginForm.email"
          type="text"
          placeholder="you@email.com"
          id="email1"
        />
        <br />
        <input
          v-model.trim="loginForm.password"
          type="password"
          placeholder="******"
          id="password1"
        />
        <br />
      </div>
    </div>
    <button @click="login()" class="button">Se connecter</button>
    <!-- <div class="extras">
      Vous n'avez pas de compte ? <a @click="toggleForm()">Créez-en un !</a>
    </div> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      showLoginForm: true
    };
  },
  methods: {
    toggleForm() {
      this.$router.push({
        name: "SignUp"
      });
    },
    login() {
      let _this = this;
      this.$store
        .dispatch("login", {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
        .then(function() {
          _this.$router.push("/");
        })
        .catch(function(error) {
          console.log(error);
          alert("Nom de compte ou mot de passe incorrect");
        });
    }
  }
};
</script>

<style></style>
