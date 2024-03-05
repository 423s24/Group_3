import { createStore} from "vuex";
import { authModule} from "./AuthModule.js";
import { guestModule } from "./GuestModule.js";

const store = createStore({
    modules: {
        authModule,
        guestModule
    }
});

export default store;