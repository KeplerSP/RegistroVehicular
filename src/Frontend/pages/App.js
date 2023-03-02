import React, { useState } from "react";
//React-Router-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import Home from './Home';
import IngresarDatos from './IngresarDatos';
import Formulario from '../components/Formulario';
import '../CSS/App.css';
///Importamos información del SC
import RegistroVehicularAbi from '../contractsData/RegistroVehicular.json';
import RegistroVehicularAddress from '../contractsData/RegistroVehicular-address.json';

function App() {
  /// Variables de estado (LiveData)
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [registroVehicular, setRegistroVehicular] = useState({});

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

    loadContracts(signer);
  }

  ///Cargar información de los SC
  const loadContracts = async (signer) => {
    const registroVehicular = new ethers.Contract(RegistroVehicularAddress.address, RegistroVehicularAbi.abi, signer);
    setRegistroVehicular(registroVehicular);
    setLoading(false);
  }

  //* Se pasarán los SmartContracts desplegados a cada ruta para que puedan utilizar sus funciones.
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin/*' element={<IngresarDatos loading={loading} web3Handler={web3Handler} />}>
            <Route path='agregar' element={<Formulario opcion="1" contrato={registroVehicular} />} />
            <Route path='editar' element={<Formulario opcion="2" contrato={registroVehicular} />} />
          </Route>
          <Route path='*' element={<h1>ERROR 404: NOT FOUND PAGE</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
