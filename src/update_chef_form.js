import React, { useState } from 'react';

const UpdateChef = ({id, chefs, updateChef})=>{

  const chef = chefs.filter(chef =>{
    return(chef.id === id)
  })
  const [name, setName] = useState(chef[0].name);

  const onSubmit = (ev)=>{
    ev.preventDefault();
    console.log("Updated Chefs name: ", name);
    updateChef(name, id)
  }

  return(
  <div>
    <form className= 'form' onSubmit= {onSubmit}>
      Update Chef's name:
      <input value={name} onChange = {(ev)=>setName(ev.target.value) }></input>
      <button>Update</button>
    </form>
  </div>
  );
}

export default UpdateChef;
