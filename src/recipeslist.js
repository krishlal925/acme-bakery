import React from 'react';

const Recipes = ({recipes, destroyRecipe}) => {
  console.log("recipes: ", recipes);
  return (
    <div>
<div>Recipes({recipes.length})</div>
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

export default Recipes;
