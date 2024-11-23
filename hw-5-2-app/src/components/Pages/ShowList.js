import React, { useState, useEffect } from 'react';
import MovieList from '../Movie/MovieList';
import MovieModal from '../Movie/MovieModal';
import Button from '../UI/Button';

const ShowList = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    setIsLoading(true);
    setError('');
    fetch('https://672dfba9fd897971564488cd.mockapi.io/Movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies.');
        setIsLoading(false);
      });
  };

  const handleAddMovie = () => {
    window.location.href = '/create';
  };
  
  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleDeleteMovie = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      fetch(`https://672dfba9fd897971564488cd.mockapi.io/Movies/${id}`, {
        method: 'DELETE'
      })
        .then(() => fetchMovies())
        .catch(error => console.error('Error deleting movie:', error));
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center main-title">🎬 Movie Collection</h1>
      <div className="text-right my-4">
        <Button onClick={handleAddMovie}>
          <i className="fas fa-plus-circle mr-2"></i>Add New Movie
        </Button>
      </div>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <MovieList 
          movies={movies} 
          onEdit={handleEditMovie} 
          onDelete={handleDeleteMovie} 
        />
      )}
      {showModal && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setShowModal(false)}
          onSave={() => {
            fetchMovies();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ShowList;