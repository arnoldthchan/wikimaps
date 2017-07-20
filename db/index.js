const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require('knex')(knexConfig[ENV]);


exports.findById = function(id, cb) {
  process.nextTick(function() {
    knex('users')
      .where('id', id)
      .then((database) =>{
      if(database){
        return cb(null, database[0]);
      } else {
        return cb(new Error('User ' + id + ' does not exist'));
      }
      knex.destroy({});
    })
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    knex('users')
    .where('name', username)
    .then((database) => {
      //Returns correct username from DB
      if(database){
        return cb(null, database[0]);
      } else {
        return cb(null, null);
      }
      knex.destroy({});
    });
  });
}


