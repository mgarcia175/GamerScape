import React, { useEffect, useState } from "react";
import { 
  BrowserRouter as Router, 
  Routes,
  Route 
} from "react-router-dom";

// Components
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar';
import GamesList from './GamesList';
// Components

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/games' element={<GamesList />} />
          <Route path='/login' element={<Login />} />
          {/* Additional routes! */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;