<template>
  <div>
    <div class="columns" style="margin-top: 1em;">
      <div class="column is-1"></div>
      <div class="column is-10">
        <listeUser />
      </div>
      <div class="column is-1">
        <button id="myModal" class="button" @click="showModal = true">
          ➕
        </button>
        <!-- use the modal component, pass in the prop -->
        <ajouterUser v-if="showModal" @close="showModal = false" />
      </div>
    </div>
  </div>
</template>

<script>
import listeUser from "@/components/User/ListeUser";
import ajouterUser from "@/components/User/ajouterUser";
export default {
  name: "Admin",
  components: { listeUser, ajouterUser },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style></style>
