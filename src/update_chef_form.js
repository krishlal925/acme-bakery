import React, { useState } from 'react';

const UpdateChef = (params)=>{
  const [name, setName] = useState('');
  console.log(params);

  const onSubmit = (ev)=>{
    ev.preventDefault();
    console.log("Updated Chefs name: ", name);

    //updateChef({name});

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
