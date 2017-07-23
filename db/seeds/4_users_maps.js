// To reset the primary key in case of emergency: ALTER SEQUENCE points_id_seq RESTART WITH 1

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users_maps').insert({user_id: 1,
      map_id: 1,
      favourite: 1,
      contribution: 1
    }),

    knex('users_maps').insert({user_id: 2,
      map_id: 1,
      favourite: 1,
      contribution: 1
    }),

    knex('users_maps').insert({user_id: 3,
      map_id: 2,
      favourite: 1,
      contribution: 1
    }),

    knex('users_maps').insert({user_id: 4,
      map_id: 3,
      favourite: 1,
      contribution: 1
    })
  ]);
};
