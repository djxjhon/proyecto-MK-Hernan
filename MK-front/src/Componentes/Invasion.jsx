import React, { useState } from "react";
import { reinos } from "../Data/Reinos";
import { characters } from "../Data/Characters";
import "../Estilos/invasion.css";
import Boton from "./Boton";
import { Link } from "react-router-dom";

export default function Invasion() {
  //Estado para seleccionar reinos
  const [selectedReino, setSelectedReino] = useState(null);
  const [selectedReinoObjetivo, setSelectedReinoObjetivo] = useState(null);
  const [reinoGanador, setReinoGanador] = useState(null);
  const [empate, setEmpate] = useState(false);

  // Estados para rastrear los personajes del atacante y el objetivo
  const [personajesAtacante, setPersonajesAtacante] = useState([]);
  const [personajesObjetivo, setPersonajesObjetivo] = useState([]);

  // Estado para almacenar los resultados
  const [resultados, setResultados] = useState(null);

  // Función para determinar el ganador
  function determinarGanador(reinoAtacante, reinoObjetivo) {
    if (reinoAtacante && reinoObjetivo) {
      // Cálculo de fuerza y defensa para determinar el ganador
      const fuerzaReinoAtacante = characters
        .filter((character) => character.realm === reinoAtacante.name)
        .reduce((totalFuerza, character) => totalFuerza + character.strength, 0);

      const defensaReinoObjetivo = characters
        .filter((character) => character.realm === reinoObjetivo.name)
        .reduce((totalDefensa, character) => totalDefensa + character.defense, 0);

      const diferencia = fuerzaReinoAtacante - defensaReinoObjetivo;

      // Establece el ganador o empate
      if (diferencia > 0) {
        setReinoGanador(reinoAtacante);
        setEmpate(false);
      } else if (diferencia < 0) {
        setReinoGanador(reinoObjetivo);
        setEmpate(false);
      } else {
        setReinoGanador(null);
        setEmpate(true);
      }

      // Filtra y almacena los personajes del atacante y el objetivo
      const personajesAtacante = characters.filter(
        (character) => character.realm === reinoAtacante.name
      );
      const personajesObjetivo = characters.filter(
        (character) => character.realm === reinoObjetivo.name
      );

      setPersonajesAtacante(personajesAtacante);
      setPersonajesObjetivo(personajesObjetivo);
    }
  }

  // Función para calcular resultados de la batalla
  function calcularResultados() {
    const personajesFallecidos = [];

    const resultados = personajesAtacante.map((personajeAtacante) => {
      const defensaObjetivo = personajesObjetivo.reduce(
        (totalDefensa, personajeObjetivo) =>
          totalDefensa + personajeObjetivo.defense,
        0
      );

      const fuerzaAtacante = personajeAtacante.strength;
      const diferencia = fuerzaAtacante - defensaObjetivo;

      // Clasifica a los personajes como destacados o fallecidos
      if (diferencia > 0) {
        return { personaje: personajeAtacante, resultado: "Destacado" };
      } else {
        personajesFallecidos.push(personajeAtacante);
        return { personaje: personajeAtacante, resultado: "Fallecido" };
      }
    });

    setResultados(resultados);

    // Puedes mostrar más información, como cuántos personajes murieron, cuáles destacaron, etc.
    console.log("Personajes fallecidos:", personajesFallecidos);
  }

  const handlereinoselect = (Reino) => {
    setSelectedReino(Reino);
  };

  const handleReinoObjetivoSelect = (Reino) => {
    setSelectedReinoObjetivo(Reino);
  };

  // Filtra los reinos disponibles para el ataque
  const reinosParaAtacar = reinos.filter((Reino) => Reino !== selectedReino);

  return (
    <div className="container2">
      <h1 className="Titulo_invasion">Selecciona un Reino como atacante</h1>
      <ul className="realm-list2">
        {reinos.map((Reino) => (
          <li
            key={Reino.id}
            onClick={() => handlereinoselect(Reino)}
            className={selectedReino === Reino ? "selected-reino" : ""}
          >
            <img
              id="reinos"
              src={`/src/Images/${Reino.image}`}
              alt={Reino.name}
              className="realm-image"
            />
            <br />
            <b>{Reino.name}</b>
          </li>
        ))}
      </ul>
      <h1 className="Titulo_invasion">Selecciona un Reino como objetivo</h1>
      <ul className="realm-list2">
        {reinosParaAtacar.map((Reino) => (
          <li
            key={Reino.id}
            onClick={() => handleReinoObjetivoSelect(Reino)}
            className={selectedReinoObjetivo === Reino ? "selected-reino" : ""}
          >
            <img
              id="reinos"
              src={`/src/Images/${Reino.image}`}
              alt={Reino.name}
              className="realm-image"
            />
            <br />
            <b>{Reino.name}</b>
          </li>
        ))}
      </ul>
      <Boton
        onClick={() => determinarGanador(selectedReino, selectedReinoObjetivo)}
        Nombre="Iniciar Batalla"
      />
      {reinoGanador && !empate && (
        <div>
          <h2
            style={{ color: reinoGanador === selectedReino ? "green" : "red" }}
          >
            Reino Ganador: {reinoGanador.name}
          </h2>
        </div>
      )}
      {empate && (
        <div>
          <h2>Empate</h2>
        </div>
      )}
      <Boton
        onClick={() => calcularResultados()}
        Nombre="Ver Resultados de la batalla"
      />
     {resultados && (
        <div className="container3">
          <h2 className="Titulo_invasion">Resultados del Ataque</h2>
          <ul>
            {resultados.map((resultado, index) => (
              <li
                key={index}
                style={{
                  color: resultado.resultado === "Destacado" ? "green" : "red",
                }}
              >
                {resultado.personaje.name} - {resultado.resultado}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <Link to="/">
          <Boton Nombre="Regresar" />
        </Link>
        <Boton
        onClick={() => window.location.reload()}
        Nombre="Reiniciar"
      />
      </div>
    </div>
  );
}




