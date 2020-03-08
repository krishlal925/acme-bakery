const pg = require('pg');
const client = new pg.Client('postgres://localhost/acme-bakery');
client.connect();

const sync = async ()=>{
  console.log("syncing...")
  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS recipes;
    DROP TABLE IF EXISTS chefs;
    CREATE table chefs(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255)
    );
    CREATE table recipes(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255),
      chef_id UUID REFERENCES chefs(id) ON DELETE CASCADE
    );
  `;

  client.query(SQL);

  const [wolfgang, gordon, rachel] = await Promise.all([
    createChef('Wolfgang Puck'),
    createChef('Gordon Ramsey'),
    createChef('Rachel Ray'),
    createChef('Sam')
  ]);

  Promise.all([
    createRecipe("mac n cheese", wolfgang.id),
    createRecipe('filet mignon', gordon.id),
    createRecipe('green curfy', rachel.id)
  ])

  console.log(await readChefs());
}

const createChef = async(name) =>{
  const SQL = 'INSERT INTO chefs(name) VALUES ($1) returning *';
  return (await client.query(SQL, [name])).rows[0];
}
const createRecipe = async(name, chef_id) =>{
  const SQL = 'INSERT INTO recipes(name, chef_id) VALUES ($1,$2) returning *';;
  return (await client.query(SQL, [name, chef_id])).rows[0];
}

const readChefs = async () =>{
  const SQL = 'SELECT * FROM chefs';
  return (await client.query(SQL)).rows;
}

const readRecipes = async () =>{
  const SQL = 'SELECT * FROM recipes';
  return (await client.query(SQL)).rows;
}

const deleteChef = async(id)=>{
  const SQL = 'DELETE FROM chefs where id= $1';
  await client.query(SQL, [id]);
  return(`deleted: ${id}`)
}

const deleteRecipe = async(id)=>{
  const SQL = 'DELETE FROM recipes where id= $1';
  await client.query(SQL, [id]);
  return(`deleted: ${id}`)
}

module.exports = {
  sync,
  readChefs,
  readRecipes,
  createChef,
  createRecipe,
  deleteChef,
  deleteRecipe
}
