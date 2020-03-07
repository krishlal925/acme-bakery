import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Chefs from './chefslist';
import Recipes from './recipeslist'
const {useState, useEffect} = React;

// const Recipes = ({recipes, destroyRecipe}) => {
//   console.log("recipes: ", recipes);
//   return (
//     <div>
// <div>Recipes({recipes.length})</div>
//       <ul>
//         {
//           recipes.map(recipe =>{
//            return( <li key = {recipe.id}>{recipe.name}
//             <button onClick= {()=> destroyRecipe(recipe)}>x</button>
//            </li>)
//           })
//         }
//       </ul>
//     </div>
//   )
// }

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
        <div className= 'column1' >
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
