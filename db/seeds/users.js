exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Alice', email: 'Alice@email.com', password: 'Alice'}),
        knex('users').insert({name: 'Bob', email: 'Bob@email.com', password: 'Bob'}),
        knex('users').insert({name: 'Charlie', email: 'Charlie@email.com', password: 'Charlie'})
      ]);
    });
};
