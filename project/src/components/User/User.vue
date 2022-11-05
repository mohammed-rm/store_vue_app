<template>
  <div>
    <h1 class="title" v-if="!isLoading">
      Profil de {{ dUser.forname + " " + dUser.name }}
    </h1>
    <div class="columns" v-if="!isLoading">
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
              <label for="role"><strong> Rôle : </strong></label>
              <select v-if="dUser.isAdmin" name="role" id="role-selector">
                <option value="admin">Administrateur</option>
                <option value="user">Emprunteur</option>
              </select>
              <select v-else name="role" id="role-selector">
                <option value="user">Emprunteur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div class="column is-1"></div>
    </div>
    <div v-if="isLoading">
      <Loading />
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Utils/Loading";
import firebase from "@/firebase.js";

export default {
  name: "user",
  components: { Loading },
  props: {
    id: {
      type: String,
      default: ""
    },
    oDatas: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isLoading: false,
      dUser: this.oDatas != undefined ? this.oDatas : "",
      isEditting: false,
      paramId: this.id != undefined ? this.id : this.$route.params.id,
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
    getUser: async function() {
      let userDatas = await firebase.db
        .collection("users")
        .doc(this.paramId)
        .get();
      this.dUser = userDatas.data();
    },
    loadDocIfDirectSearch: async function(collection, id) {
      this.isLoading = true;
      if (this.oDatas == undefined) {
        let uniqDoc = firebase.db.collection(collection).doc(id);
        let dData = await uniqDoc.get();
        this.dUser = dData.data();
        console.log(this.dUser);

        if (this.dUser === undefined) {
          setTimeout(() => {
            this.isLoading = false;
            this.$router.push({
              name: "notFound"
            });
          }, 500);
        }
      } else {
        this.dUser = this.oDatas;
        console.log("toto");
      }

      this.isLoading = false;
    },
    SaveChanges: function() {
      let userUid = this.paramId;

      let AlphaNumRegEx = new RegExp(
        "^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$"
      );

      let sRole = document.getElementById("role-selector").value;
      let bRole = this.dUser.isAdmin;

      if (sRole != this.dUser.isAdmin) {
        if (
          confirm(
            "Vous êtes sur le point de changer le role de cet utilisateur. \nÊtes-vous sûr ?"
          )
        ) {
          bRole = sRole === "user" ? false : true;
        } else {
          bRole = this.dUser.isAdmin;
        }
      }

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

      console.log(bRole);

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
            matricule: document.getElementById("input-field-matricule").value,
            isAdmin: bRole
          });
        this.getUser();
        this.isEditting = !this.isEditting;
      }
    }
  },
  mounted() {
    this.loadDocIfDirectSearch("users", this.paramId);
  }
};
</script>

<style></style>
