exports.up = function(knex, Promise) {
  return knex.raw('CREATE UNIQUE INDEX users_maps_idx ON users_maps (user_id, map_id)')
};

exports.down = function(knex, Promise) {
  return knex.raw('DROP INDEX users_maps_idx ')
};

