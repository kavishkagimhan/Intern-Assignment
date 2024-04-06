import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllLocations from './components/AllLocations';
import NavBar from './components/NavBar';
import ViewLocation from './components/ViewLocation';
import AddLocation from './components/AddLocation';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <Router>
        <NavBar/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<AllLocations />} />
          <Route path="/location/:id" element={<ViewLocation />} />
          <Route path="/addLocation" element={<AddLocation />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App