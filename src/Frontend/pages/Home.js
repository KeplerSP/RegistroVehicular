import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import CampoMatricula from '../components/CampoMatricula';
import NavbarBrand from '../components/NavBar';
import InfoMatricula from './InfoMatricula';
import Footer from '../components/Footer';
import { Toaster, toast } from 'react-hot-toast';
import { ethers } from 'ethers';
///Importamos información del SC
import RegistroVehicularAbi from '../contractsData/RegistroVehicular.json';
import RegistroVehicularAddress from '../contractsData/RegistroVehicular-address.json';
import getEvents from "../GetEvents";

//* Pestaña que mostrará el buscador de matriculas y posteriormente la información de esta
function Home() {

  const [registroVehicular, setRegistroVehicular] = useState({});
  const [loadForm, setLoadForm] = useState(true);
  const [data, setData] = useState([]);

  const getContract = async () => {
    // Default: http://localhost:8545
    /// let url = "http://something-else.com:8546";
    /// let customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    let httpProvider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
    const registroVehicular = new ethers.Contract(RegistroVehicularAddress.address, RegistroVehicularAbi.abi, httpProvider);
    setRegistroVehicular(registroVehicular);
  }

  useEffect(() => {
    getContract()
  }, [])

  // Crear una función anónima que trabaje con la matricula ingresada
  const pasarMatricula = async (matricula) => {
    /// Comprobamos con los eventos emitidos en la BlockChain si la matricula que se busca existe
    const data = await getEvents(registroVehicular, matricula)
    setData(data)
    console.log("EVENTO CAPTURADO EN HOME: ", data)
    /// Si la matricula existe, mostrar sus datos en pantalla
    if (data[3] != "") {
      setLoadForm(false);
    } else {
      /// En caso contrario, emitir una alerta
      toast.error("La matricula no esta en nuestro sistema 🙁")
    }
  }

  return (
    <div>
      <header>
        <Toaster />
        <NavbarBrand />
      </header>
      <body>
        {loadForm ? (
          <>
            <Container>
              <CampoMatricula onSubmit={pasarMatricula} />
            </Container>
            <Footer />
          </>
        ) : (
          <InfoMatricula data={data} />
        )}
      </body>
    </div>

  );
}

export default Home;
