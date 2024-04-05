import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllLocations from './components/AllLocations';
import NavBar from './components/NavBar';
import ViewLocation from './components/ViewLocation';

const App = () => {
  return (
    <div>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<AllLocations />} />
          <Route path="/location/:id" element={<ViewLocation />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App