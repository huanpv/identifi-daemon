/* jshint unused:false */

function addDefaultUniqueAttributeTypes(db) {
  return db.table('UniqueAttributeTypes').insert([
    { name: 'email' },
    { name: 'account' },
    { name: 'url' },
    { name: 'tel' },
    { name: 'keyID' },
    { name: 'bitcoin' },
    { name: 'identifiNode' },
    { name: 'gpg_fingerprint' },
    { name: 'gpg_keyid' },
  ]);
}

function catcher(e) {
  // Ignore sqlite and pg "already exists" errors
  if (!(e.code.match(/^42/) || e.errno === 1 || e.errno === 19)) {
    console.error(e);
  }
}

function init(db) {
  const queries = [];
  queries.push(db.schema.createTableIfNotExists('UniqueAttributeTypes', (t) => {
    t.string('name').primary();
  }).then(() => addDefaultUniqueAttributeTypes(db).catch(catcher)).catch(catcher));

  queries.push(db.schema.createTableIfNotExists('Messages', (t) => {
    t.string('hash').unique().primary();
    t.string('ipfs_hash', 50).unique();
    t.string('jws', 10000).notNullable();
    t.datetime('saved_at').notNullable();
    t.datetime('timestamp');
    t.string('type');
    t.integer('rating');
    t.integer('max_rating');
    t.integer('min_rating');
    t.boolean('public').default(true);
    t.integer('priority').unsigned();
    t.boolean('is_latest');
    t.string('signer_keyid');
    t.index(['timestamp']);
    t.index(['ipfs_hash']);
    t.index(['type']);
  }).catch(catcher)
    .then(() => {
      db.schema.createTableIfNotExists('MessageAttributes', (t) => {
        t.string('message_hash').references('Messages.hash');
        t.string('name').notNullable();
        t.string('value').notNullable();
        t.boolean('is_recipient');
        t.index(['message_hash', 'name', 'value']);
        t.index(['message_hash', 'is_recipient']);
        t.index(['message_hash']);
        t.index(['name', 'value']);
        t.index(['value']);
        // t.index(['lower("value")'], 'lowercase_value');
        t.primary(['message_hash', 'is_recipient', 'name', 'value']);
      }).catch(catcher);
    }));

  queries.push(db.schema.createTableIfNotExists('TrustDistances', (t) => {
    t.string('start_attr_name').notNullable();
    t.string('start_attr_value').notNullable();
    t.string('end_attr_name').notNullable();
    t.string('end_attr_value').notNullable();
    t.integer('distance').notNullable();
    t.primary(['start_attr_name', 'start_attr_value', 'end_attr_name', 'end_attr_value']);
  }).catch(catcher));

  queries.push(db.schema.createTableIfNotExists('IdentityAttributes', (t) => {
    t.integer('identity_id').unsigned();
    t.string('name').notNullable();
    t.string('value').notNullable();
    t.string('viewpoint_name').notNullable();
    t.string('viewpoint_value').notNullable();
    t.integer('confirmations').unsigned();
    t.integer('refutations').unsigned();
    t.index(['identity_id']);
    t.index(['identity_id', 'name']);
    t.index(['viewpoint_name', 'viewpoint_value']);
    t.index(['name', 'viewpoint_name', 'viewpoint_value']);
    t.index(['name', 'value', 'viewpoint_name', 'viewpoint_value']);
    t.primary(['identity_id', 'name', 'value', 'viewpoint_name', 'viewpoint_value']);
  }).catch(catcher));

  queries.push(db.schema.createTableIfNotExists('IdentityStats', (t) => {
    t.integer('identity_id').unsigned().primary();
    t.string('viewpoint_name').notNullable();
    t.string('viewpoint_value').notNullable();
    t.integer('distance').notNullable().default(-1);
    t.integer('positive_score').unsigned().notNullable().default(0);
    t.integer('negative_score').unsigned().notNullable().default(0);
    t.integer('sent_positive').unsigned().notNullable().default(0);
    t.integer('sent_negative').unsigned().notNullable().default(0);
    t.string('cached_identity_profile').notNullable().default('');
    t.index(['viewpoint_name', 'viewpoint_value', 'distance']);
  }).catch(catcher));

  queries.push(db.schema.createTableIfNotExists('IndexedViewpoints', (t) => {
    t.string('name').notNullable();
    t.string('value').notNullable();
    t.string('ipfs_index_root');
    t.integer('depth').unsigned().notNullable();
    t.primary(['name', 'value']);
  }).catch(catcher));

  return Promise.all(queries);
}

module.exports = { init };
