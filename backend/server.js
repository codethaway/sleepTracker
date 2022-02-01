//jshint esversion:8

const express = require('express');

const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db.js')
const User = require('./models/userModel')

const app = express();

app.use(session({
  secret: "The Glory",
  resave: false,
  saveUninitialized: false
}));


app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


connectDB()


passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/register', function(req, res) {

  console.log(req.body);

  User.register({
    username: req.body.username,
    handle: req.body.handle
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, function() {
        console.log("Access Granted!!");
        console.log(req.user);
        res.json(req.user.id)
      });
    }
  });

});


app.get('/api/entries', function(req, res) {
  console.log(req.isAuthenticated());
  User.find(function(err, foundUsers)  {
    if (err) {
      console.error(err);
    } else {
      res.send(foundUsers)
    }
  })
});



app.get('/api/entries/:id', function(req, res) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    User.findById(req.params.id, function(err, foundUser) {
      if (err) {
        console.log(err)
      } else {
        res.json(foundUser)
      }
    })
  } else {
    res.json(false)
  }
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
app.post('/login', function(req, res) {

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
        console.log(req.user)
      });
    }
  });
});
app.get('/logout', (req, res) => {
  req.logout();
  console.log("Logging out")
})
app.listen(8080, function() {
  console.log('Server running on port 8080');
});
