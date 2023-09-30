import { useState } from 'react';
import logo from '../../assets/images/logo1.png';
import { NavLink, useLocation } from 'react-router-dom'; // Import useLocation
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get current route location

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isHomePage = location.pathname === '/home'; // Check if it's the home page

  return (
    <div className={`navbar ${isHomePage ? 'home-navbar' : ''}`}> {/* Conditionally apply home-navbar class */}
      <img className="navbar_logo" src={logo} alt="logo" />
      <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        {isMenuOpen ? (
          <div className="close-icon">X</div>
        ) : (
          <>
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </>
        )}
      </div>

      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <NavLink to="/home" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/characters" onClick={closeMenu}>
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink to="/episodes" onClick={closeMenu}>
              Episodes
            </NavLink>
          </li>
          <li>
            <NavLink to="/locations" onClick={closeMenu}>
              Locations
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;




  

