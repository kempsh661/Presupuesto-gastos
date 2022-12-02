import React from "react";
import { useState, useEffect } from "react";

const Control = ({ presupuesto, gastos }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponble = presupuesto - totalGastado;
    setDisponible(totalDisponble);
    setGastado(totalGastado);
  }, [gastos]);

  const formato = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>Grafica aqui</p>
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span>
          {formato(presupuesto)}
        </p>
        <p>
          <span>Disponible: </span>
          {formato(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formato(gastado)}
        </p>
      </div>
    </div>
  );
};

export default Control;
