import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

router.get('/', asyncHandler( async(req, res) => {
   try {
        const users = await User.find({})
        res.json(users)
   } catch (error) {
       console.error(error);
       process.exit(1)
   }
} ))

router.get('/:id', asyncHandler( async (req, res) => {
    if (true) {
        const user = await User.findById(req.params.id)
        if (user) {
            res.json(user)
        } else {
            res.status(404)
            throw new Error('User not found')
            res.json(error)
        }
    }
} ))

export default router
