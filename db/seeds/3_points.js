// To reset the primary key in case of emergency: ALTER SEQUENCE points_id_seq RESTART WITH 1

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('points').insert({title: 'Toronto',
      description: 'You\'re an American sportscaster',
      image: 'toronto.jpg',
      latitude: 43.6532,
      longitude: -79.3832,
      map_id: 1,
      user_id: 1}),

    knex('points').insert({title: 'Tuhronto',
      description: 'You\'re from Mississauga at best.',
      image: 'tuhronto.jpg',
      latitude: 43.6632,
      longitude: -79.3732,
      map_id: 1,
      user_id: 1}),

    knex('points').insert({title: 'Tronno',
      description: 'You\'re a Torontonian.',
      image: 'tronno.jpg',
      latitude: 43.6432,
      longitude: -79.3932,
      map_id: 1,
      user_id: 1}),

    knex('points').insert({title: 'Chranna',
      description: 'You pulse sounds liek the TTC chimes and you piss Steamwhistle.',
      image: 'chranna.jpg',
      latitude: 43.6632,
      longitude: -79.3932,
      map_id: 1,
      user_id: 1}),

    knex('points').insert({title: 'The \'shawa',
      description: 'Welcome to the \'shawa.',
      image: 'shawa.jpg',
      latitude: 43.8971,
      longitude: -78.8658,
      map_id: 2,
      user_id: 1})
  ]);
};
