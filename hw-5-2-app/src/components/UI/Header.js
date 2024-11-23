import React from 'react';

const Header = () => {
  return (
    <header className="bg-dark text-white py-4 mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <i className="fas fa-film fa-2x me-3"></i>
            <h1 className="mb-0" style={{ fontSize: '1.5rem' }}>Movie Collection</h1>
          </div>
          <nav>
            <button 
              className="btn btn-outline-light"
              onClick={() => window.location.href = '/list'}
            >
              <i className="fas fa-home me-2"></i>Home
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;