import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { ethers } from 'ethers';
import { Link, Outlet } from "react-router-dom";
import '../CSS/Buscador.css';

//* Pestaña que mostrará el componente "Formulario"(Agregar y Editar) luego de conectarse a Metamask 
function IngresarDatos(props) {

  //! props : loading - web3Handler

  let header;
  if (!props.loading) {
    // La variable 'content' va a recoger toda la información, información que se pintará en el Main
    // Probar a usar LINK sino encuentro otra alternativa

    header =
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Link className="Link" to="agregar">Agregar Vehiculo</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="Link" to="editar">Editar información</Link>
        </Nav.Item>
      </Nav>

  } else {
    header =
      <>
        <h5>¡Solo personal autorizado!</h5>
        <br />
        <button onClick={props.web3Handler}>
          CONECTARSE
        </button>
      </>
  }

  return (
    <div >
      <header> {header} </header>
      <body >
        {props.loading ? <></> : <Outlet />}
      </body>
    </div>
  );
}

export default IngresarDatos;
