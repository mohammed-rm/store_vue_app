<template>
  <div class="liste-materiel">
    <Loading v-show="isAllDocumentLoading" />
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th v-if="userProfile.isAdmin" style="border: none;"></th>
          <th><abbr title="Position">Index</abbr></th>
          <th>Nom</th>
          <th>Référence</th>
          <th>N° Téléphone</th>
          <th>Version</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(materiel, index) in materiels"
          :key="index"
          :class="'is-clickable row_' + index"
        >
          <td
            v-if="userProfile.isAdmin"
            style="vertical-align:middle;border: none;"
            @click="deletionVerif(materiel.id, materiel.image_name)"
          >
            <SpinnerDelete />
          </td>
          <td
            @click="goToMaterial(materiel.id, materiel)"
            style="vertical-align:middle;"
          >
            {{ index + 1 }}
            <span
              v-if="isMaterielAvailable(materiel.reservedDates)"
              class="tag is-success"
              >Disponible</span
            >
            <span v-else class="tag is-danger">Indisponible</span>
          </td>
          <td
            @click="goToMaterial(materiel.id, materiel)"
            style="vertical-align:middle;"
          >
            {{ materiel.nom }}
          </td>
          <td
            @click="goToMaterial(materiel.id, materiel)"
            style="vertical-align:middle;"
          >
            {{ materiel.ref }}
          </td>
          <td
            @click="goToMaterial(materiel.id, materiel)"
            style="vertical-align:middle;"
          >
            {{ !isNaN(materiel.tel) ? "+33(0) " + materiel.tel : "Indéfini" }}
          </td>
          <td
            @click="goToMaterial(materiel.id, materiel)"
            style="vertical-align:middle;"
          >
            {{
              materiel.version.startsWith("V")
                ? materiel.version
                : "V" + materiel.version
            }}
          </td>
          <td
            @click="goToMaterial(materiel.id, materiel)"
            class="is-clickable"
            style="vertical-align:middle;"
          >
            <a v-if="materiel.photo != ''" :href="materiel.photo">
              <v-img
                :src="materiel.photo"
                alt=""
                contain
                height="66px"
                width="100px"
              >
              </v-img>
            </a>
            <span v-else>Pas d'image.</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "@/firebase.js";
import Loading from "@/components/Utils/Loading";
import SpinnerDelete from "@/components/Utils/SpinnerDelete";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "ListeMateriel",
  props: {},
  components: { Loading, SpinnerDelete },
  data() {
    return {
      isAllDocumentLoading: false
    };
  },
  computed: {
    ...mapState(["userProfile", "materiels"])
  },
  methods: {
    goToMaterial(keyDoc, docDatas) {
      this.$router.push({
        name: "Materiel",
        params: { id: keyDoc, oDatas: docDatas }
      });
    },
    deletionVerif(keyDoc, keyImage) {
      if (confirm("Etes-vous sûr de supprimer ce matériel ?")) {
        this.deleteItem(keyDoc, keyImage);
      }
    },
    deleteItem(keyDoc, keyImage) {
      if (keyImage != "") {
        let storageRef = firebase.storage.ref("Photo_Materiel/" + keyImage);
        firebase.db
          .collection("materiel")
          .doc(keyDoc)
          .delete()
          .then(function() {
            storageRef
              .delete()
              .then(function() {
                alert("Document successfully deleted!");
              })
              .catch(function(error) {
                console.log("Error removing document: ", error);
              });
          })
          .catch(function(error) {
            console.log("Error removing document: ", error);
          });
      } else {
        firebase.db
          .collection("materiel")
          .doc(keyDoc)
          .delete();
      }

      this.$store.dispatch("getAllDocsFromCollection", "materiel");
    },
    isMaterielAvailable(aDates) {
      let isMaterielAvailable = false;

      if (aDates.length > 0) {
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
    this.isAllDocumentLoading = true;
    this.$store.dispatch("getAllDocsFromCollection", "materiel");
    this.isAllDocumentLoading = false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
