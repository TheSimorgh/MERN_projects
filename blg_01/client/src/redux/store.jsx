import {configureStore} from "@reduxjs/toolkit"


const store =configureStore({
    reducer:{
        user:{name:"Jo"}
    }
})

export default store