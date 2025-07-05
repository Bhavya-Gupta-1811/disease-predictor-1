import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useState } from "react";

export const Header = () => {
  const { isLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header>
        <div className="container">
          <div className="grid navbar-grid">
            <div className="Logo">
              <NavLink to="/">
                <h1>MediX</h1>
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <nav className="menu-web">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/Predict">Predict</NavLink>
                </li>
                <li>
                  <NavLink to="/Contact">Contact</NavLink>
                </li>
                {isLoggedIn ? (
                  <li>
                    <NavLink to="/Logout">Logout</NavLink>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to="/Login">Login</NavLink>
                    </li>
                    <li>
                      <NavLink to="/Register">Register</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            {/* Hamburger icon */}
            <div
              className={`hamburger-icon ${menuOpen ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Mobile menu */}
          <ul className={`mobile-nav ${menuOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Predict" onClick={closeMenu}>
                Predict
              </NavLink>
            </li>
            <li>
              <NavLink to="/Contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/Logout" onClick={closeMenu}>
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/Login" onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Register" onClick={closeMenu}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};
