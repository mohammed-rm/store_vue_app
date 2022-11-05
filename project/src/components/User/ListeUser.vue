<template>
  <div>
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th style="border: none;"></th>
          <th><abbr title="Position">Index</abbr></th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Niveau d'accès</th>
          <th>Email</th>
          <th>Mot de passe</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="'user_' + index"
          class="is-clickable"
        >
          <td
            style="vertical-align:middle;border: none;"
            @click="deleteUser(user)"
          >
            <SpinnerDelete v-if="userProfile.email != user.email" />
          </td>
          <td @click="goToUser(user.id, user)">
            {{ index + 1 }}
          </td>
          <td @click="goToUser(user.id, user)">
            {{ user.name }}
          </td>
          <td @click="goToUser(user.id, user)">
            {{ user.forname }}
          </td>
          <td @click="goToUser(user.id, user)">
            <span>{{ user.isAdmin ? "Administrateur" : "Emprunteur" }}</span>
          </td>
          <td @click="goToUser(user.id, user)">
            {{ user.email }}
          </td>
          <td
            @click="goToUser(user.id, user)"
            @mouseover="hover = true"
            @mouseleave="hover = false"
          >
            <div v-if="hover">{{ user.password }}</div>
            <div v-else>**************</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "@/firebase.js";
import SpinnerDelete from "@/components/Utils/SpinnerDelete";
import { mapState } from "vuex";

export default {
  name: "ListeUser",
  props: {},
  components: { SpinnerDelete },
  data() {
    return {
      isAllDocumentLoading: false,
      hover: false
    };
  },
  computed: {
    ...mapState(["users", "userProfile"])
  },
  methods: {
    goToUser(keyDoc, docDatas) {
      let currentUser = firebase.auth.currentUser.uid;

      if (currentUser === keyDoc) {
        this.$router.push({
          name: "Profil",
          params: { oDatas: docDatas }
        });
      } else {
        this.$router.push({
          name: "User",
          params: { id: keyDoc, oDatas: docDatas }
        });
      }
    },
    showPW() {},
    deleteUser(user) {
      if (
        confirm(
          "Êtes-vous sûr de supprimer l'user suivant : " +
            user.name +
            " " +
            user.forname +
            "?"
        )
      ) {
        firebase.db
          .collection("users")
          .doc(user.id)
          .delete();
        this.$store.dispatch("getAllDocsFromCollection", "users");
      }
    }
  },
  mounted() {
    this.$store.dispatch("getAllDocsFromCollection", "users");
  }
};
</script>

<style></style>
