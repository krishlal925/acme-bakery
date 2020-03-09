import React from 'react';

const Recipes = ({recipes, destroyRecipe, chefs}) => {
  console.log("recipes: ", recipes);
  console.log("chefs: ", chefs);
  return (
    <div>
<div>Recipes({recipes.length})</div>
      <ul>
        {
          recipes.map(recipe =>{
           return( <li key = {recipe.id}>{recipe.name}
             <button onClick= {()=> destroyRecipe(recipe)}>x</button>
             <ul>
               {
                 chefs.map(chef=>{
                   if(recipe.chef_id === chef.id){
                     return(
                     <li key={chef.id}>By {chef.name}</li>
                     )
                   }
                 })
               }
             </ul>
           </li>)
          })
        }
      </ul>
    </div>
  )
}

export default Recipes;
