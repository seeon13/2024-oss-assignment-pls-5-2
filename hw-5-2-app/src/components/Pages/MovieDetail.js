import React, { useState, useEffect } from 'react';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // URL에서 id 파라미터 가져오기
  const id = window.location.pathname.split('/')[2];

  useEffect(() => {
    fetch(`https://672dfba9fd897971564488cd.mockapi.io/Movies/${id}`)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (!movie) {
    return <div className="container mt-5">Movie not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="row g-0">
          {/* 왼쪽 포스터 섹션 */}
          <div className="col-md-4">
            <img
              src={movie.posterUrl || '/api/placeholder/300/400'}
              className="img-fluid rounded-start"
              alt={movie.title}
              onError={(e) => {
                e.target.src = '/api/placeholder/300/400';
              }}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          
          {/* 오른쪽 상세 정보 섹션 */}
          <div className="col-md-8">
            <div className="card-body">
              {/* 기본 정보 */}
              <h2 className="card-title mb-4">{movie.title}</h2>
              
              {/* 기존 정보 (간단히 표시) */}
              <div className="basic-info mb-4">
                <p className="card-text mb-2">
                  <span className="text-muted">개봉년도:</span> {movie.year}년
                  <span className="mx-2">|</span>
                  <span className="text-muted">장르:</span> {movie.genre}
                  <span className="mx-2">|</span>
                  <span className="text-muted">상영시간:</span> {movie.runtime}분
                </p>
                <p className="card-text">
                  <span className="text-muted">누적 관객:</span> {movie.audience.toLocaleString()}명
                </p>
              </div>
              
              {/* 구분선 */}
              <hr className="my-4" />
              
              {/* 새로운 상세 정보 */}
              <div className="detailed-info">
                {/* 감독 정보 */}
                <div className="mb-4">
                  <h5 className="text-primary">
                    <i className="fas fa-film me-2"></i>감독
                  </h5>
                  <p className="ms-4">{movie.directors}</p>
                </div>
                
                {/* 배우 정보 */}
                <div className="mb-4">
                  <h5 className="text-primary">
                    <i className="fas fa-user-friends me-2"></i>출연 배우
                  </h5>
                  <p className="ms-4">{movie.actors}</p>
                </div>
                
                {/* 시놉시스 */}
                <div className="mb-4">
                  <h5 className="text-primary">
                    <i className="fas fa-book-open me-2"></i>시놉시스
                  </h5>
                  <p className="ms-4">{movie.synopsis}</p>
                </div>
              </div>

              {/* 버튼 영역 */}
              <div className="mt-4">
                <button 
                  className="btn btn-primary me-2"
                  onClick={() => window.location.href = `/update/${id}`}
                >
                  <i className="fas fa-edit me-2"></i>수정
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => window.location.href = '/list'}
                >
                  <i className="fas fa-arrow-left me-2"></i>목록으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;