import React from "react";

import { Link } from "react-router-dom";
import './NavBar.css';

export default function NavBar(){
  const [sidebar, setSidebar] = React.useState(false);

  const showSidebar = function(){
    setSidebar(!sidebar);
  }

  return (
    <div>
      <div className='navbar'>
        <Link to='#' className='menu-bars' onClick={showSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
            <Link to='#' className='close-icon' onClick={showSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </li>
          <li className='nav-text'>
            <Link to='/'>
              <span>Home</span>
            </Link>
          </li>
          <li className='nav-text'>
            <Link to='/recipes'>
              <span>Recipes</span>
            </Link>
          </li>
          <li className='nav-text'>
            <Link to='/'>
              <span>Favorites</span>
            </Link>
          </li>
          <li className='nav-text'>
            <Link to='/recipe'>
              <span>Create Recipe</span>
            </Link>
          </li>
          <li className='nav-text'>
            <Link to='/about'>
              <span>About</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
