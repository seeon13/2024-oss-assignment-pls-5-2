import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ShowList from './components/Pages/ShowList';
import MovieDetail from './components/Pages/MovieDetail';
import MovieUpdate from './components/Pages/MovieUpdate';
import MovieCreate from './components/Pages/MovieCreate';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/list" element={<ShowList />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/update/:id" element={<MovieUpdate />} />
        <Route path="/create" element={<MovieCreate />} />
        <Route path="/" element={<Navigate to="/list" />} />
      </Routes>
    </div>
  );
};

export default App;