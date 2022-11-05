<template>
  <div>
    <div class="columns" style="margin-top: 1em;">
      <div class="column is-1"></div>
      <listeMateriel class="column is-10" />
      <div class="column is-1">
        <div v-if="isUserAdmin()">
          <button id="myModal" class="button" @click="showModal = true">
            ➕
          </button>
          <!-- use the modal component, pass in the prop -->
          <ajouterMateriel v-if="showModal" @close="showModal = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import listeMateriel from "@/components/Materiel/ListeMateriel";
import ajouterMateriel from "@/components/Materiel/ajouterMateriel";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { listeMateriel, ajouterMateriel },
  data() {
    return {
      aMateriel: [],
      showModal: false
    };
  },
  computed: {
    ...mapState(["userProfile"])
  },
  methods: {
    isUserAdmin() {
      return (
        Object.keys(this.userProfile).length > 1 && this.userProfile.isAdmin
      );
    }
  },
  mounted() {}
};
</script>
