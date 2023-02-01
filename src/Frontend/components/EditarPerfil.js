import React, { useState } from "react";
import InfoMatricula from "../pages/InfoMatricula";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Formulario.css';

export default function EditarPerfil(props) {
  /// Tenemos que manejar que ocurre cuando cambia el contenido del formulario.(el usuario escribe)
  const [input, setInput] = useState([]);

  // Se recibe como argumento un evento, este valor nos va a permitir que la pagina
  // se vuelva a cargar cuando se envie el formulario.
  /// Esta función almacenará los datos en un useState para luego ser enviados
  const cargarDatos = e => {
    e.preventDefault(); ///->Evita que se vuelva a carga la app al enviar el formulario.

    var infraccion = document.getElementById("infraccion");
    var fecha = document.getElementById("fecha");

    var a = infraccion.value;
    var b = fecha.value;

    const delitos = [{ a, b }, ...input];

    setInput(delitos);

    document.getElementById("infraccion").value = "";
    document.getElementById("fecha").value = "";
  }

  /// Obtener datos individuales de un objeto del array
  const multasHechas = () => {
    var extra;
    input.map(multa => {
      /// Convirtiendo a un objeto JSON
      extra = JSON.stringify(multa);
      console.log(`Objeto JSON: ${extra}\n`);

      /// Convertir el objeto JSON en un objeto normal
      var dato = JSON.parse(extra);
      const {a, b} = dato
      console.log(`Elementos del objeto: ${a} y ${b}\n`);
    });
  }

  /// Esta función se encargará de enviar los datos a la BlockChain mediante el Smart Contract
  const manejarEnvio = e => {
    e.preventDefault();

    cargarDatos();

    console.log(`Datos Enviados a la BlockChain: ${input}`);

    /// •onSubmit -> Función que se pasará como parámetro mediante un prop. (el nombre es un estandar)
    /// Se le pasarán las multas realizadas mediante 'input' y luego se operará con "multasHechas" para obtener
    /// sus valores individuales. 
    props.onSubmit(input);
  }

  return (
    <>
      <div className="p-3 pe-5 ps-5">
        <InfoMatricula matricula={props.matricula} />
      </div>
      <div className='fondo pt-5'>
        <Container>
          <h1 className="h5"><b>INGRESE LOS NUEVOS DATOS</b></h1>
          <br />
          <form onSubmit={cargarDatos}>
            <Row>
              <Col sm={12} md={8} lg={8}>
                <h5 className='h5'>Infraccion</h5>
                <input
                  className="input"
                  type='text'
                  placeholder='Ingrese la infracción cometida'
                  name='Texto'
                  id="infraccion"
                  required
                />
              </Col>
              <Col sm={12} md={4} lg={4}>
                <h5 className='h5'>Fecha</h5>
                <input
                  type='datetime-local'
                  name='Texto'
                  id="fecha"
                  required
                />
              </Col>
            </Row>
            <br /><br />
            <Row>
              <button className="boton3">
                Añadir otra
              </button>
            </Row>
            <br />
            <button className="boton4" onClick={manejarEnvio}>
              <b>Guardar</b>
            </button>
          </form>
        </Container>
      </div>
    </>
  )
}