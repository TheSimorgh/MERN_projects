import {configureStore} from "@reduxjs/toolkit"

const store=configureStore({
    reducer:{
        user:1
    }
})

export default store