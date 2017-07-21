// To reset the primary key in case of emergency: ALTER SEQUENCE users_id_seq RESTART WITH 1
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').insert({name: 'Alice',
      email: 'Alice@email.com',
      password: '$2a$10$oQJ6qs2w2eSo26coyXZNMu3qHpKRlW0pHrCHRbCIAmsuk.Ec5rCmO'}),
    knex('users').insert({name: 'Bob',
      email: 'Bob@email.com',
      password: '$2a$10$bhubBaOEsU0q9UqL5Kpk4u0w2YJ8DCV5mXxCUhtzXpaZnSuy19bpO'}),
    knex('users').insert({name: 'Charlie',
      email: 'Charlie@email.com',
      password: '$2a$10$Ksjhl1ZYfq3Aln/7jAc0Bess1N3/xg8pXc7kiTNeGiTLIYp9sWLx6'}),
    knex('users').insert({name: 'Devin',
      email: 'Devin@email.com',
      password: '$2a$10$XW2q/xvCX4GZU3CfkvdJu.hu4yjJs0iySlc8.Q/9v5UIYOaTaKjkC'}),
    knex('users').insert({name: 'Earl',
      email: 'Earl@email.com',
      password: '$2a$10$gzP85RtUhogmv6HKxoFXOe09BbealppduLJ/ib9irhl80MtjGdCNG'})
  ]);
};
