import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5><i className="fas fa-film me-2"></i>Movie Collection</h5>
            <p className="mb-0">영화 정보 관리 서비스</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="mb-2">
              <i className="fas fa-user me-2"></i>Movie Management System
            </div>
            <div>
              <i className="fas fa-code me-2"></i>Developed with React
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;