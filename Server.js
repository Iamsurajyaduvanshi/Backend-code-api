import express from"express";
import dotenv from "dotenv";
import cors from "cors";
// import { v4: uuidv4 } from "uuid";
import errmidWare from "./middleware/errorMiddleware.js"
import connectdb from "./database/connection.js";
import loginrouter from "./router/loginRouter.js";
import tambolarouter from "./router/tambolaRouter.js";


const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());

app.use("/api",loginrouter);
app.use("/api",tambolarouter);

app.use(errmidWare)
connectdb();

const PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
    console.log(`listening to the Port ${PORT}`)
})
