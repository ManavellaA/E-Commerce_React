import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './NavBar.css'

const NavBar = () => {
    return (
        <>
          <a className="d-flex align-items-center justify-content-center m-4 text-decoration-none text-black brand" href="">Ayelen Galvan</a>

          <nav className="navbar navbar-expand-lg navbar-light nav">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse align-items-center justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link itemNav" href="">Inicio</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link itemNav" href="">Ropa de Dama</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link itemNav" href="">Ropa de Hombre</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link itemNav" href="">Accesorios</a>
                  </li>
                  <li className="nav-item">
                  <a className="nav-link itemNav" href="">Contacto</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
    )
};

export default NavBar