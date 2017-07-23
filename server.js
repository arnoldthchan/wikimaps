"use strict";

require("dotenv").config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const GOOGLEMAPS_APIKEY = process.env.GOOGLEMAPS_APIKEY;
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require("morgan");
const knexLogger  = require("knex-logger");
const passport    = require("passport");
const Strategy    = require("passport-local").Strategy;
const db          = require("./db");
const bcrypt      = require('bcrypt');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// "dev" = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));


app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: "expanded"
}));
app.use(express.static("public"));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

function renderHelper(req, res) {
  let templateVars;

  if (req.user) {
    templateVars = { googleMapsAPIKey: GOOGLEMAPS_APIKEY, user: req.user };
  } else {
    templateVars = { googleMapsAPIKey: GOOGLEMAPS_APIKEY, user: { id:0, name:'Guest', email:"guest@guest.com", password:"none"}};
  }

  res.render("index", templateVars);
}

app.get("/favourite", (req, res) => {
// knex.select('*').from('maps').join('users_map', function() {
//   this.on('maps.id', '=', 'users_maps.map_id').onIn('users_maps.id', [req.user]).onIn('users_maps.favourite', [1])
// })
knex('maps')
.join('users_maps', 'maps.id', '=', 'users_maps.map_id')
// .select('maps.id', 'maps.title')
      .select('id')
      .select('title')
      .then((results) => {
//console.log(" TAK - fav");
//console.log(results);
        res.json(results)
      })
      .catch(function(error) {
        //console.log(error)
      });
})

app.get("/users", (req, res) => {
  knex('users')
  .then((results) => {
    res.json(results)
  })
  .catch((error) => {
    console.log("Error users");
  })
})

app.get("/maps", (req, res) => {
    // //console.log("HERE 1");
    knex('maps')
      .then((results) => {
//console.log(" TAK - maps");
//console.log(results)
        res.json(results)
      })
      .catch(function(error) {
        //console.log(error)
    ////console.log("HERE 3");
      })
});

app.get("/maps/:user_id", (req, res) => {
    knex('users_maps')
      .where({user_id: req.params.user_id})
      .then((results) => {
        res.json(results)
      })
      .catch(function(error) {
        //console.log(error)
      })
});

app.get("/map/:map_id", (req, res) => {
    knex('maps')
      .where({id: req.params.map_id})
      .then((results) => {
        res.json(results)
      })
      .catch(function(error) {
        //console.log(error)
      })
});

app.get("/maps/:map_id/points", (req, res) => {
    knex('points')
      .where({map_id: req.params.map_id})
      .then((results) => {
        res.json(results)
      })
      .catch(function(error) {
        //console.log(error)
      })
});

app.post("/point", (req, res) => {
  // //console.log(req.body);
  // //console.log(req.body.title)
    knex('points')
      .insert (
      {
       title       : req.body.title,
       description : req.body.description,
       image       : req.body.image,
       latitude    : req.body.latitude,
       longitude   : req.body.longitude,
       map_id      : req.body.map_id,
       user_id     : req.body.user_id
      })
      .returning('id')
      .then((id) => {
        res.send(id);
      });
})

app.post("/users_map", (req, res)=>{
    ////console.log(req.body)
    knex('users_maps')
      .insert(
      {
       user_id      : req.body.user_id,
       map_id       : req.body.map_id,
       favourite    : req.body.favourite,
       contribution : req.body.contribution
      })
      .then((results) => {
        renderHelper(req, res);
      });
  })

app.post("/map", (req, res) => {
  ////console.log(req.body.title)
    knex('maps')
      .insert (
      {
       creator_id : req.body.creator_id,
       title      : req.body.title,
       latitude   : req.body.latitude,
       longitude  : req.body.longitude
      })
      .returning('id')
      .then((results) => {
        renderHelper(req, res);
      });
});

app.put("/point/:point_id", (req, res) => {
    ////console.log(req.body);
  ////console.log(req.body.title)
    knex('points')
      .where({id: req.params.point_id})
      .update (
      {
       title       : req.body.title,
       description : req.body.description,
       image       : req.body.image,
       latitude    : req.body.latitude,
       longitude   : req.body.longitude,
       map_id      : req.body.map_id,
       user_id     : req.body.user_id
      })
      .returning('id')
      .then((id) => {
        res.send(id)
      });
})

app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true}));
app.use(require("express-session")({ secret: "moist", resave: false, saveUninitialized: false}));

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  (username, password, cb) => {
    db.findByUsername(username, function(err, user) {
      if (err) {
        return cb(err);}
      if (!user) {
        return cb(null, false, {message: "User does not exist."});
      }
      bcrypt.compare(password, user.password)
      .then(function(res) {
        //res = true if password matches hash
        if(res){
          return cb(null, user);
        } else{
          return cb(null, false, {message: err});
        }
      });
    });
  }))
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
  return cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  db.findById(id, (err, user) => {
    if (err) { return cb(err);}
    return cb(null, user);
 });
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Home page
app.get("/", (req, res) => {
  renderHelper(req, res);
});

app.post("/login",
  passport.authenticate("local", { successRedirect: '/',
    failureRedirect: '/'
  }));

app.post('/register',
  (req, res) => {
    knex("users")
    .count('name')
    .where('name', req.body.username)
    .then((results) => {
      //console.log(results[0].count)
      if(results[0].count == 0){
        knex('users')
        .insert({
          name: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10)
        })
        .returning('id')
        .then((results) => {
          renderHelper(req, res);
        });
      }
      renderHelper(req, res);
    });

  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn('/'),
  (req, res) => {
    //console.log(req.user);
    res.render('profile', { user: req.user });
  });

app.listen(PORT, () => {
  console.log("Wikimaps listening on port " + PORT);
});
