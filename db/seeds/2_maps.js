// To reset the primary key in case of emergency: ALTER SEQUENCE maps_id_seq RESTART WITH 1

exports.seed = function(knex, Promise){
  return Promise.all([
    knex('maps').insert({creator_id: 1,
      title: 'Toronto',
      latitude: 43.6532,
      longitude: -79.3832})
  ]);
};
