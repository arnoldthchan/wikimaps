const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require('knex')(knexConfig[ENV]);


exports.findById = function(id, cb) {
  process.nextTick(function() {
    knex('users').then((database) =>{
      for (var i = 0; i < database.length; i++) {
      //Returns correct ID user as object
        if (database[i].id === id) {
          console.log('FOUND', database);
          return cb(null, database[i]);
        } else {
          return cb(new Error('User ' + id + ' does not exist'));
        }
      }
      knex.destroy({});
    })
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    knex('users').then((database) => {
      for (var i = 0; i < database.length; i++) {
        if (database[i].name === username) {
          //Returns correct username from DB
          return cb(null, database[i]);
        }
      }
    return cb(null, null);
    knex.destroy({});
    });
  });
}


