<template>
  <div style="margin-top: 1em;">
    Cette page sera supprimée après que tous les membres du projet aient créer
    leur compte
    <h1 class="title is-4">Crée ton compte !</h1>

    <label for="name">Nom* : </label>
    <input
      v-model.trim="signupForm.name"
      type="text"
      placeholder="Nom"
      id="name"
      :class="isNameComplete ? '' : 'emptyfield'"
    />
    <br />
    <label for="forname">Prénom* : </label>
    <input
      v-model.trim="signupForm.forname"
      type="text"
      placeholder="Prénom"
      id="forname"
      :class="isForNameComplete ? '' : 'emptyfield'"
    />
    <br />
    <label for="email">Email* : </label>
    <input
      v-model.trim="signupForm.email"
      type="text"
      placeholder="you@email.com"
      id="email"
      :class="isEmailComplete ? '' : 'emptyfield'"
    />
    <br />
    <label for="password">Password* : </label>

    <input
      v-model.trim="signupForm.password"
      type="password"
      placeholder="*******"
      id="password"
      :class="isPassWordComplete ? '' : 'emptyfield'"
    />
    <br />
    <div class="is-size-7">* : Champs Obligatoires</div>
    <br />
    <button @click="signup()" class="button">S'inscrire !</button><br /><br />
    <div class="extras">
      Vous avez déjà un compte ? <a @click="toggleForm()">Connectez vous !</a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      signupForm: {
        name: "",
        forname: "",
        email: "",
        password: ""
      },
      isNameComplete: true,
      isForNameComplete: true,
      isEmailComplete: true,
      isPassWordComplete: true
    };
  },
  methods: {
    toggleForm() {
      this.$router.push({
        name: "LogIn"
      });
    },
    ValidateEmail(email) {
      //RFC 2822 standard email validation
      var mailformat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return email.match(mailformat) && email.match(mailformat)[0] == email;
    },
    signup() {
      let sName = document.getElementById("name").value;
      let sForname = document.getElementById("forname").value;
      let sEmail = document.getElementById("email").value;
      let sPassword = document.getElementById("password").value;

      if (sName === "") {
        this.isNameComplete = false;
      } else {
        this.isNameComplete = true;
      }

      if (sForname === "") {
        this.isForNameComplete = false;
      } else {
        this.isForNameComplete = true;
      }

      if (!this.ValidateEmail(sEmail)) {
        this.isEmailComplete = false;
      } else {
        this.isEmailComplete = true;
      }

      if (sPassword === "") {
        this.isPassWordComplete = false;
      } else {
        this.isPassWordComplete = true;
      }

      if (
        this.isNameComplete &&
        this.isForNameComplete &&
        this.isEmailComplete &&
        this.isPassWordComplete
      ) {
        this.$store.dispatch("signup", {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name,
          forname: this.signupForm.forname
        });
      }
    }
  }
};
</script>

<style>
.emptyfield {
  border: 1px solid red;
  border-radius: 4px;
}
</style>
