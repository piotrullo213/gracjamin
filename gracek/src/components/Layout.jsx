import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="navbar-container container">
          <div className="navbar-logo">
            <span className="logo-accent">INF.04</span> Master
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Strona Główna</Link>
            </li>
            <li className="nav-item">
              <Link to="/materialy" className="nav-link">Materiały</Link>
            </li>
            <li className="nav-item">
              <Link to="/postepy" className="nav-link">Postępy</Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="container text-center">
          <p>© {new Date().getFullYear()} Przygotowanie do INF.04. Powodzenia na egzaminie!</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
