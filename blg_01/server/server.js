const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./src/config/database");
mongoose.set("strictQuery", true);
const routes =require("./src/routes/index.js")
const app = express();
// const http = require("http");
// const { readdirSync } = require("fs");

//middlewares
app.use(express.json()); //Pass incoming data
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//cors middleware 
app.use(cors());


// const server = http.createServer(app);
//? Start the server


// app.get("/",(req,res)=>{res.send("XXXXXXX")})
// readdirSync("./routes").map((r)=>app.use("/",require("./routes/"+r)))
// readdirSync("./src/routes/").map((r)=>app.use(`/api/v1/${r}/`,require("./src/routes/"+r)))
app.use("/api/v1", routes);
;(async function server() {
    try {
        const PORT = process.env.PORT || 9080;  
      connectDB()
    //   server.listen(PORT, console.log(`Server is running on port ${PORT}`));  
    app.listen(process.env.PORT,()=>{ console.log(`Server is Running ${process.env.PORT}`);})
    } catch (error) {
      console.log(`server Error ${error}`);
    }
  })();