import React from 'react';
import ReactDOM from 'react-dom';
const {useState, useEffect} = React;
const root = document.querySelector('#root');


const Chefs = () => {
  return (
    <div>Chefs will go here </div>
  )
}

const Recipes = () => {
  return (
    <div>Recipes will go here </div>
  )
}

const App = () => {
  return (
    <div>
      <div>My App... </div>
      <Chefs />
      <Recipes />
    </div>
  );
};
ReactDOM.render(<App />, root);
