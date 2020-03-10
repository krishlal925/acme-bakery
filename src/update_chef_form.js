import React, { useState } from 'react';

const UpdateChef = ({id, chefs})=>{

  console.log(id);
  console.log(chefs)
  const chef = chefs.filter(chef =>{
    return(chef.id === id)
  })

  console.log(chef)
  const [name, setName] = useState(chef[0].name);
  console.log("name: ",chef[0].name)
  const onSubmit = (ev)=>{
    ev.preventDefault();
    console.log("Updated Chefs name: ", name);

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
