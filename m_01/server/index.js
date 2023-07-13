import express from "express";
import dotEnv from "dotenv";
import cors from"cors";
import bodyParser from"body-parser";
import cookieParser from"cookie-parser";
// import dbConnect from"./src/config/dbConnect.js";
import mongoose from"mongoose"
import routes from"./src/routes/index.js";
mongoose.set('strictQuery', true);
dotEnv.config();
const app = express()

app.get("/", (req, res) => {
  res.send("server is running");
});
// const corsOptions = {
//   origin: (origin, callback) => {
//     callback(null, true);
//   },
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
//   credentials: true
// };
////
//use middleware-------------
//  app.use(cors({origin: "http://127.0.0.1:5137/",credentials: true,}));

app.use(cors());
// app.use(cors({origin:["http://127.0.0.1:5137"],
// credentials:true
// }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.json());
// router use..............

 app.use("/api/v1", routes);
// db connect........
// dbConnect();
const PORT = process.env.PORT || 4000;
// app.listen(PORT, (error) => {
//   if (!error) {
//     console.log(`server is running port ${PORT}`);
//   }
// });

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});

//test