import React from 'react';

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

export default Chefs;
