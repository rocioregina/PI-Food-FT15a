import React from "react";
// import { Link } from "react-router-dom";
// import { useState, useDispatch } from "react-redux";
// import { getRecipes } from "../../actions/index.js";

import SearchBar from '../SearchBar/SearchBar.js';
import Recipes from '../Recipes/Recipes.js';
import './Principal.js';
// import FilterBy from '../FilterBy/FilterBy.js';
// import OrderBy from '../OrderBy/OrderBy.js';
// import Paginate from '../Paginate/Paginate.js';

export default function Principal(){
  return (
    <div className='principal'>
      <SearchBar/>
      <Recipes/>
    </div>
  )
}
