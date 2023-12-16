import { body } from "express-validator"

export const registerValidator = [
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('passwordRepeat').isLength({min: 5}),
];