import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Chefs from './chefslist';
import Recipes from './recipeslist';
import ChefForm from './chefform';
import RecipeForm from './recipeform';
import qs from 'qs';
import UpdateChef from './update_chef_form';

const {useState, useEffect} = React;



const App = () => {
  const [chefs, setChefs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ error, setError ] = useState('');

  // used for routing
  const [ params, setParams ] = useState(qs.parse(window.location.hash.slice(1)));
  useEffect(()=> {
    window.addEventListener('hashchange', ()=> {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);
  const { view } = params;


  // delete functions
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

  //create functions
  const createChef = async(input) =>{
    const response = (await axios.post(`/api/chefs`, input)).data
    setChefs([...chefs, {"name": response.name, "id":response.id}])
  }

  const createRecipe = async(input)=>{
    console.log("im in the create recipe function")
    const response = (await axios.post('/api/recipes', input)).data
    console.log("axios response: ", response)
    setRecipes([...recipes, {"name": response.name, "id": response.id}])

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
      <div> <a href='#' >ACME Bakery </a></div>
      {
        view === 'recipe' && <UpdateRecipe/>
      }

      {
        view === 'chef' && <UpdateChef params ={params}/>
      }

      {
        !view && (
        <div className='container'>
          <div className= 'column1' >
            <ChefForm createChef = {createChef}/>
            <Chefs chefs = {chefs} destroyChef = {destroyChef} recipes = {recipes}/>
          </div>
          <div className= 'column2'>
            <RecipeForm createRecipe = {createRecipe} chefs = {chefs}/>
            <Recipes recipes = {recipes} destroyRecipe = {destroyRecipe} chefs = {chefs}/>
          </div>
        </div>
        )
      }

    </div>
  );
};

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
