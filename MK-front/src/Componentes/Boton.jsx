import React from 'react'
import "../Estilos/boton.css";

const  Boton = ({ Nombre, onClick }) =>{
  return (
    <button onClick={onClick} id="boton">
      {Nombre}
    </button>
  )
}

export default Boton