import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import { UserModel } from "../models/user.js";

export const register = async (req, res) => {
    try {
        const reqData = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json(errors.array());
        }

        if (reqData.password !== reqData.passwordRepeat) {
            return res.json({
                message: "Пароли не совпадают !"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(reqData.password, salt);

        const doc = new UserModel({
            name: reqData.name,
            email: reqData.email,
            image: reqData.image,
            passwordHash,
        });

        const user = await doc.save();

        res.json(user);
    } catch (err) {
        console.error(err)
        res.json(err)
    }
}

export const auth = async (req, res) => {
    try {
        const reqData = req.body;

        const user = await UserModel.findOne({email: reqData.email})

        if (!user) {
            return res.json({
                message: "Неверный логин или пароль !"
            })
        }

        const isValidPass = await bcrypt.compare(reqData.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.json({
                message: "Неверный логин или пароль !"
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({
            userData,
            token
        });
    } catch (err) {
        console.error(err)

        res.json(err)
    }
}