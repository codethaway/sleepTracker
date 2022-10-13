//jshint esversion:8

import express from 'express'
import path from 'path'
import session from 'express-session'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import passport from 'passport'
import connectDB from './config/db.js'
import User from './models/userModel.js'
import entriesRoute from './routes/entryRoute.js'
import usersRoutes from './routes/usersRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()

const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));


app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/entries', entriesRoute)
app.use('/api/users', usersRoutes)
connectDB()
if( process.env.NODE_ENV === 'development' ) {
  app.use(morgan('dev'))
}



passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});




app.post('/api/entries/:id', function(req, res) {
  console.log(req.isAuthenticated());
  User.findById(req.params.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.sleepData.push(req.body);
        foundUser.save()
      }
    }
  });
});

const __dirname = path.resolve()

if( process.env.NODE_ENV === 'production' ){
  app.use(express.static(path.join( __dirname, '/frontend/build' )))

  app.get('*', (req, res) => 
      res.sendFile(path.resolve( __dirname, 'frontend', 'build', 'index.html' )
  )
  )
} else {

  app.get('/', (req, res) => {
    res.send('API is running....')
  })

}
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, function() {
    console.log(`Server running on ${process.env.NODE_ENV} mode in port ${port}`.yellow.bold)
})
