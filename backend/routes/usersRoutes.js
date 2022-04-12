import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import passport from 'passport'



const router = express.Router()

router.post('/register', asyncHandler( async (req, res) => {

  const { username, handle, password } = req.body

  const userExists = await User.findOne({ username })

  if (userExists) {

    res.status(400)
    throw new Error('User already exists')

  } else {
    try {
      const user = await User.register({
        username,
        handle
      }, password )

      if (user) {

        passport.authenticate('local')(req, res, function() {
          res.json(req.user.id);
        });

      }

    } catch (error) {
      
      res.status(400)
      throw new Error(error)

    }
  }

  
}
))

router.post('/login', asyncHandler( async(req, res) => {

    const { username, password } = req.body

    const user = new User({
        username,
        password
      });

      try {

        req.login(user, function(err){
          if(err){
            console.log(error);
            res.status(400)
            throw new Error(error)
          } else {

            passport.authenticate('local')(req, res, function() {
              console.log("Access Granted!!");
              res.json(req.user.id);
            });

          }
        })

      } catch (error) {

        res.status(400)
        throw new Error(error)
        
      }

} ))

router.get('/logout', asyncHandler( async(req, res) => {
    req.logout();
  console.log("Logging out")
} ))

export default router
