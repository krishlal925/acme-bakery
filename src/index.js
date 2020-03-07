import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Chefs from './chefslist';
import Recipes from './recipeslist';
import ChefForm from './chefform';

const {useState, useEffect} = React;


const App = () => {
  const [chefs, setChefs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ error, setError ] = useState('');

  const destroyChef = async({id})=>{
    try{
      await axios.delete(`/api/chefs/${id}`);
      setChefs(chefs.filter(chef => chef.id !== id));
      setError('');
    }
    catch(ex){
      setError(ex.response.data.message)
    }
  }

  const destroyRecipe = async({id})=>{
    try{
      await axios.delete(`/api/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
      setError('');
    }
    catch(ex){
      setError(ex.response.data.message)
    }
  }

  //load data from server on first launch
  useEffect(()=>{
    console.log("entering use effect...")

    Promise.all([axios.get('/api/chefs'), axios.get('/api/recipes')])
      .then(responses => responses.map(response => response.data))
      .then(results => {
        setChefs(results[0]);
        setRecipes(results[1]);
    })
  }, [])


  return (
    <div>
      <div>My App... </div>
      <div className='container'>
        <div className= 'column1' >
          <ChefForm />
          <Chefs chefs = {chefs} destroyChef = {destroyChef}/>
        </div>
        <div className= 'column2'>
          <Recipes recipes = {recipes} destroyRecipe = {destroyRecipe}/>
        </div>
      </div>
    </div>
  );
};

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
