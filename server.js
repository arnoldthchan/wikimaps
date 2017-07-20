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

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

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
        return cb(null, false, {message: "User does not exist."});}
      if (user.password != password) {
        return cb(null, false, {message: "Incorrect Password."});}
      //Passes authentication
      return cb(null, user);
   });
 }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
  console.log('SERIALIZE:', user);
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
  let templateVars =
  { googleMapsAPIKey: GOOGLEMAPS_APIKEY};
  console.log(req.sessionID);
  return res.render("index", templateVars);
});

app.post("/login",
  passport.authenticate("local", { successRedirect: '/', failureRedirect: '/fail' }));

 //  ,(req, res) => {
 //    // let templateVars = {user: req.user};
 //    console.log("Legit info:", req.user);
 //    res.send('/asd');
 // });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
