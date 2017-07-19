exports.up = function(knex, Promise) {
  return knex.schema
    .dropTable('users')
    .createTable('users', function (table) {
      table.increments('id');
      table.string('name');
      table.string('email');
      table.string('password');
    })
    .createTable('maps', function (table) {
      table.increments('id');
      table.integer('creator_id').references('users.id');
      table.string('title');
      table.decimal('latitude');
      table.decimal('longitude');
    })
    .createTable('points', function (table) {
      table.increments('id');
      table.string('title');
      table.string('description');
      table.string('image');
      table.decimal('latitude');
      table.decimal('longitude');
      table.integer('map_id');//.references('maps.id');
      table.integer('user_id');//.references('users.id');
    })
    .createTable('users_maps', function(table){
      table.integer('user_id').references('users.id');
      table.integer('map_id').references('maps.id');
      table.boolean('favourite');
      table.boolean('contribution');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('users_maps')
    .dropTable('points')
    .dropTable('maps')
};

