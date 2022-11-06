import Vue from "vue";
import VueRouter from "vue-router";
import LogIn from "@/views/LogIn";
import {createLocalVue, shallowMount} from "@vue/test-utils";
import firebase from "firebase/app";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("LogIn.vue", () => {
    const user = {
        email: "test@gmail.com",
        password: "test1234"
    }

    jest.mock("firebase/app", () => ({
        auth: {
            signInWithEmailAndPassword: jest.fn(() => Promise.resolve({user}))
        }
    }));

    let wrapper;
    let actions;
    let store;

    beforeEach(() => {
        actions = {
            login: jest.fn()
        };
        store = new Vuex.Store({
            actions
        });
        wrapper = shallowMount(LogIn, {store, localVue});
    });

    it("should call login action when login button is clicked", () => {
        wrapper.find("button").trigger("click");
        expect(actions.login).toHaveBeenCalled();
        expect(firebase.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(user.email, user.password);
    });
});


/*const localVue = createLocalVue();
localVue.use(Vuex);
describe("LogIn.vue", () => {
    let actions;
    let store;

    beforeEach(() => {
        actions = {
            login: jest.fn()
        };
        store = new Vuex.Store({
            actions
        });
    });
    // mocking store dispatch and router push
    const $store = {
        dispatch: jest.fn()
    };
    const $router = {
        push: jest.fn()
    }
    // give the data to dispatch
    const data = {
        email: "junior@gmail.com",
        password: "123456"
    }
    // test if the dispatch is called
    it("should call store dispatch when LogIn is called", () => {
        const wrapper = shallowMount(LogIn, {
            mocks: {
                $store,
                $router
            },
            localVue,
            store
        });
        wrapper.vm.login(data);
        expect($store.dispatch).toHaveBeenCalled();
    });
    it("dispatches 'login' when email and password are valid", () => {
        const wrapper = shallowMount(LogIn, {store, localVue});
        const email = "junior@gmail.com";
        const password = "junior";

        wrapper.find("#email1").setValue(email);
        wrapper.find("#password1").setValue(password);

        wrapper.find("#connection-button").trigger("click");

        expect(actions.login).toHaveBeenCalled();
    });
});*/

/*describe("LogIn.vue : Connection", () => {

    it("has the required elements displayed", () => {
        const wrapper = shallowMount(LogIn);
        const button = wrapper.find("#connection-button");
        expect(wrapper.find("#email1").exists()).toBe(true);
        expect(wrapper.find("#password1").exists()).toBe(true);
        expect(button.exists()).toBe(true)
        expect(button.text()).toBe("Se connecter")
    });

    it("should connect the user if the credentials are correct and redirects to the home page", async () => {
        const $router = {push: jest.fn()}
        const $store = {dispatch: jest.fn()}

        const data = {
            email: "junior@gmail.com",
            password: "junior"
        }

        const wrapper = shallowMount(LogIn, {
            mocks: {
                $router,
                $store: {
                    dispatch: () => {
                        data: "login"
                    }
                }
            }
        });

        wrapper.setData(data);
        wrapper.find("#connection-button").trigger("click");
        await wrapper.vm.$nextTick();
        expect($router.push).toHaveBeenCalledWith({name: "Home"});
    });
});*/
