const pg = require('pg');
const client = new pg.Client('postgres://localhost/acme-bakery');
client.connect();

const sync = async ()=>{
  console.log("syncing...")
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS chefs;
  DROP TABLE IF EXISTS recipes;
  CREATE table chefs(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255)
  );
  CREATE table recipes(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    chef_id UUID REFERENCES CHEFS(id)
  );

  INSERT INTO chefs ( name) VALUES ('Wolfgang Puck');
  INSERT INTO chefs ( name) VALUES ('Gordon Ramsey');
  INSERT INTO chefs ( name) VALUES ('Rachel Ray');
  INSERT INTO recipes ( name) VALUES ('Mac n cheese');
  INSERT INTO recipes ( name) VALUES ('filet mignon');
  INSERT INTO recipes ( name) VALUES ('green curry');

  `;
  client.query(SQL);
}


module.exports = {
  sync
}
