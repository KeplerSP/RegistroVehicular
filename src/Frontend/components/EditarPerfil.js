import React, { useState, useEffect } from "react";
import InfoMatricula from "../pages/InfoMatricula";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Formulario.css';
import { Toaster, toast } from 'react-hot-toast';
import swal from 'sweetalert';

export default function EditarPerfil(props) {
  /// Tenemos que manejar que ocurre cuando cambia el contenido del formulario.(el usuario escribe)
  const [input, setInput] = useState([]);

  // Se recibe como argumento un evento, este valor nos va a permitir que la pagina
  // se vuelva a cargar cuando se envie el formulario.
  /// Esta función almacenará los datos en un useState para luego ser enviados
  const cargarDatos = e => {
    e.preventDefault(); ///->Evita que se vuelva a carga la app al enviar el formulario.

    var a = document.getElementById("infraccion").value;
    var b = document.getElementById("fecha").value;

    const delitos = [{ nombre: a, fecha: b }, ...input];

    setInput(delitos);
    console.log("DELITOS", delitos)

    document.getElementById("infraccion").value = "";
    document.getElementById("fecha").value = "";
  }

  /// Esta función se encargará de enviar los datos a la BlockChain mediante el Smart Contract
  const manejarEnvio = async (e, vigencia, inputFinal) => {
    e.preventDefault();

    /// Enviamos los datos a la BlockChain
    await (await props.contrato.editInfo(props.data, vigencia, inputFinal)).wait();

    toast.success('DATOS ENVIADOS CORRECTAMENTE')
    /// Al final vaciamos input
    setInput([])
  }

  //* Emitir una alerta antes de enviar datos a la BlockChain
  const botonRegistrar = (e) => {
    e.preventDefault();

    let vigencia;
    let inputFinal;
    if (input.length > 0) {
      vigencia = document.getElementById("vigencia").checked;
      if (document.getElementById("infraccion").value != "" && document.getElementById("fecha").value != "") {

        var a = document.getElementById("infraccion").value;
        var b = document.getElementById("fecha").value;

        inputFinal = [{ nombre: a, fecha: b }, ...input];

        document.getElementById("infraccion").value = "";
        document.getElementById("fecha").value = "";
      } else {
        inputFinal = input;
      }
    } else {
      toast.error('No hay información para enviar')
      return
    }

    swal({
      title: "ENVIAR DATOS",
      text: `Actualizar los siguientes datos de: ${props.data[0]} --- ${props.data[3]}
      \nVigencia: ${vigencia}
      \nInfracciones:
      \n${JSON.stringify(inputFinal)}`,
      icon: "info",
      buttons: ["CANCELAR", "ACEPTAR"],
    })
      .then((sendData) => {
        if (sendData) {
          manejarEnvio(e, vigencia, inputFinal)
        } else {
          swal("Los datos no serán enviados");
        }
      });
  }

  useEffect(() => {
    document.getElementById("vigencia").checked = true;
  }, [])

  return (
    <>
      <Toaster />
      <div className="p-3 pe-5 ps-5">
        <InfoMatricula data={props.data} />
      </div>
      <div className='fondo pt-5'>
        <Container>
          <h1 className="h5"><b>INGRESE LOS NUEVOS DATOS</b></h1>
          <br /> <br />
          <form onSubmit={cargarDatos}>
            <h5 className='h5'>Carnet Vigente</h5>
            <label class="switch">
              <input type="checkbox" id="vigencia" />
              <span class="slider round"></span>
            </label>
            <br /> <br />
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
                  type='date'
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
            <button className="boton4" onClick={botonRegistrar}>
              <b>Guardar</b>
            </button>
          </form>
        </Container>
      </div>
    </>
  )
}