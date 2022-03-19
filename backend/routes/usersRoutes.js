import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import passport from 'passport'



const router = express.Router()

router.post('/register', asyncHandler( async(req, res) => {


  User.register({
    username: req.body.username,
    handle: req.body.handle
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, function() {
        console.log("Access Granted!!");
        res.json(req.user.id)
      });
    }
  });
}
))

router.post('/login', asyncHandler( async(req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
      });

      req.login(user, function(err) {
        if (err) {
          console.log(err);
        } else {
          passport.authenticate('local')(req, res, function() {
            console.log("Access Granted!!");
            res.json(req.user.id);
          });
        }
      })
} ))

router.get('/logout', asyncHandler( async(req, res) => {
    req.logout();
  console.log("Logging out")
} ))

export default router
