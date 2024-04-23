import { createStore} from "vuex";
import { authModule} from "./AuthModule.js";
import { guestModule } from "./GuestModule.js";
import { bunkModule } from "./BunkModule.js";
import { lockerModule } from "./LockerModule.js";

const store = createStore({
    modules: {
        authModule,
        guestModule,
        bunkModule,
        lockerModule
    }
});

export default store;