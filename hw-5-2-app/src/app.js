import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShowList from './components/Pages/ShowList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<ShowList />} />
        <Route path="/" element={<Navigate to="/list" replace />} />
      </Routes>
    </Router>
  );
};

export default App;