import React, { useState } from 'react';


const ChefForm = ({createChef})=>{

  const [name, setName] = useState('');

  const onSubmit = (ev)=>{
    ev.preventDefault();
    console.log("Chefs name: ", name);
    //createChef({"name": chefName});
    createChef({name});

  }

  return(
  <div>
    <form className= 'form' onSubmit= {onSubmit}>
      Enter New Chef's name:
      <input value={name} onChange = {(ev)=>setName(ev.target.value) }></input>
      <button>Create</button>
    </form>
  </div>
  );
}

export default ChefForm;
