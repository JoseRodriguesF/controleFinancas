import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Balance from './components/Balance';
import FixedEarnings from './components/FixedEarnings';
import FixedExpenses from './components/FixedExpenses';
import PieChart from './components/PieChart';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Balance />} />
            <Route path="/earnings" element={<FixedEarnings />} />
            <Route path="/expenses" element={<FixedExpenses />} />
            <Route path="/chart" element={<PieChart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;