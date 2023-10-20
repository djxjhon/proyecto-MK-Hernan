// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../Estilos/modo.css';
import {Link} from 'react-router-dom';
import Boton from './Boton';

const Modo = () => {
  return (
    <div className="container-seleccion-juego">
      <Link to="/seleccionar">
        <Boton Nombre="Torneo"></Boton>
      </Link>
      <Link to="/Invasion">
        <Boton Nombre="Invasion"></Boton>
      </Link>
    </div>
  );
}

export default Modo;


