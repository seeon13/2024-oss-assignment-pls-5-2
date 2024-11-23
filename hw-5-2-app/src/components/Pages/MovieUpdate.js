import React, { useState, useEffect, useRef } from 'react';

const MovieUpdate = () => {
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    genre: '',
    runtime: '',
    audience: '',
    directors: '',
    actors: '',
    synopsis: ''
  });
  const [loading, setLoading] = useState(true);
  const [editCount, setEditCount] = useState(0);

  // 유효성 검사를 위한 useRef
  const titleRef = useRef();
  const yearRef = useRef();
  const runtimeRef = useRef();
  const audienceRef = useRef();
  
  // URL에서 id 가져오기
  const id = window.location.pathname.split('/')[2];

  useEffect(() => {
    fetch(`https://672dfba9fd897971564488cd.mockapi.io/Movies/${id}`)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
        setLoading(false);
      });
  }, [id]);

  // 입력값 유효성 검사
  const validateInput = (name, value) => {
    switch (name) {
      case 'title':
        if (value.trim() === '') {
          alert('영화 제목은 필수 입력값입니다.');
          return false;
        }
        return true;

      case 'year':
        const yearNum = Number(value);
        if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear()) {
          alert('올바른 개봉년도를 입력해주세요.');
          return false;
        }
        return true;

      case 'runtime':
        const runtimeNum = Number(value);
        if (isNaN(runtimeNum) || runtimeNum <= 0) {
          alert('올바른 상영시간을 입력해주세요.');
          return false;
        }
        return true;

      case 'audience':
        const audienceNum = Number(value);
        if (isNaN(audienceNum) || audienceNum < 0) {
          alert('올바른 관객 수를 입력해주세요.');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  // 입력값 변경 시 API 호출
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 값이 실제로 변경되었는지 확인
    if (movie[name] === value) {
      return; // 값이 같으면 아무 작업도 하지 않음
    }
  
    // 먼저 로컬 상태 업데이트
    setMovie(prev => ({
      ...prev,
      [name]: value
    }));
  
    // 디바운싱 타이머 설정 (1초로 증가)
    const timer = setTimeout(() => {
      // API 호출 전 유효성 검사
      if (!validateInput(name, value)) {
        return;
      }
  
      const updatedMovie = { ...movie, [name]: value };
    
      fetch(`https://672dfba9fd897971564488cd.mockapi.io/Movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie)
      })
        .then(response => response.json())
        .then(data => {
          setMovie(data);
          // 성공적으로 API 호출이 완료되었을 때만 수정 횟수 증가
          setEditCount(prev => prev + 1);
        })
        .catch(error => console.error('Error updating movie:', error));
    }, 1000); // 1초로 증가
  
    return () => clearTimeout(timer);
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (!movie) {
    return <div className="container mt-5">Movie not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">영화 정보 수정</h3>
          <span className="badge bg-primary">총 수정 횟수: {editCount}회</span>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img
                src={movie.posterUrl || '/api/placeholder/300/400'}
                className="img-fluid rounded"
                alt={movie.title}
                onError={(e) => {
                  e.target.src = '/api/placeholder/300/400';
                }}
              />
            </div>
            <div className="col-md-8">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">제목</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={movie.title}
                    onChange={handleInputChange}
                    ref={titleRef}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">개봉년도</label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    name="year"
                    value={movie.year}
                    onChange={handleInputChange}
                    ref={yearRef}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">장르</label>
                  <input
                    type="text"
                    className="form-control"
                    id="genre"
                    name="genre"
                    value={movie.genre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="runtime" className="form-label">상영시간 (분)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="runtime"
                    name="runtime"
                    value={movie.runtime}
                    onChange={handleInputChange}
                    ref={runtimeRef}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="audience" className="form-label">관객수</label>
                  <input
                    type="number"
                    className="form-control"
                    id="audience"
                    name="audience"
                    value={movie.audience}
                    onChange={handleInputChange}
                    ref={audienceRef}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="directors" className="form-label">감독</label>
                  <input
                    type="text"
                    className="form-control"
                    id="directors"
                    name="directors"
                    value={movie.directors}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="actors" className="form-label">출연 배우</label>
                  <input
                    type="text"
                    className="form-control"
                    id="actors"
                    name="actors"
                    value={movie.actors}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="synopsis" className="form-label">시놉시스</label>
                  <textarea
                    className="form-control"
                    id="synopsis"
                    name="synopsis"
                    value={movie.synopsis}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => window.location.href = `/detail/${id}`}
                >
                  <i className="fas fa-arrow-left me-2"></i>돌아가기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieUpdate;