// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import RegisterCompany from './pages/registerCompany';
import RegisterCreator from './pages/registerCreator';
// Importa tus otros componentes acá cuando los tengas, por ejemplo:
// import Register from './pages/Register';
// import Request from './pages/Request';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/registerCompany" element={<RegisterCompany/>} />
          <Route path="/registerCreator" element={<RegisterCreator/>} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/request" element={<Request />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
