import { createStore} from "vuex";
import { userModule} from "./UserModule.js";
import { guestModule } from "./GuestModule.js";
import { bunkModule } from "./BunkModule.js";
import { lockerModule } from "./LockerModule.js";

const store = createStore({
    modules: {
        userModule,
        guestModule,
        bunkModule,
        lockerModule
    }
});

export default store;