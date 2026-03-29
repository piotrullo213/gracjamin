import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Materials from './pages/Materials';
import Progress from './pages/Progress';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="materialy" element={<Materials />} />
        <Route path="postepy" element={<Progress />} />
      </Route>
    </Routes>
  );
}

export default App;
