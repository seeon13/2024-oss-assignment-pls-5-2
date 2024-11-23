import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShowList from './components/Pages/ShowList';
import MovieDetail from './components/Pages/MovieDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<ShowList />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/" element={<Navigate to="/list" replace />} />
      </Routes>
    </Router>
  );
};

export default App;