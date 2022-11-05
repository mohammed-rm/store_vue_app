/* test for connection from firebase that we should mock */

import { shallowMount } from "@vue/test-utils";
import Login from "@/views/LogIn.vue";
import LogIn from "@/views/LogIn";

describe("LogIn.vue", () => {
    it("succefull connection as an admin", () => {
        const wrapper = shallowMount(LogIn);
        expect(wrapper.find("#connection-button").text()).toBe("Se connecter");
    });
});
