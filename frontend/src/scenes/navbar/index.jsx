import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state/index.js";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Add mode state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = window.innerWidth >= 1000;

  const fullName = `${user.firstName} ${user.lastName}`;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(setMode());
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? "bg-light" : "bg-dark"}`}>
      <div className="container-fluid">
        <div className="navbar-brand" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
          <h1 style={{ color: "#39FF14", fontWeight: "bold", padding: "10px" }}>
            INSTAKILO
          </h1>
        </div>

        {isNonMobileScreens && (
          <form className="d-flex" role="search" style={{ gap: "1rem"}}>
            <input className="form-control me-2" type="search" placeholder="Search..." />
            <button className="btn btn-outline-success" type="submit" style={{backgroundColor:"#39FF14"}}>
              <i className="bi bi-search" ></i>
            </button>
          </form>
        )}

        <div className={`collapse navbar-collapse ${isMobileMenuToggled ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn" onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <i className="bi bi-sun" style={{color:"black"}}></i>
                ) : (
                  <i className="bi bi-moon" style={{color:"white"}}> </i>
                )}
              </button>
            </li>
            <li className="nav-item" >
            <button className="btn">
                {isDarkMode ? (
                  <i className="bi bi-chat-dots" style={{color:"black"}}></i>
                ) : (
                  <i className="bi bi-chat-dots" style={{color:"white"}}> </i>
                )}
              </button>
            </li>
            <li className="nav-item">
            <button className="btn">
                {isDarkMode ? (
                  <i className="bi bi-bell" style={{color:"black"}}></i>
                ) : (
                  <i className="bi bi-bell" style={{color:"white"}}> </i>
                )}
              </button>
            </li>
            <li className="nav-item">
            <button className="btn" >
                {isDarkMode ? (
                  <i className="bi bi-question-circle" style={{color:"black"}}></i>
                ) : (
                  <i className="bi bi-question-circle" style={{color:"white"}}> </i>
                )}
              </button>
            </li>
            <li className="nav-item dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" style={{color:"#39FF14"}} >
                {fullName}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={() => dispatch(setLogout())}>
                    Log Out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {!isNonMobileScreens && (
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
