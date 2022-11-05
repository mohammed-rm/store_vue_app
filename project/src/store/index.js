import Vue from "vue";
import Vuex from "vuex";
import firebase from "../firebase.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    materiels: [],
    users: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setMaterialsData(state, val) {
      state.materiels = val;
    },
    setUsersData(state, val) {
      state.users = val;
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await firebase.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );
      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await firebase.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user object in userCollections
      await firebase.db
        .collection("users")
        .doc(user.uid)
        .set({
          name: form.name,
          forname: form.forname,
          isAdmin: form.role,
          email: form.email,
          password: form.password,
          matricule: form.matricule
        });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await firebase.db
        .collection("users")
        .doc(user.uid)
        .get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());
    },
    async logout({ commit }) {
      // log user out
      await firebase.auth.signOut();

      // clear user data from state
      commit("setUserProfile", {});
    },
    async getAllDocsFromCollection({ commit }, collection) {
      const aDocs = await firebase.db.collection(collection).get();
      if (collection == "materiel") {
        commit(
          "setMaterialsData",
          aDocs.docs.map(d => {
            return { id: d.id, ...d.data() };
          })
        );
      } else if (collection == "users") {
        commit(
          "setUsersData",
          aDocs.docs.map(d => {
            return { id: d.id, ...d.data() };
          })
        );
      }
    }
  }
});

export default store;
