// components/Movie/MovieList.js
// MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onEdit, onDelete }) => {
  return (
    <div className="row justify-content-start">
      {movies.map(movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onEdit={() => onEdit(movie)} // 여기서 movie 객체를 전달
          onDelete={() => onDelete(movie.id)} 
        />
      ))}
    </div>
  );
};

export default MovieList;