import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./features/userSlice"
import themeModeSlice from "./features/themeModeSlice"
import appStateSlice from "./features/appStateSlice"
import authModalSlice from "./features/authModalSlice"
import globalLoadingSlice from "./features/globalLoadingSlice"

const store=configureStore({
    reducer:{
        user:userSlice,
        themeMode:themeModeSlice,
        appState:appStateSlice,
        authModal:authModalSlice,
        globalLoading:globalLoadingSlice,

    }
})

export default store