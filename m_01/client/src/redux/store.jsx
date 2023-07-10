import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./features/userSlice"
import themeModeSlice from "./features/themeModeSlice"
import appStateSlice from "./features/appStateSlice"

const store=configureStore({
    reducer:{
        user:userSlice,
        themeMode:themeModeSlice,
        appState:appStateSlice,
    }
})

export default store