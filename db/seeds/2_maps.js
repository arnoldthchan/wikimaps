// To reset the primary key in case of emergency: ALTER SEQUENCE maps_id_seq RESTART WITH 1

exports.seed = function(knex, Promise){
  return Promise.all([
    knex('maps').insert({creator_id: 1,
      title: 'Toronto',
      latitude: 43.6532,
      longitude: -79.3832}),
    knex('maps').insert({creator_id: 2,
      title: 'Oshawa',
      latitude: 43.8971,
      longitude: -78.8658}),
    knex('maps').insert({creator_id: 3,
      title: 'Mississauga',
      latitude: 43.5890,
      longitude: -79.6441}),
    knex('maps').insert({creator_id: 4,
      title: 'Markham',
      latitude: 43.8561,
      longitude: -79.3370}),
    knex('maps').insert({creator_id: 5,
      title: 'Niagara Falls',
      latitude: 43.0896,
      longitude: -79.0849})
  ]);
};
