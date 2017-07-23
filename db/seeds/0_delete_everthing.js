// 0_delete_everthing.js

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE points, maps, users, users_maps RESTART IDENTITY CASCADE')
}
