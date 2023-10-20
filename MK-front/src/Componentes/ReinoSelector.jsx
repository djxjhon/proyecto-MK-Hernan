import React, { useState, useEffect } from "react";
import { reinos } from "../Data/Reinos";
import "../Estilos/ReinoSelector.css";
import { characters } from "../Data/Characters";
import Boton from "./Boton";
import { Link } from "react-router-dom";

function Reinoselector() {
  const [selectedReino, setSelectedReino] = useState(null);
  const [reinoCharacters, setReinoCharacters] = useState([]);

  const handlereinoselect = (Reino) => {
    setSelectedReino(Reino);
  };

  useEffect(() => {
    // Filtrar la lista de personajes por el reino seleccionado
    if (selectedReino) {
      const filteredCharacters = characters.filter(
        (character) => character.realm === selectedReino.name
      );
      setReinoCharacters(filteredCharacters);
    } else {
      // Si no se selecciona ningún reino, la lista de personajes está vacía
      setReinoCharacters([]);
    }
  }, [selectedReino]);

  return (
    <div className="container1">
      <h1 className="Titulo">Selecciona un Reino.</h1>
      <ul className="realm-list2">
        {reinos.map((Reino) => (
          <li
            key={Reino.id}
            onClick={() => handlereinoselect(Reino)}
            className={selectedReino === Reino ? "selected-reino" : ""}
          >
            <img id="reinos"
              src={`/src/Images/${Reino.image}`} // Ruta de la imagen GIF
              alt={Reino.name}
              className="realm-image"

            />
            <br />
            <b>{Reino.name}</b>
          </li>
        ))}
      </ul>
      {selectedReino && (
        <div>
          <h1 className="Titulo">Personajes del Reino {selectedReino.name}</h1>
          <ul className="character-list">
            {reinoCharacters.map((character) => (
              <li key={character.id}>
                <img id="person"
                  src={`/src/Images/${character.image}`} // Ruta de la imagen GIF
                  alt={character.name}
                  className="realm-image"
                />
                <br></br>
                <b>{character.name}</b>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
      <Link to="/">
          <Boton Nombre="Regresar" />
        </Link>
      </div>
    </div>
  );
}
export default Reinoselector;