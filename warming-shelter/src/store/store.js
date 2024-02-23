import { createStore} from "vuex";
import { authModule} from "./AuthModule.js";

const store = createStore({
    modules: {
        authModule
    }
});

export default store;