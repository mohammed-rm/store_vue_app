<template>
  <div>
    <h1 class="title">Mon profil</h1>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-4">
        <div>
          <span style="font-size: 15em;"> 👤</span><br /><span
            >Pas d'image enregistrée.</span
          >
        </div>
      </div>
      <div class="column is-6">
        <div class="has-text-right" style="padding-top: 1em;">
          <button
            class="button is-small"
            v-if="!isEditting"
            @click="isEditting = !isEditting"
          >
            Edit ✍️
          </button>
          <button class="button is-small" v-else @click="SaveChanges()">
            Save 💾
          </button>
        </div>
        <div style="padding-top: 5em;">
          <div v-if="!isEditting">
            <div class="has-text-left">
              <strong>Nom : </strong>
              <span>{{ dUser.name }}</span>
            </div>
            <div class="has-text-left">
              <strong>Prénom : </strong>
              <span>{{ dUser.forname }}</span>
            </div>
            <div class="has-text-left">
              <strong>Email : </strong>
              <span>{{ dUser.email }}</span>
            </div>
            <div class="has-text-left">
              <strong>Matricule : </strong>
              <span>{{ dUser.matricule }}</span>
            </div>
            <div class="has-text-left">
              <strong>Rôle : </strong>
              <span>{{ dUser.isAdmin ? "Administrateur" : "Emprunteur" }}</span>
            </div>
          </div>
          <div v-else>
            <div class="has-text-left">
              <strong>Nom : </strong>
              <input
                id="input-field-name"
                class="input is-small"
                type="text"
                :value="dUser.name"
                :class="isFormNameCorrect ? '' : 'is-danger'"
              />
              <div v-if="!isFormNameCorrect" class="error">
                {{ formNameError }}
              </div>
            </div>
            <div class="has-text-left">
              <strong>Prénom : </strong>
              <input
                id="input-field-forname"
                class="input is-small"
                type="text"
                :value="dUser.forname"
                :class="isFormFornameCorrect ? '' : 'is-danger'"
              />
              <div v-if="!isFormFornameCorrect" class="error">
                {{ formFornameError }}
              </div>
            </div>
            <div class="has-text-left">
              <strong>Email : </strong>
              <span>{{ dUser.email }}</span>
            </div>
            <div class="has-text-left">
              <strong>Matricule : </strong>
              <input
                id="input-field-matricule"
                class="input is-small"
                type="text"
                :value="dUser.matricule"
                :class="isFormMatriculeCorrect ? '' : 'is-danger'"
              />
              <div v-if="!isFormMatriculeCorrect" class="error">
                {{ formMatriculeError }}
              </div>
            </div>
            <div class="has-text-left">
              <strong>Rôle : </strong>
              <span>{{ dUser.isAdmin ? "Administrateur" : "Emprunteur" }}</span>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div class="column is-1"></div>
    </div>
    <button class="button is-danger" @click="verifDeletion()">
      Supprimer le compte
    </button>
  </div>
</template>

<script>
import firebase from "@/firebase.js";

export default {
  name: "Profil",
  components: {},
  props: {
    oDatas: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      dUser: this.oDatas != undefined ? this.oDatas : "",
      idCurrentUser: "",
      isEditting: false,
      isFormNameCorrect: true,
      formNameError: "Erreur : le nom que vous avez renseigné est incorrect.",
      isFormFornameCorrect: true,
      formFornameError:
        "Erreur : la référence que vous avez renseigné est incorrect.",
      isFormMatriculeCorrect: true,
      formMatriculeError:
        "Erreur : la version que vous avez renseigné est incorrect."
    };
  },
  computed: {},
  methods: {
    loadDocIfDirectSearch: async function() {
      let userId = firebase.auth.currentUser.uid;
      if (this.oDatas == undefined) {
        let uniqDoc = firebase.db.collection("users").doc(userId);
        let dData = await uniqDoc.get();
        this.dUser = dData.data();
      } else {
        this.dUser = this.oDatas;
      }
    },
    getUser: async function() {
      let userId = firebase.auth.currentUser;
      let userDatas = await firebase.db
        .collection("users")
        .doc(userId.uid)
        .get();

      this.dUser = userDatas.data();
    },
    verifDeletion() {
      if (
        confirm(
          "Etes-vous sur de supprimer votre compte ? \n Cette action est irreversible."
        )
      ) {
        this.deleteAccount();
      }
    },
    deleteAccount() {
      let userUid = firebase.auth.currentUser.uid;
      let _this = this;

      firebase.db
        .collection("users")
        .doc(userUid)
        .delete()
        .then(function() {
          firebase.auth.currentUser
            .delete()
            .then(() => {
              _this.$store.dispatch("logout");
              _this.$router.push("/login");
              alert("Votre compte a bien été supprimé");
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    SaveChanges: function() {
      let userUid = firebase.auth.currentUser.uid;

      let AlphaNumRegEx = new RegExp(
        "^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$"
      );
      let sName = document.getElementById("input-field-name").value;
      let sForname = document.getElementById("input-field-forname").value;
      let sMatricule = document.getElementById("input-field-matricule").value;

      let aNames = sName.match(AlphaNumRegEx);
      let aForNames = sForname.match(AlphaNumRegEx);
      let aMatricules = sMatricule.match(AlphaNumRegEx);

      if (sName.length > 0 && sName.length < 31 && aNames != null) {
        this.isFormNameCorrect = true;
      } else {
        this.isFormNameCorrect = false;
      }

      if (sForname.length > 0 && sForname.length < 31 && aForNames != null) {
        this.isFormFornameCorrect = true;
      } else {
        this.isFormFornameCorrect = false;
      }

      if (
        sMatricule.length > 0 &&
        sMatricule.length < 31 &&
        aMatricules != null
      ) {
        this.isFormMatriculeCorrect = true;
      } else {
        this.isFormMatriculeCorrect = false;
      }

      if (
        this.isFormNameCorrect &&
        this.isFormFornameCorrect &&
        this.isFormMatriculeCorrect
      ) {
        firebase.db
          .collection("users")
          .doc(userUid)
          .update({
            name: document.getElementById("input-field-name").value,
            forname: document.getElementById("input-field-forname").value,
            matricule: document.getElementById("input-field-matricule").value
          });
        this.getUser();
        this.isEditting = !this.isEditting;
      }
    }
  },
  mounted() {
    this.loadDocIfDirectSearch();
  }
};
</script>

<style></style>
