<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div v-if="!isLoading" class="modal-container">
        <span class="close" @click="close()">&times;</span>
        <div class="modal-header">
          <slot name="header">
            <h3 class="title is-4">Ajouter un Utilisateur</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <form action="">
              <div class="field has-text-left">
                <label class="label">Nom* :</label>
                <div class="control">
                  <input
                    v-model.trim="signupForm.name"
                    type="text"
                    placeholder="Martin"
                    id="new-user-name"
                    required
                    class="input"
                    :class="isNameCorrect ? '' : 'is-danger'"
                  />
                  <div v-if="!isNameCorrect" class="error">
                    {{ nameError }}
                  </div>
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Prénom* :</label>
                <div class="control">
                  <input
                    v-model.trim="signupForm.forname"
                    class="input"
                    type="text"
                    placeholder="Thomas"
                    id="new-user-forname"
                    :class="isForNameCorrect ? '' : 'is-danger'"
                  />
                  <div v-if="!isForNameCorrect" class="error">
                    {{ fornameError }}
                  </div>
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Matricule* :</label>
                <div class="control">
                  <input
                    v-model.trim="signupForm.matricule"
                    class="input"
                    type="text"
                    placeholder="e.g KT30033"
                    id="new-user-matricule"
                    :class="isMatriculeCorrect ? '' : 'is-danger'"
                  />
                  <div v-if="!isMatriculeCorrect" class="error">
                    {{ matriculeError }}
                  </div>
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Role* :</label>
                <div class="control">
                  <label for="Administrateur"
                    ><input
                      type="radio"
                      id="role-admin"
                      :value="true"
                      v-model.trim="signupForm.role"
                    />
                    Administrateur</label
                  >
                  <br />
                  <label for="Emprunteur"
                    ><input
                      type="radio"
                      id="role-other"
                      :value="false"
                      v-model.trim="signupForm.role"
                      checked
                    />
                    Emprunteur</label
                  >
                  <br />
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Email* :</label>
                <div class="control">
                  <input
                    v-model.trim="signupForm.email"
                    class="input"
                    type="text"
                    placeholder="toto@you.com"
                    id="new-user-email"
                    required
                    :class="isEmailCorrect ? '' : 'is-danger'"
                  />
                  <div v-if="!isEmailCorrect" class="error">
                    {{ emailError }}
                  </div>
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Mot de passe* :</label>
                <div class="control">
                  <input
                    v-model.trim="signupForm.password"
                    class="input"
                    type="password"
                    placeholder="**************"
                    id="new-user-pw"
                    required
                    :class="isPassWordCorrect ? '' : 'is-danger'"
                  />
                  <div v-if="!isPassWordCorrect" class="error">
                    {{ passwordError }}
                  </div>
                </div>
              </div>
            </form>
          </slot>
        </div>

        <div class="has-text-left is-size-7">* : Champs Obligatoires</div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="control">
              <button class="button is-primary" @click="addUser()">
                Submit
              </button>
            </div>
          </slot>
        </div>
      </div>

      <div v-else class="modal-container">
        <Loading />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Utils/Loading";
import firebase from "@/firebase.js";
export default {
  name: "ajouterUser",
  components: { Loading },
  data() {
    return {
      signupForm: {
        name: "",
        forname: "",
        matricule: "",
        role: "",
        email: "",
        password: ""
      },
      isLoading: false,
      isNameCorrect: true,
      nameError:
        "Le nom choisi doit comprendre entre 1 et 30 caractères alphanumériques.",
      isForNameCorrect: true,
      fornameError:
        "Le prénom choisi doit comprendre entre 1 et 30 caractères alphanumériques.",
      isEmailCorrect: true,
      emailError: "Le format de l'email choisi est incorrect.",
      isMatriculeCorrect: true,
      matriculeError:
        "La matricule comprendre entre 1 et 7 caractères alphanumériques.",
      isPassWordCorrect: true,
      passwordError: "Votre mot de passe doit contenir au moins 6 caractères."
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async addUser() {
      let dDoc = null;
      let _this = this;

      let AlphaNumRegEx = new RegExp(
        "^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$"
      );
      let aNames = this.signupForm.name.match(AlphaNumRegEx);
      let aForNames = this.signupForm.forname.match(AlphaNumRegEx);
      let aMatricules = this.signupForm.matricule.match(AlphaNumRegEx);

      if (
        this.signupForm.name.length > 0 &&
        this.signupForm.name.length < 31 &&
        aNames != null
      ) {
        this.isNameCorrect = true;
      } else {
        this.isNameCorrect = false;
      }

      if (
        this.signupForm.forname.length > 0 &&
        this.signupForm.forname.length < 31 &&
        aForNames != null
      ) {
        this.isForNameCorrect = true;
      } else {
        this.isForNameCorrect = false;
      }

      if (!this.ValidateEmail(this.signupForm.email)) {
        this.isEmailCorrect = false;
      } else {
        this.isEmailCorrect = true;
      }

      if (
        this.signupForm.matricule.length > 0 &&
        this.signupForm.matricule.length < 31 &&
        aMatricules != null
      ) {
        this.isMatriculeCorrect = true;
      } else {
        this.isMatriculeCorrect = false;
      }

      if (this.signupForm.password.length > 5) {
        this.isPassWordCorrect = true;
      } else {
        this.isPassWordCorrect = false;
      }

      if (
        this.isNameCorrect &&
        this.isForNameCorrect &&
        this.isMatriculeCorrect &&
        this.isPassWordCorrect &&
        this.isEmailCorrect
      ) {
        firebase.db
          .collection("users")
          .where("email", "==", this.signupForm.email)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              (dDoc = doc.id), " => ", doc.data();
            });
            if (dDoc === null) {
              _this.isLoading = true;
              let adminPW = _this.$store.state.userProfile.password;
              let adminEdmail = _this.$store.state.userProfile.email;

              _this.$store.dispatch("logout");

              _this.$store
                .dispatch("signup", {
                  email: _this.signupForm.email,
                  password: _this.signupForm.password,
                  matricule: _this.signupForm.matricule,
                  role: _this.signupForm.role,
                  name: _this.signupForm.name,
                  forname: _this.signupForm.forname
                })
                .then(function() {
                  _this.relogAsAdmin(adminEdmail, adminPW);
                  _this.$store
                    .dispatch("getAllDocsFromCollection", "users")
                    .then(function() {
                      setTimeout(() => {
                        _this.isLoading = false;
                        _this.close();
                      }, 500);
                    });
                });
            } else {
              alert("Email déjà existant !");
            }
          });
      }
    },
    relogAsAdmin(email, pw) {
      this.$store.dispatch("logout");

      this.$store.dispatch("login", {
        email: email,
        password: pw
      });
    },
    ValidateEmail(email) {
      //RFC 2822 standard email validation
      var mailformat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return email.match(mailformat) && email.match(mailformat)[0] == email;
    }
  }
};
</script>

<style>
.modal-wrapper {
  background-color: rgba(214, 214, 214, 0.9);
}
.error {
  color: red;
}
</style>
