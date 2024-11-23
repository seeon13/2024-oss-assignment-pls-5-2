import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://672dfba9fd897971564488cd.mockapi.io/Movies/${id}`)
      .then(response => response.json())
      .then(data => setMovie(data))
      .catch(error => console.error('Error fetching movie:', error));
  }, [id]);

  if (!movie) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={movie.posterUrl || '/api/placeholder/300/400'}
              className="img-fluid rounded-start"
              alt={movie.title}
              onError={(e) => {
                e.target.src = '/api/placeholder/300/400';
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{movie.title}</h2>
              <div className="movie-info mt-4">
                <p className="card-text">
                  <strong><i className="fas fa-calendar-alt me-2"></i>Release Year:</strong> {movie.year}
                </p>
                <p className="card-text">
                  <strong><i className="fas fa-theater-masks me-2"></i>Genre:</strong> {movie.genre}
                </p>
                <p className="card-text">
                  <strong><i className="fas fa-clock me-2"></i>Runtime:</strong> {movie.runtime} minutes
                </p>
                <p className="card-text">
                  <strong><i className="fas fa-users me-2"></i>Audience:</strong> {movie.audience.toLocaleString()} people
                </p>
              </div>
              <div className="mt-4">
                <Button 
                  variant="primary" 
                  className="me-2"
                  onClick={() => navigate(`/update/${id}`)}
                >
                  <i className="fas fa-edit me-2"></i>Edit
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/list')}
                >
                  <i className="fas fa-arrow-left me-2"></i>Back to List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;