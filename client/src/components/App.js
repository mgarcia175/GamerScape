import React from "react";
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
import Games from './Games';
import GameDetails from './GameDetails';
import ReviewForm from './ReviewForm';
import CreateGame from "./CreateGame";
import CreatedGameCard from "./CreatedGameCard";
import EditReviewForm from "./EditReviewForm"
// Components

function App() {
  return (
    <Router>
        <h1 id='app-title'>GamerScape</h1>
        <div>
          <NavBar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/games' element={<Games />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/games/:gameId' element={<GameDetails />} />
            <Route path="/review/:gameId" element={<ReviewForm />} />
            <Route path="/edit-review/:reviewId" element={<EditReviewForm />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path='/created-game' element={<CreatedGameCard />} />

          </Routes>
        </div>
    </Router>
  );
}

export default App;