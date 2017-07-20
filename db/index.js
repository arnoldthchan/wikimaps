const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require('knex')(knexConfig[ENV]);


exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    knex('users').where('id', idx).then((asd) =>{
      //ADD A FOR LOOP to iterate search
      if (knex('users').where('id', idx)) {
        cb(null, placeholder[idx]);
      } else {
        cb(new Error('User ' + id + ' does not exist'));
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
    });
    // console.log('NOT FOUND');
    return cb(null, null);
    knex.destroy({});
  });
}


