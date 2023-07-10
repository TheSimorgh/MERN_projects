import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./features/userSlice"
import themeModeSlice from "./features/themeModeSlice"

const store=configureStore({
    reducer:{
        user:userSlice,
        themeMode:themeModeSlice,
    }
})

export default store