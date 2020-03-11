const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const port = process.env.port || 3000;

//body parser
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/chefs', (req,res,next)=>{
  db.readChefs()
  .then(chefs => res.send(chefs))
  .catch(next)
});

app.get('/api/recipes', (req,res,next)=>{
  db.readRecipes()
  .then(recipes => res.send(recipes))
  .catch(next)
});

app.post('/api/chefs', (req,res,next)=>{
  console.log(req.body)
  db.createChef(req.body.name)
  .then(chef=> res.send(chef))
});

app.post('/api/recipes', (req,res,next)=>{
  console.log(req.body)
  db.createRecipe(req.body.name, req.body.chef_id)
  .then(recipe=> res.send(recipe))
});

app.delete('/api/chefs/:id', (req,res,next)=>{
  db.deleteChef(req.params.id)
  .then(response => res.send(response))
});

app.delete('/api/recipes/:id', (req,res,next)=>{
  db.deleteRecipe(req.params.id)
  .then(response => res.send(response))
});

app.put('/api/chefs/:id', (req,res,next)=>{
  console.log(req.body)
  db.updateChef(req.body.name, req.params.id)
  .then(response => res.send(response))
})

db.sync()
  .then(()=>{
    app.listen(port, ()=> console.log(`listening on port: ${port}`));
  });

