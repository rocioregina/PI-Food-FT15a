import React from "react";

import { Link } from "react-router-dom";

export default function NavBar(){
  return (
    <div>
      <Link to='/'>
        <span>Home</span>
      </Link>
      <Link to='/recipes'>
        <span>Recipes</span>
      </Link>
      <Link to='/'>
        <span>Favorites</span>
      </Link>
      <Link to='/recipe'>
        <span>Create Recipe</span>
      </Link>
      <Link to='/about'>
        <span>About</span>
      </Link>
    </div>
  )
}
