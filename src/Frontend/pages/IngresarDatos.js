import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { ethers } from 'ethers';
import { Link, Outlet } from "react-router-dom";
import '../CSS/Buscador.css';

//* Pestaña que mostrará el componente "Formulario"(Agregar y Editar) luego de conectarse a Metamask 
function IngresarDatos() {

  /// Variables de estado (LiveData)
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);

  /// Necesito saber si una cuenta ha sido conectada || Si tengo Metamask conectado y estoy logeado
  //* 'web3Handler' me permite detectar si hay una Metamask conectada
  const web3Handler = async () => {
    ///•Función asincrona para recoger los datos de Metamask
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });  ///Devuelve las cuentas que estan conectadas
    console.log(accounts)
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    })

    setLoading(false);
    // loadContracts(signer);
  }

  // ///Cargar información de los SC
  // const loadContracts = async (signer) => {
  //   console.log("ENTRANDO EN loadContracts")
  //   const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
  //   setMarketplace(marketplace);
  //   const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
  //   setNFT(nft);
  //   setLoading(false);
  //   console.log("SALIENDO DE loadContracts")
  // }

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //* Crear una función anónima que trabaje con los datos de registro del usuario
  /// -> Le debo pasar a <Formulario /> esta función como parámetro
  const dataToContract = (datos) => {
    /// Le pasamos estos datos al Smart Contract
  }

  let header;
  if (!loading) {
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
        <button onClick={web3Handler}>
          CONECTARSE
        </button>
      </>
  }

  return (
    <div >
      <header> {header} </header>
      <body >
        {loading ? <></> : <Outlet />}
      </body>
    </div>
  );
}

export default IngresarDatos;
