import userModel from "../model/loginModel.js"
import bcrypt from "bcryptjs"

export const registerController = async (req, res, next) => {

    try {
        const { name, email, password } = req.body


        //    validate  

        if (!name) {
            next('name is required')
        }
        if (!email) {
            next('plesase proide email')
        }
        if (!password) {
            next('plesase proide passward')

        }
        //   check the stared data 

        const exitingUser = await userModel.findOne({ email })
        console.log(exitingUser)
        if (exitingUser) {
            return res.status(200).send({
                sucess: true,
                message: 'Email is already there'
            })
        }
        // store the data
        const newUser = {
            name: name,
            email: email,
            password: bcrypt.hashSync(password)

        }

        const user = userModel.create(newUser)
        res.status(200).send({
            sucess: true,
            message: "user is registered sucessfully",
            user
        })



    } catch (err) {

        next('ERRor in register controler')

    }



}

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            next('provide all fields')

        }
        const user = await userModel.findOne({ email })
        if (!user) {
            next('invalid email and passwod')
        }
        const isPassword = bcrypt.compareSync(password, user.password)
        if (!password) {
            res.status(400).json({
                success: false,
                message: 'password incorrect'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Login succesfully',
            user

        })
    } catch (err) {

    }
}