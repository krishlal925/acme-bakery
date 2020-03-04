const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const port = process.env.port || 3000;


app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

db.sync()
  .then(()=>{
    app.listen(port, ()=> console.log(`listening on port: ${port}`));
  });

