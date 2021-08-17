import React from "react";

import { Link } from 'react-router-dom';
import Recipe from "../Recipe/Recipe.js";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, getRecipeDetail } from '../../actions/index.js';
import './Favorites.css';

export default function Favorites(){
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoriteRecipes);

  function onClick(id){
    dispatch(getRecipeDetail(id));
  }

  function remove(id){
    dispatch(removeFavorite(id));
  }

  return (
    <div className='favorites'>
      <h3 className='favs-title'>Favorites</h3>
      <div className='fav-recipes'>
        {favorites.map((recipe) =>
          <div className='recipe-box'>
            <Link to={`/recipes/${recipe.id}`}>
              <Recipe props={recipe} onClick={() => onClick(recipe.id)}/>
            </Link>
            <button className='remove-button' onClick={() => remove(recipe.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="cross-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
