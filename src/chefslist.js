import React from 'react';

const Chefs = ({chefs, destroyChef, recipes}) => {


  return (
    <div>
      <div>Chefs({chefs.length}) </div>
      <ul>
        {
          chefs.map(chef =>{
            return (<li key= {chef.id}>

              {chef.name} <button onClick ={()=> destroyChef(chef)} >X</button>
              <ul>
                {
                  recipes.map(recipe =>{
                    if(recipe.chef_id === chef.id){
                      return(
                        <li key={recipe.id}>
                          {recipe.name}
                        </li>
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

export default Chefs;
