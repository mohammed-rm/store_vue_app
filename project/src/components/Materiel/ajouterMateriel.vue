<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <span class="close" @click="close()">&times;</span>
        <div class="modal-header">
          <slot name="header">
            <h3 class="title is-4">Ajouter un matériel</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <form action="">
              <div class="field has-text-left">
                <label class="label">Nom* :</label>
                <div class="control">
                  <input
                    type="text"
                    placeholder="e.g iPhone 12"
                    id="new-material-name"
                    required
                    class="input"
                    :class="isFormNameCorrect ? '' : 'is-danger'"
                  />
                  <div v-if="!isFormNameCorrect" class="error">
                    {{ formNameError }}
                  </div>
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">N° Téléphone :</label>
                <div class="control">
                  <input
                    class="input"
                    type="integer"
                    placeholder="e.g 0611223344"
                    id="new-material-tel"
                  />
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Version* :</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="e.g V8.6"
                    id="new-material-version"
                    required
                    :class="isFormVersionCorrect ? '' : 'is-danger'"
                  />
                  <div v-if="!isFormVersionCorrect" class="error">
                    {{ formVersionError }}
                  </div>
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label" for="marque">Référence* :</label>
                <div class="field">
                  <div class="control">
                    <select
                      name="reference"
                      id="ref-select"
                      class="select is-info"
                    >
                      <option value="">--Sélectionnez une référence--</option>
                      <option value="apple">Apple</option>
                      <option value="android">Android</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Importer un image :</label>
                <div>
                  <v-btn @click="click1">...</v-btn>
                  <input
                    type="file"
                    ref="input1"
                    style="display: none"
                    @change="previewImage"
                    accept="image/*"
                  />
                </div>
                <div v-if="imageData != null">
                  <img class="preview" height="268" width="356" :src="img1" />
                  <br />
                </div>
              </div>
            </form>
          </slot>
        </div>

        <div class="has-text-left is-size-7">* : Champs Obligatoires</div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="control">
              <button class="button is-primary" @click="createDoc()">
                Submit
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase.js";
import { mapState } from "vuex";

export default {
  name: "AjouterMateriel",
  props: {},
  data() {
    return {
      caption: "",
      img1: "",
      imageData: null,
      oData: {
        nom: "",
        version: "",
        ref: "",
        tel: "",
        image_name: "",
        photo: "",
        available: true
      },
      isFormNameCorrect: true,
      formNameError: "Erreur : le nom que vous avez renseigné est incorrect.",
      isFormVersionCorrect: true,
      formVersionError:
        "Erreur : la version que vous avez renseigné est incorrect."
    };
  },
  computed: {
    ...mapState(["materiels"])
  },
  methods: {
    createDoc: async function() {
      let sRef = document.getElementById("ref-select").value;
      let sChoice;

      if (sRef == "android") {
        sChoice = "AN";
      } else if (sRef == "apple") {
        sChoice = "AP";
      } else {
        sChoice = "XX";
      }

      let aRefs = [];

      this.materiels.forEach(m => {
        if (m.ref.startsWith(sChoice)) {
          aRefs.push(parseInt(m.ref.substring(2)));
        }
      });

      let sNewRef;

      if (aRefs.length > 0) {
        let iMaxRef = Math.max(...aRefs);
        let iNewRef = iMaxRef + 1;
        let sNewRefNumber = iNewRef.toString();

        if (sNewRefNumber.length > 2) {
          sNewRef = sChoice + sNewRefNumber;
        } else {
          if (sNewRefNumber.length == 1) {
            sNewRef = sChoice + "00" + sNewRefNumber;
          } else {
            sNewRef = sChoice + "0" + sNewRefNumber;
          }
        }
      } else {
        sNewRef = sChoice + "000";
      }

      this.oData.nom = document.getElementById("new-material-name").value;
      this.oData.ref = sNewRef;
      this.oData.tel = parseInt(
        document.getElementById("new-material-tel").value
      );
      this.oData.version = document.getElementById(
        "new-material-version"
      ).value;
      this.oData.reservedDates = [];

      let AlphaNumRegEx = new RegExp(
        "^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$"
      );

      let aVersions = this.oData.version.match(AlphaNumRegEx);
      let aNames = this.oData.nom.match(AlphaNumRegEx);

      if (
        this.oData.nom.length >= 1 &&
        this.oData.nom.length < 31 &&
        typeof this.oData.nom === "string" &&
        aNames != null
      ) {
        this.isFormNameCorrect = true;
      } else {
        this.isFormNameCorrect = false;
      }

      if (
        this.oData.version.length >= 3 &&
        this.oData.version.length <= 15 &&
        typeof this.oData.nom === "string" &&
        aVersions != null
      ) {
        this.isFormVersionCorrect = true;
      } else {
        this.isFormVersionCorrect = false;
      }

      if (this.isFormNameCorrect && this.isFormVersionCorrect) {
        await firebase.db
          .collection("materiel")
          .doc()
          .set(this.oData);
        this.$emit("close");
        this.$store.dispatch("getAllDocsFromCollection", "materiel");
        alert("Nouveau matériel ajouté dans la base !");
      }
    },

    click1() {
      this.$refs.input1.click();
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.img1 = null;
      this.oData.image_name = this.imageData.name;
      let storageRef = firebase.storage
        .ref("Photo_Materiel/" + `${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.img1 = url;
            this.oData.photo = url;
          });
        }
      );
    },
    close() {
      if (this.imageData != null) {
        let storageRef = firebase.storage.ref(
          "Photo_Materiel/" + `${this.imageData.name}`
        );
        storageRef
          .delete()
          .then(function() {})
          .catch(function(err) {
            console.log(err);
          });
      }
      this.$emit("close");
    }
  },
  mounted() {}
};
</script>

<style>
.error {
  color: red;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  height: 60vh;
  overflow-y: auto;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
