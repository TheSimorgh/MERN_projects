const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./src/config/database");
mongoose.set("strictQuery", true);
const routes =require("./src/routes/index.js");
const { notFound, globalErrHandler } = require("./src/middleware/globalErrorHandler");
const sendEmail = require("./src/utils/sendEmail");
const { sendResetCode } = require("./src/utils/mailer");
const app = express();
// const http = require("http");
// const { readdirSync } = require("fs");
// sendEmail("kainorling","11")
// sendResetCode("kainorling","sss","dsdsds")
//middlewares
app.use(express.json()); //Pass incoming data
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//cors middleware 
app.use(cors());

// const corsOpts = {
//     // origin: "http://localhost:5173/",
//     origin: "*",

//     credentials: true,
//     methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
//     allowedHeaders: ['Content-Type'],
//     exposedHeaders: ['Content-Type']
// };
// app.use(cors(corsOpts));

// const server = http.createServer(app);
//? Start the server


// app.get("/",(req,res)=>{res.send("XXXXXXX")})
// readdirSync("./routes").map((r)=>app.use("/",require("./routes/"+r)))
// readdirSync("./src/routes/").map((r)=>app.use(`/api/v1/${r}/`,require("./src/routes/"+r)))
app.use("/api/v1", routes);
app.use(notFound);
app.use(globalErrHandler)
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