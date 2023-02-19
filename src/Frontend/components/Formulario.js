import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditarPerfil from "./EditarPerfil";
import '../CSS/Formulario.css';
import { Toaster, toast } from 'react-hot-toast';
import getEvents from "../GetEvents";
import UploadImage from "./UploadImages";

function CampoBusqueda(props) {
  // Tenemos que manejar que ocurre cuando cambia el contenido del formulario.(el usuario escribe)
  const [input, setInput] = useState('');
  const [existe, setExiste] = useState(false)
  const [data, setData] = useState([]);

  const manejarCambio = e => {
    // e.target.value => nos va a permitir extraer el valor del campo de texto que introdujo el usuario.
    setInput(e.target.value);
  }
  // Se recibe como argumento un evento, este valor nos va a permitir que la pagina
  // se vuelva a cargar cuando se envie el formulario.
  const manejarEnvio = async (e) => {
    e.preventDefault(); //->Evita que se vuelva a carga la app al enviar el formulario.
    console.log(props.contrato)
    /// Comprobamos con los eventos emitidos en la BlockChain si la matricula que se busca existe
    const data = await getEvents(props.contrato, input)
    console.log("data", data)
    if (data[3] != "") {
      toast.success('¡Busqueda exitosa!')
      setExiste(true)
      setData(data)
    } else {
      /// En caso contrario, emitir una alerta
      toast.error("La matricula no esta en nuestro sistema 🙁")
    }

  }

  let contenido;
  if (existe) {
    contenido = <> <EditarPerfil data={data} contrato={props.contrato} /> </>
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
  // Se recibe como argumento un evento, este valor nos va a permitir que la pagina
  // se vuelva a cargar cuando se envie el formulario.
  const manejarEnvio = async (e) => {
    e.preventDefault(); ///->Evita que se vuelva a carga la app al enviar el formulario.

    var nombres = document.getElementById("nombre");
    var fechaEmision = document.getElementById("fechaEmision");
    // var fechaVencimiento = document.getElementById("fechaVencimiento"); /// NO USAR
    var modelo = document.getElementById("modelo");
    var matricula = document.getElementById("matricula");

    /// Enviamos a la BlokChain los datos capturados
    await (await props.contrato.addVehiculo(nombres.value, fechaEmision.value, modelo.value, matricula.value)).wait();
  }

  let content;
  if (props.opcion == 1) {
    content =
      <div className='fondo centrado'>
        <h1 className="h5">Ingrese los datos del usuario</h1>
        <br />
        <Container>
          <form onSubmit={manejarEnvio}>
            <Row>
              <Col sm={12} md={12} lg={4} className="centrarFormulario">
                <UploadImage />
              </Col>
              <Col className="centrarFormulario">
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
                      type='date'
                      placeholder='Ejemplo DBA-005'
                      name='Texto'
                      id="fechaEmision"
                      required
                    />
                  </Col>
                  <Col sm={12} md={12} lg={6}>
                    <h5 className='h5'>Vencimiento</h5>
                    <input
                      type='date'
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
          <br />
        </Container>
      </div>
  } else {
    content = <><CampoBusqueda contrato={props.contrato} /></>
  }

  return (
    <div>
      <Toaster />
      {content}
    </div>
  );
}

export default Formulario;
