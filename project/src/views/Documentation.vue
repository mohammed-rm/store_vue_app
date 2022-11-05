<template>
  <div>
    <div class="outer-div">
      <div class="inner-div">
        <a
          class="tag is-medium"
          :class="showExpressionBesoin ? 'is-info' : 'is-link is-light'"
          @click="showPDF(1)"
          >Expression des besoins</a
        >
        |
        <a
          class="tag is-medium"
          :class="showCahierSpecif ? 'is-info' : 'is-link is-light'"
          @click="showPDF(2)"
          >Cahier de spécification</a
        >
        |
        <a
          class="tag is-medium"
          :class="showCahierRecette ? 'is-info' : 'is-link is-light'"
          @click="showPDF(3)"
          >Cahier de recette</a
        >
        |
        <a
          class="tag is-medium"
          :class="showCahierTest ? 'is-info' : 'is-link is-light'"
          @click="showPDF(4)"
          >Cahier de tests</a
        >
      </div>
    </div>
    <div>
      <iframe
        v-show="showExpressionBesoin"
        src="https://firebasestorage.googleapis.com/v0/b/polytech-test-and-security.appspot.com/o/T%26S_Expression%20de%20besoins%20v1.1.pdf?alt=media&token=5267646d-e757-4c51-a595-4d8712f62cac"
        width="100%"
        height="680px"
        style="border:solid black 1px"
      ></iframe>
      <iframe
        v-show="showCahierSpecif"
        src="https://firebasestorage.googleapis.com/v0/b/polytech-test-and-security.appspot.com/o/Spec_TestSecurite_v1.pdf?alt=media&token=9ce97dac-ba3b-4abb-9d04-aaa8cdb819bd"
        width="100%"
        height="680px"
        style="border:solid black 1px"
      ></iframe>
      <iframe
        v-if="showCahierRecette"
        src="https://firebasestorage.googleapis.com/v0/b/polytech-test-and-security.appspot.com/o/Cahier%20de%20recette.pdf?alt=media&token=f04f0020-4021-45e1-90c8-97ede8ea1047"
        width="100%"
        height="680px"
        style="border:solid black 1px"
      ></iframe>
      <iframe
        v-if="showCahierTest"
        src="https://firebasestorage.googleapis.com/v0/b/polytech-test-and-security.appspot.com/o/Cahier_tests.pdf?alt=media&token=6652c77c-d4d7-4357-b52e-c4921cc18e20"
        width="100%"
        height="680px"
        style="border:solid black 1px"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "Documentation",
  props: {},
  data() {
    return {
      showExpressionBesoin: true,
      showCahierSpecif: false,
      showCahierRecette: false,
      showCahierTest: false
    };
  },
  methods: {
    showPDF(iPage) {
      if (iPage === 1) {
        this.showExpressionBesoin = true;
        this.showCahierSpecif = false;
        this.showCahierRecette = false;
        this.showCahierTest = false;
      } else if (iPage === 2) {
        this.showExpressionBesoin = false;
        this.showCahierSpecif = true;
        this.showCahierRecette = false;
        this.showCahierTest = false;
      } else if (iPage === 3) {
        this.showExpressionBesoin = false;
        this.showCahierSpecif = false;
        this.showCahierRecette = true;
        this.showCahierTest = false;
      } else {
        this.showExpressionBesoin = false;
        this.showCahierSpecif = false;
        this.showCahierRecette = false;
        this.showCahierTest = true;
      }
    }
  }
};
</script>

<style>
.inner-div {
  display: inline-block;
  border-radius: 3px;
  margin: 0.5em auto;
}
</style>
