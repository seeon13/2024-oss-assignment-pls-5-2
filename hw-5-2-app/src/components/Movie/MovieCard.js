// components/Movie/MovieCard.js
import React from 'react';

const MovieCard = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={movie.posterUrl || '/api/placeholder/300/400'}
          className="card-img-top"
          alt={movie.title}
          onError={(e) => {
            e.target.src = '/api/placeholder/300/400';
          }}
        />
        <div className="card-header">
        <h5 className="main-title mb-0">{movie.title}</h5> {/* main-title로 변경 */}
        </div>
        <div className="card-body">
          <div className="movie-info" style={{ padding: '15px', background: 'rgba(52, 73, 94, 0.03)', borderRadius: '10px', marginTop: '10px' }}>
            <p className="card-text">
              <i className="fas fa-calendar-alt mr-2"></i>개봉: {movie.year}년
            </p>
            <p className="card-text">
              <i className="fas fa-theater-masks mr-2"></i>장르: {movie.genre}
            </p>
            <p className="card-text">
              <i className="fas fa-clock mr-2"></i>상영시간: {movie.runtime}분
            </p>
            <p className="card-text">
              <i className="fas fa-users mr-2"></i>관객: {movie.audience.toLocaleString()}명
            </p>
          </div>
          <div className="btn-group-movie d-flex justify-content-between" style={{ marginTop: '15px' }}>
            <button className="btn btn-outline-primary" onClick={onEdit}>
              <i className="fas fa-edit mr-1"></i>수정
            </button>
            <button className="btn btn-outline-danger" onClick={onDelete}>
              <i className="fas fa-trash-alt mr-1"></i>삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
