import React from "react";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

const Control = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0);
    const totalDisponble = presupuesto - totalGastado;
    const nuevoPorcentaje = (((presupuesto-totalDisponble)/presupuesto)*100).toFixed(2);
    
    setDisponible(totalDisponble);
    setGastado(totalGastado);
    setTimeout(() =>{
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const formato = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  const handleReset =() =>{
    const resultado = confirm('¿Deseas reiniciar la App?')
    if(resultado){
      setGastos([])
      setPresupuesto([0])
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button
        className="reset-app"
        type="button"
        onClick={handleReset}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span>
          {formato(presupuesto)}
        </p>
        <p className={`${disponible <0 ? 'negativo': ''}`}>
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
