import React, { useEffect } from "react";

export default function SearchBar(){
  const [recipe, setRecipe] = React.useState("");

  // useEffect(() => {
  //
  // })

  function onSearch(){
    //llamado a la api? renderizado de resultados de busqueda?
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // onSearch(recipe);
    }}>
      <input
          type="text"
          placeholder="Recipe..."
          value={recipe}
          onChange={r => setRecipe(r.target.value)}
      />
      <input type="submit" value="Search"/>
    </form>
  )
}
