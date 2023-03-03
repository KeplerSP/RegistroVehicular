import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditarPerfil from "./EditarPerfil";
import '../CSS/Formulario.css';
import { Toaster, toast } from 'react-hot-toast';
import getEvents from "../GetEvents";
import UploadImage from "./UploadImages";
import swal from 'sweetalert';
import Spinner from 'react-bootstrap/Spinner';
///Instanciamos IFPS || Ya tiene un nodo establecido en Infura
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { Buffer } from 'buffer';

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecret = process.env.REACT_APP_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth
  }
});

function CampoBusqueda(props) {
  // Tenemos que manejar que ocurre cuando cambia el contenido del formulario.(el usuario escribe)
  const [input, setInput] = useState('');
  const [existe, setExiste] = useState(false)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const manejarCambio = e => {
    // e.target.value => nos va a permitir extraer el valor del campo de texto que introdujo el usuario.
    setInput(e.target.value);
  }
  // Se recibe como argumento un evento, este valor nos va a permitir que la pagina
  // se vuelva a cargar cuando se envie el formulario.
  const manejarEnvio = async (e) => {
    e.preventDefault(); //->Evita que se vuelva a carga la app al enviar el formulario.
    console.log(props.contrato)
    setLoading(true)
    /// Comprobamos con los eventos emitidos en la BlockChain si la matricula que se busca existe
    const data = await getEvents(props.contrato, input)
    if (data[3] != "") {
      toast.success('¡Busqueda exitosa!')
      setExiste(true)
      setData(data)
    } else {
      /// En caso contrario, emitir una alerta
      setLoading(false)
      toast.error("La matricula no esta en nuestro sistema 🙁")
    }

  }

  let contenido;
  if (existe) {
    contenido = <> <EditarPerfil data={data} contrato={props.contrato} /> </>
  } else {
    contenido =
      <div className="centrado cuerpo">
        {loading ? (
          <>
            <h3>BUSCANDO DATOS...</h3>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
        ) : (
          <>
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
          </>
        )}
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
  // Capturar la imagen desde el archivo UploadImages
  const [selectedImage, setSelectedImage] = useState(null);

  const manejarEnvio = async (e) => {
    e.preventDefault(); ///->Evita que se vuelva a carga la app al enviar el formulario.

    let imageHash;
    try {
      const result = await client.add(selectedImage);  ///subir la imagen a ipfs
      console.log(result);
      imageHash = result.path;
    } catch (error) {
      console.log("ipfs image upload error: ", error);
    }

    var nombres = document.getElementById("nombre");
    var fechaEmision = document.getElementById("fechaEmision");
    var modelo = document.getElementById("modelo");
    var matricula = document.getElementById("matricula");

    /// Enviamos a la BlokChain los datos capturados
    await (await props.contrato.addVehiculo(nombres.value, fechaEmision.value, modelo.value, matricula.value.toUpperCase(), imageHash)).wait();

    swal("¡Los datos se enviaron correctamente!", {
      icon: "success",
      timer: "1850"
    });
  }

  const botonRegistrar = (e) => {
    e.preventDefault();

    swal({
      title: "ENVIAR DATOS",
      text: `Registrar los siguientes datos: 
      \nNombre: ${document.getElementById("nombre").value}
      \nFecha de emision: ${document.getElementById("fechaEmision").value}
      \nFecha de vencimiento: ${document.getElementById("fechaVencimiento").value}
      \nModelo: ${document.getElementById("modelo").value}
      \nMatricula: ${document.getElementById("matricula").value}
      \nImagen: ${selectedImage.name}`,
      icon: "info",
      buttons: ["CANCELAR", "ACEPTAR"],
    })
      .then((sendData) => {
        if (sendData) {
          manejarEnvio(e)
        } else {
          swal("Los datos no serán enviados");
        }
      });
  }

  let content;
  if (props.opcion == 1) {
    content =
      <div className='fondo centrado'>
        <h1 className="h5">Ingrese los datos del usuario</h1>
        <br />
        <Container>
          <form onSubmit={botonRegistrar}>
            <Row>
              <Col sm={12} md={12} lg={4} className="centrarFormulario">
                <UploadImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
              </Col>
              <Col className="centrarFormulario">
                <Row sm={12} md={12} lg={12}>
                  <h5 className='h5'>Nombres y Apellidos</h5>
                  <input
                    type='text'
                    placeholder='Ejemplo: Joshep Joestar'
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
                      name='Texto'
                      id="fechaEmision"
                      required
                    />
                  </Col>
                  <Col sm={12} md={12} lg={6}>
                    <h5 className='h5'>Vencimiento</h5>
                    <input
                      type='date'
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
                      placeholder='Ejm: DBA-005'
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
