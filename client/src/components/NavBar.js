import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/actions';


function NavBar() {

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/games">Games</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;