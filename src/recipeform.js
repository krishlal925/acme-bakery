import React, { useState } from 'react';


const RecipeForm = ({createRecipe, chefs})=>{

  const [name, setName] = useState('');
  const [chef_id, setChef_id] = useState('');

  const onSubmit = (ev)=>{
    ev.preventDefault();
    console.log("recipe name: ", name);
    createRecipe({name, chef_id});
    console.log("chef id in onSubmit recipeform: ",chef_id)
  }

  return(
    <div>
      <form className= 'form' onSubmit= {onSubmit}>
        Enter new recipe:
        <input value={name} onChange = {(ev)=>setName(ev.target.value) }></input>
        <select value = {chef_id} onChange= {
          (ev)=>{
            console.log(ev.target.value)
            setChef_id(ev.target.value)
            console.log(`the chef_id: ${chef_id}`)
          }
        }>
          {
            chefs.map(chef =>{
              return(
                <option value = {chef.id} key ={chef.id}>{chef.name}</option>
              )
            })
          }
        </select>
        <button>Create</button>
      </form>
    </div>
  );
}

export default RecipeForm;
