// To reset the primary key in case of emergency: ALTER SEQUENCE points_id_seq RESTART WITH 1

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('points').insert({title: 'Toronto Sign',
      description: 'The colours!',
      image: 'sign.jpg',
      latitude: 43.6532,
      longitude: -79.3832,
      map_id: 1,
      user_id: 1}),

    knex('points').insert({title: 'Raccoon',
      description: 'Trash panda.',
      image: 'raccoon.jpg',
      latitude: 43.6632,
      longitude: -79.3732,
      map_id: 1,
      user_id: 1}),

    knex('points').insert({title: 'Streetcar',
      description: 'Let it snow.',
      image: 'streetcar.jpg',
      latitude: 43.6432,
      longitude: -79.3932,
      map_id: 1,
      user_id: 1}),

    knex('points').insert({title: 'CN Tower',
      description: 'Pew pew.',
      image: 'cntower.jpg',
      latitude: 43.6632,
      longitude: -79.3932,
      map_id: 1,
      user_id: 1}),

    knex('points').insert({title: 'Oshawa',
      description: 'Welcome to the \'shawa.',
      image: 'oshawa.jpg',
      latitude: 43.8971,
      longitude: -78.8658,
      map_id: 2,
      user_id: 2}),

    knex('points').insert({ title: 'Canadian Automotive Museum',
      description: 'Cars are here.',
      image: 'canautomuseum.jpg',
      latitude: 43.894962,
      longitude: -78.862111,
      map_id: 2,
      user_id: 2})
  ]);
};
