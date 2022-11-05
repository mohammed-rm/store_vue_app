<template>
  <div>
    <div class="columns">
      <div class="column is-1"></div>
      <div
        class="column is-4"
        :style="doc.photo == '' ? 'border: 1px solid black; ' : ''"
      >
        <div>
          <a v-if="doc.photo != ''" :href="doc.photo">
            <v-img :src="doc.photo" alt=""> </v-img>
          </a>
          <div v-else>Pas d'image</div>
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
          <div class="has-text-left">
            <strong>Statut : </strong>
            <span v-if="isMaterielAvailable(doc.reservedDates)"
              >Disponible ✅</span
            >
            <span v-else>Indisponible 🚫</span>
          </div>
          <div v-if="!isEditting">
            <div class="has-text-left">
              <strong>Téléphone : </strong>
              <span>{{ doc.nom }}</span>
            </div>
            <div class="has-text-left">
              <strong>Référence : </strong>
              <span>{{ doc.ref }}</span>
            </div>
            <div class="has-text-left">
              <strong>Version : </strong>
              <span>{{ doc.version }}</span>
            </div>
            <div class="has-text-left">
              <strong>N° Téléphone : </strong>
              <span>+33 (0){{ doc.tel }}</span>
            </div>
          </div>
          <div v-else>
            <div class="has-text-left">
              <strong>Téléphone : </strong>
              <input
                id="input-field-name"
                class="input is-small"
                type="text"
                :value="doc.nom"
                :class="isFormNameCorrect ? '' : 'is-danger'"
              />
              <div v-if="!isFormNameCorrect" class="error">
                {{ formNameError }}
              </div>
            </div>
            <div class="has-text-left">
              <strong>Référence : </strong>
              <input
                id="input-field-ref"
                class="input is-small"
                type="text"
                :value="doc.ref"
                :class="isFormRefCorrect ? '' : 'is-danger'"
              />
              <div v-if="!isFormRefCorrect" class="error">
                {{ formRefError }}
              </div>
            </div>
            <div class="has-text-left">
              <strong>Version : </strong>
              <input
                id="input-field-version"
                class="input is-small"
                type="text"
                :value="doc.version"
                :class="isFormVersionCorrect ? '' : 'is-danger'"
              />
              <div v-if="!isFormVersionCorrect" class="error">
                {{ formVersionError }}
              </div>
            </div>
            <div class="has-text-left">
              <strong>N° Téléphone : </strong>
              <input
                id="input-field-tel"
                class="input is-small"
                type="text"
                :value="'0' + doc.tel"
              />
            </div>

            <div class="has-text-left">
              <strong>Commentaire : </strong>
              <input
                id="input-field-comment"
                class="input is-small"
                type="text"
                :value="doc.comment"
              />
            </div>
          </div>
          <br />
          <div class="has-text-left">
            <button class="button" @click="isReserving = !isReserving">
              🗓️Réserver maintenant !🗓️
            </button>
          </div>
          <div v-if="isReserving">
            <v-row>
              <v-text-field
                v-model="dateRangeText"
                color="blue"
                label=" Sélectionner une période d'emprunt sur un laps de temps défini. Merci de votre compréhension. Thomas et Quentin"
                prepend-icon="mdi-calendar"
                readonly
              ></v-text-field>
            </v-row>
            <v-row>
              <v-date-picker
                v-model="dates"
                :dark="true"
                first-day-of-week="1"
                :reactive="true"
                range
                :allowed-dates="allowedDates"
                class="mt-4"
                min="2020-12-01"
                max=""
              ></v-date-picker>
            </v-row>
            <v-row>
              <button class="button" id="B_Valid" @click="confirmDate()">
                Valider
              </button>
            </v-row>
          </div>
        </div>
      </div>
      <div class="column is-1"></div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase.js";
import moment from "moment";

export default {
  name: "Materiel",
  props: {
    id: {
      type: String,
      default: "",
      required: false
    },
    oDatas: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      dates: [],
      aDates: ["2020-12-20"],
      isReserving: false,
      paramId: this.id != undefined ? this.id : this.$route.params.id,
      doc: "",
      isEditting: false,
      oData: {
        ref: "",
        version: "",
        tel: "",
        comment: "",
        nom: ""
      },
      isFormNameCorrect: true,
      formNameError: "Erreur : le nom que vous avez renseigné est incorrect.",
      isFormRefCorrect: true,
      formRefError:
        "Erreur : la référence que vous avez renseigné est incorrect.",
      isFormVersionCorrect: true,
      formVersionError:
        "Erreur : la version que vous avez renseigné est incorrect."
    };
  },
  computed: {
    dateRangeText() {
      let dateToReturn = "";
      if (this.dates[0] != "" && this.dates[1] != "")
        dateToReturn = this.dates.join(" au ");
      return dateToReturn;
    }
  },
  methods: {
    // https://stackoverflow.com/questions/50488703/vuetify-js-datepicker-provide-array-of-allowed-dates
    allowedDates: function(val) {
      let alreadySelected = false;
      this.doc.reservedDates.forEach(element => {
        let SplittedDates = element.split("~");
        if (
          moment(val).isBetween(
            SplittedDates[0],
            SplittedDates[1],
            undefined,
            "[]"
          )
        )
          alreadySelected = true;
      });
      //date avant ajd en gris
      //val>ajd
      if (!alreadySelected) {
        let today = new Date().toISOString().slice(0, 10);
        if (moment(val).isBefore(today)) {
          alreadySelected = true;
        }
      }
      if (alreadySelected) return 0;
      else return -1;
    },
    loadDocIfDirectSearch: async function(collection, id) {
      if (this.oDatas == undefined) {
        let uniqDoc = firebase.db.collection(collection).doc(id);
        let dData = await uniqDoc.get();
        this.doc = dData.data();
      } else {
        this.doc = this.oDatas;
      }
    },
    loadMateriel: async function() {
      let uniqDoc = firebase.db
        .collection("materiel")
        .doc(this.$route.params.id);
      let dData = await uniqDoc.get();
      this.doc = dData.data();
    },
    SaveChanges: function() {
      this.oData.nom = document.getElementById("input-field-name").value;
      this.oData.comment = document.getElementById("input-field-comment").value;
      this.oData.ref = document.getElementById("input-field-ref").value;
      this.oData.tel = parseInt(
        document.getElementById("input-field-tel").value
      );
      this.oData.version = document.getElementById("input-field-version").value;

      let AlphaNumRegEx = new RegExp(
        "^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$"
      );
      let versionRegEx = new RegExp("[0-9]{3}");

      let aVersions = this.oData.version.match(AlphaNumRegEx);
      let aNames = this.oData.nom.match(AlphaNumRegEx);
      let sRef = this.oData.ref.substring(2);
      let aRefs = sRef.match(versionRegEx);

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

      if (
        (this.oData.ref.startsWith("AN") ||
          this.oData.ref.startsWith("XX") ||
          this.oData.ref.startsWith("AP")) &&
        aRefs[0] == sRef
      ) {
        this.isFormRefCorrect = true;
      } else {
        this.isFormRefCorrect = false;
      }
      if (
        this.isFormNameCorrect &&
        this.isFormRefCorrect &&
        this.isFormVersionCorrect
      ) {
        firebase.db
          .collection("materiel")
          .doc(this.paramId)
          .update({
            nom: document.getElementById("input-field-name").value,
            tel: parseInt(document.getElementById("input-field-tel").value),
            ref: document.getElementById("input-field-ref").value,
            version: document.getElementById("input-field-version").value,
            comment: document.getElementById("input-field-comment").value
          });
        this.loadMateriel();
        this.isEditting = !this.isEditting;
      }
    },
    confirmDate() {
      if (
        this.dates.length > 1 &&
        this.dates[0] != null &&
        this.dates[0] != undefined &&
        this.dates[1] != null &&
        this.dates[1]
      ) {
        this.loadMateriel();
        let isPossible = true;
        this.doc.reservedDates.forEach(element => {
          let SplittedDates = element.split("~");
          //if(moment(val).isBetween(SplittedDates[0],SplittedDates[1],undefined,"[]"))
          if (
            moment(SplittedDates[0]).isBetween(
              this.dates[0],
              this.dates[1],
              undefined,
              "[]"
            ) ||
            moment(SplittedDates[1]).isBetween(
              this.dates[0],
              this.dates[1],
              undefined,
              "[]"
            )
          ) {
            isPossible = false;
          }
        });
        if (isPossible) {
          if (
            confirm(
              "Êtes-vous sur de vouloir réserver la période du " +
                this.dates[0] +
                " au " +
                this.dates[1] +
                " ?"
            )
          ) {
            this.doc.reservedDates.push(this.dates.join("~"));
            firebase.db
              .collection("materiel")
              .doc(this.paramId)
              .update({
                reservedDates: this.doc.reservedDates
              });
            alert("Votre date a bien été réservée.");
          }
        } else {
          alert(
            "Cette appareil n'est pas disponible sur la période du " +
              this.dates[0] +
              " au " +
              this.dates[1] +
              ", veuillez en sélectionner une autre."
          );
        }
        this.loadMateriel();
      } else {
        alert(
          "Une des deux dates renseignée n'est pas possible ou n'est pas définie."
        );
      }
    },
    isMaterielAvailable(aDates) {
      let isMaterielAvailable = false;

      if (aDates != undefined && aDates.length > 0) {
        aDates.forEach(d => {
          let aLocalDates = d.split("~");
          if (moment().isBetween(aLocalDates[0], aLocalDates[1])) {
            isMaterielAvailable = false;
          } else {
            isMaterielAvailable = true;
          }
        });
      } else {
        isMaterielAvailable = true;
      }

      return isMaterielAvailable;
    }
  },
  mounted() {
    this.loadDocIfDirectSearch("materiel", this.paramId);
  }
};
</script>

<style>
.v-date-picker-table .v-btn.v-btn--active {
  color: black;
  background-color: #44d451 !important;
}
.columns {
  margin-top: 5px;
  margin-bottom: 10px !important;
}
</style>
