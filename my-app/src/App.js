// App.js

import React from 'react';
import { BrowserRouter as Router, Route,Routes,Navigate } from 'react-router-dom';
import Auth from './auth';
import Home from './Home';
import Matches from './Matches';
import Teams from './Teams';
import Contact from './Contact';
import About from './About';
import MatchDetails from './MatchDetails';

const App = () => {
  return (
    <Router>
       <div style={styles.background}>
      <Routes>
      <Route exact path="/" element={<Navigate to="/auth" />} /> Redirect to /auth
        <Route exact path="/auth" element={<Auth/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/matches" element={<Matches/>} />
        <Route exact path="/teams" element={<Teams/>} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/matchDetails/:matchId" element={<MatchDetails />} />


      </Routes>
      </div>
    </Router>
  );
};
const styles = {
  background: {
    backgroundImage: 'url(/background.jpg)',
    backgroundSize: 'cover',
    height: '100vh',
    padding: 0,
    margin:-8
  },
};
export default App;
