import { createStore} from "vuex";
import { authModule} from "./AuthModule.js";
import { guestModule } from "./GuestModule.js";
import { bunkModule } from "./BunkModule.js";

const store = createStore({
    modules: {
        authModule,
        guestModule,
        bunkModule
    }
});

export default store;