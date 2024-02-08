import React, { useEffect, useState } from "react";
import { 
  BrowserRouter as Router, 
  Routes,
  Route 
} from "react-router-dom";

// Components
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import NavBar from './NavBar';
import AllGames from './AllGames';
// Components

function App() {
  return (
    <Router>
      <h1 id='app-title'>GamerScape</h1>
      <div>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/all-games' element={<AllGames />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* Additional routes! */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;