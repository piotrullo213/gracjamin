import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Progress from './pages/Progress';
import Materials from './pages/Materials';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materialy" element={<Materials />} />
        <Route path="/postepy" element={<Progress />} />
      </Routes>
    </Layout>
  );
}

export default App;
