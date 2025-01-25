import express from "express"
import UserModal from "../models/user.model.js"

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    res.send('User Page')
})

userRouter.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        if (!name || !email || !password) {
            res.status(400).json({
                error: true,
                message: 'Please provide all the required fields'
            })
            return
        }
        const existingUser = await UserModal.findOne({ email })
        if (existingUser) {
            res.status(400).json({
                error: true,
                message: "User already exists"
            })
            return
        }

        const newUser = await UserModal({
            name,
            email,
            password,
            role
        })

         await newUser.save()

        res.status(201).json({
            error: false,
            message: 'User created successfully',
            user: newUser
        })

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message || 'Error creating user',
        })
    }
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        if ( !email || !password) {
            res.status(400).json({
                error: true,
                message: 'Please provide all the required fields'
            })
            return
        }
        const existingUser = await UserModal.findOne({ email })
        if (existingUser) {
            res.status(400).json({
                error: true,
                message: "User already exists"
            })
            return
        }

        const newUser = await UserModal({
            email,
            password,
        })
         await newUser.save()

        res.status(201).json({
            error: false,
            message: 'User created successfully',
            user: newUser
        })

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message || 'Error creating user',
        })
    }
})

export default userRouter;