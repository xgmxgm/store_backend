import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

import { registerValidator } from "./validations/auth.js";
import * as UserController from "./controllers/UserController.js";
import * as PaymentController from "./controllers/PaymentController.js";
import * as UploadController from "./controllers/UploadController.js";

mongoose.connect("mongodb+srv://ernarkalkabekov:N9thY4RuJhrlQUaO@cluster0.bjqpvb4.mongodb.net/Users?retryWrites=true&w=majority")
    .then(() => console.log("connect to DB!"))
    .catch((err) => console.log("not connect to DB!", err))

const app = express();

app.use(cors());
app.use(express.json());

app.use(fileUpload({
    createParentPath: true,
}))

const PORT = process.env.PORT || 3002;

app.post('/register', registerValidator, UserController.register)

app.post('/upload', UploadController.Upload)

app.post('/auth', UserController.auth)

app.post("/payment/create", PaymentController.PaymentCreate)

app.post("/payment/confirm", PaymentController.PaymentConfirm)

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }

    console.log(`Servar start http://localhost:${PORT}`)
})