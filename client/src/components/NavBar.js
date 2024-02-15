import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/games">Games</Link></li>
        <li><Link to="/login">Log In</Link></li>

        {/* This is for more navigation paths */}
      </ul>
    </nav>
  );
}

export default NavBar;