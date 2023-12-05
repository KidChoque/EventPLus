import React, { useContext } from "react";
import logoMobile from "../../assets/icons/logo-white.svg";
import logoDesktop from "../../assets/icons/logo-pink.svg";
import { Link } from "react-router-dom";
import "./Nav.css";
import { UserContext } from "../../context/AuthContext";
const Nav = ({ exibeNavbar, setExibeNavbar }) => {
  const { userData } = useContext(UserContext);

  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
      <span
        onClick={() => {
          setExibeNavbar(false);
        }}
        className="navbar__close "
      >
        x
      </span>
      <Link to="/" className="eventlogo">
        <img
          className="eventlogo__logo-image"
          src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
          alt="Event Plus Logo"
        />
      </Link>

      <div className="navbar__items-box">
        <Link to="/" className="navbar__item">
          Home
        </Link>

        {userData.nome && userData.role === "Adm" ? (
          <>
            <Link to="/tipos-evento" className="navbar__item">
              Tipos de Evento
            </Link>
            <Link to="/eventos" className="navbar__item">
              Eventos
            </Link>{" "}
          </>
        ) : userData.nome && userData.role === "comum" ? (
          <Link to="/eventos-aluno" className="navbar__item">
            Eventos Aluno
          </Link>
        ) : null}

        <Link to="/teste" className="navbar__item">
          Usuários
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
