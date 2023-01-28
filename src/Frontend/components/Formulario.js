import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Formulario.css';
import { Toaster, toast } from 'react-hot-toast';

import Card from 'react-bootstrap/Card';
import pic from '../img/profile_pic.png';

function CampoBusqueda() {
  // Tenemos que manejar que ocurre cuando cambia el contenido del formulario.(el usuario escribe)
  const [input, setInput] = useState('');
  const [existe, setExiste] = useState(false);

  //! Conectar con la BlockChain para consultar la existencia de tal matricula
  let matriculas = ["matricula1", "abc123"];

  const manejarCambio = e => {
    // e.target.value => nos va a permitir extraer el valor del campo de texto que introdujo el usuario.
    setInput(e.target.value);
  }

  // Se recibe como argumento un evento, este valor nos va a permitir que la pagina
  // se vuelva a cargar cuando se envie el formulario.
  const manejarEnvio = e => {
    e.preventDefault(); //->Evita que se vuelva a carga la app al enviar el formulario.

    /// Capturar matricula ingresada 
    var encontrada = false;
    matriculas.forEach(function (elemento, indice, array) {
      if (input == elemento) {
        encontrada = true;
        setExiste(true);
      }
    })
    encontrada ? toast.success('¡Busqueda exitosa!')
      :
      toast.error("Matricula no encontrada 🙁")
  }

  let contenido;
  if (existe) {
    contenido = <> <h5>MATRICULA HALLADA CON EXITO</h5> </>
  } else {
    contenido =
      <div className="centrado cuerpo">
        <h5>Matricula</h5>
        <form onSubmit={manejarEnvio} >
          <input
            className="buscador"
            type='text'
            placeholder='Matricula a Buscar'
            name='Texto'
            onChange={manejarCambio}
            required
          />
          <br />
          <button className="boton">
            BUSCAR
          </button>
        </form>
      </div>
  }

  return (
    <>
      {contenido}
    </>
  );
}

//* Componente que contiene el formulario para registrar un vehiculo
function Formulario(props) {
  /// Tenemos que manejar que ocurre cuando cambia el contenido del formulario.(el usuario escribe)
  const [input, setInput] = useState([""]);

  // Se recibe como argumento un evento, este valor nos va a permitir que la pagina
  // se vuelva a cargar cuando se envie el formulario.
  const manejarEnvio = e => {
    e.preventDefault(); ///->Evita que se vuelva a carga la app al enviar el formulario.

    var nombres = document.getElementById("nombre");
    var fechaEmision = document.getElementById("fechaEmision");
    var fechaVencimiento = document.getElementById("fechaVencimiento");
    var modelo = document.getElementById("modelo");
    var matricula = document.getElementById("matricula");

    setInput([nombres.value, fechaEmision.value, fechaVencimiento.value, modelo.value, matricula.value]);

    console.log("Datos pasados: ", input);

    ///•onSubmit -> Función que se pasará como parámetro mediante un prop. (el nombre es un estandar)
    props.onSubmit(input);
  }

  let content;
  if (props.opcion == 1) {
    content =
      <div className='fondo centrado'>
        <h1 className="h5">Ingrese los datos del usuario</h1>
        <br />
        <Container>
          <br />
          <form onSubmit={manejarEnvio}>
            <Row>
              <Col sm={12} md={12} lg={4} >
                <Card style={{ width: '16rem' }} className="mx-auto d-block">
                  <Card.Img variant="top" src={pic} />
                </Card>
              </Col>
              <Col sm={12} md={12} lg={8}>
                <Row sm={12} md={12} lg={12}>
                  <h5 className='h5'>Nombres y Apellidos</h5>
                  <input
                    type='text'
                    placeholder='Ejemplo DBA-005'
                    name='Texto'
                    id="nombre"
                    required
                  />
                </Row>
                <br />
                <Row>
                  <Col sm={12} md={12} lg={6}>
                    <h5 className='h5'>Emision del carnet</h5>
                    <input
                      type='datetime-local'
                      placeholder='Ejemplo DBA-005'
                      name='Texto'
                      id="fechaEmision"
                      required
                    />
                  </Col>
                  <Col sm={12} md={12} lg={6}>
                    <h5 className='h5'>Vencimiento</h5>
                    <input
                      type='datetime-local'
                      placeholder='Ejemplo DBA-005'
                      name='Texto'
                      id="fechaVencimiento"
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={12} md={12} lg={6}>
                    <h5 className='h5'>Modelo del vehiculo</h5>
                    <input
                      type='text'
                      placeholder='Ejm: Nisan 2010'
                      name='Texto'
                      id="modelo"
                      required
                    />
                  </Col>
                  <Col sm={12} md={12} lg={6}>
                    <h5 className='h5'>Matricula</h5>
                    <input
                      type='text'
                      placeholder='Ejemplo: DBA-005'
                      name='Texto'
                      id="matricula"
                      required
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <br />
            <button className="boton2">
              REGISTRAR
            </button>
          </form>
        </Container>
        <br />
        <p>Crear una función para actualizar información de acuerdo a una matricula</p>
      </div>
  } else {
    content = <><CampoBusqueda /></>
  }

  return (
    <div>
      <Toaster />
      {content}
    </div>
  );
}

export default Formulario;
