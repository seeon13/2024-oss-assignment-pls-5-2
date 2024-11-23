import React, { useState, useRef } from 'react';

const MovieCreate = () => {
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    genre: '',
    runtime: '',
    audience: '',
    directors: '',
    actors: '',
    synopsis: '',
    posterUrl: ''
  });

  // 유효성 검사를 위한 useRef
  const titleRef = useRef();
  const yearRef = useRef();
  const runtimeRef = useRef();
  const audienceRef = useRef();

  // 입력값 유효성 검사
  const validateInput = (name, value) => {
    switch (name) {
      case 'title':
        if (value.trim() === '') {
          titleRef.current.setCustomValidity('영화 제목을 입력해주세요.');
          return false;
        }
        titleRef.current.setCustomValidity('');
        return true;

      case 'year':
        const yearNum = Number(value);
        if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear()) {
          yearRef.current.setCustomValidity('올바른 개봉년도를 입력해주세요.');
          return false;
        }
        yearRef.current.setCustomValidity('');
        return true;

      case 'runtime':
        const runtimeNum = Number(value);
        if (isNaN(runtimeNum) || runtimeNum <= 0) {
          runtimeRef.current.setCustomValidity('올바른 상영시간을 입력해주세요.');
          return false;
        }
        runtimeRef.current.setCustomValidity('');
        return true;

      case 'audience':
        const audienceNum = Number(value);
        if (isNaN(audienceNum) || audienceNum < 0) {
          audienceRef.current.setCustomValidity('올바른 관객 수를 입력해주세요.');
          return false;
        }
        audienceRef.current.setCustomValidity('');
        return true;

      default:
        return true;
    }
  };

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 저장 버튼 핸들러
  const handleSave = () => {
    // 모든 필수 필드의 유효성 검사
    if (!validateInput('title', movie.title) || 
        !validateInput('year', movie.year) || 
        !validateInput('runtime', movie.runtime) || 
        !validateInput('audience', movie.audience)) {
      return;
    }

    // API 호출하여 저장
    fetch('https://672dfba9fd897971564488cd.mockapi.io/Movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie)
    })
      .then(response => response.json())
      .then(() => {
        alert('새 영화가 추가되었습니다.');
        window.location.href = '/list';
      })
      .catch(error => {
        console.error('Error creating movie:', error);
        alert('영화 추가 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">새 영화 추가</h3>
        </div>
        <div className="card-body">
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
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="posterUrl" className="form-label">포스터 URL</label>
              <input
                type="text"
                className="form-control"
                id="posterUrl"
                name="posterUrl"
                value={movie.posterUrl}
                onChange={handleInputChange}
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
                required
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
                required
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
                required
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
            <div className="d-flex gap-2">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleSave}
              >
                <i className="fas fa-save me-2"></i>저장하기
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => window.location.href = '/list'}
              >
                <i className="fas fa-arrow-left me-2"></i>목록으로
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieCreate;