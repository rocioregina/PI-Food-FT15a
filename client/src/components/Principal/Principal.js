import React from "react";
import { Link } from "react-router-dom";
import { useState, useDispatch } from "react-redux";
import { getRecipes } from "../../actions/index.js";

import SearchBar from '../SearchBar/SearchBar.js';
import Recipes from '../Recipes/Recipes.js';
//import filter and pag component here

export default function Principal(){

  // const dispatch = useDispatch();
  // const allRecipes = useSelector ((state) => state.recipesLoaded);

  return (
    <div>
      <SearchBar/>
      <select>
        <option value="score">Score</option>
      </select>
      <select name="diets-list" id="diets-list">
        <option value="keto">Keto</option>
      </select>
      <Recipes/>
    </div>
  )
}
