import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const {useState, useEffect} = React;



const Chefs = ({chefs, destroyChef}) => {


  return (
    <div>
      <div>Chefs({chefs.length}) </div>
      <ul>
        {
          chefs.map(chef =>{
            return (<li key= {chef.id}>

              {chef.name} <button onClick ={()=> destroyChef(chef)} >X</button>

            </li>)
          })
        }
      </ul>
    </div>
  )
}

const Recipes = ({recipes, destroyRecipe}) => {
  console.log("recipes: ", recipes);
  return (
    <div>
      <div>Recipes will go here </div>
      <ul>
        {
          recipes.map(recipe =>{
           return( <li key = {recipe.id}>{recipe.name}
            <button onClick= {()=> destroyRecipe(recipe)}>x</button>
           </li>)
          })
        }
      </ul>
    </div>
  )
}

const App = () => {
  const [chefs, setChefs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ error, setError ] = useState('');
  console.log("1: ", chefs);

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
        console.log("2: ", results);
        setChefs(results[0]);
        setRecipes(results[1]);
    })
  }, [])
  console.log("3: ", chefs);
  return (
    <div>
      <div>My App... </div>
      <div className='container'>
        <Chefs chefs = {chefs} destroyChef = {destroyChef}/>
        <Recipes recipes = {recipes} destroyRecipe = {destroyRecipe}/>
      </div>
    </div>
  );
};

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
