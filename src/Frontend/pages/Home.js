import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import CampoMatricula from '../components/CampoMatricula';
import NavbarBrand from '../components/NavBar';
import InfoMatricula from './InfoMatricula';
import Footer from '../components/Footer';
import { Toaster, toast } from 'react-hot-toast';
import { ethers } from 'ethers';
import Spinner from 'react-bootstrap/Spinner';
///Importamos información del SC
import RegistroVehicularAbi from '../contractsData/RegistroVehicular.json';
import RegistroVehicularAddress from '../contractsData/RegistroVehicular-address.json';
import getEvents from "../GetEvents";

//* Pestaña que mostrará el buscador de matriculas y posteriormente la información de esta
function Home() {

  const [registroVehicular, setRegistroVehicular] = useState({});
  const [loadForm, setLoadForm] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getContract = async () => {
    let url = "https://endpoints.omniatech.io/v1/matic/mumbai/public";
    let httpProvider = new ethers.providers.JsonRpcProvider(url);
    const registroVehicular = new ethers.Contract(RegistroVehicularAddress.address, RegistroVehicularAbi.abi, httpProvider);
    setRegistroVehicular(registroVehicular);
  }

  useEffect(() => {
    getContract()
  }, [])

  // Crear una función anónima que trabaje con la matricula ingresada
  const pasarMatricula = async (matricula) => {
    setLoading(true)
    /// Comprobamos con los eventos emitidos en la BlockChain si la matricula que se busca existe
    const data = await getEvents(registroVehicular, matricula.toUpperCase())
    setData(data)
    console.log("EVENTO CAPTURADO EN HOME: ", data)
    /// Si la matricula existe, mostrar sus datos en pantalla
    if (data[3] != "") {
      setLoadForm(false);
    } else {
      setLoading(false)
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
            {loading ? (
              <div className="centrado cuerpo">
                <h4>BUSCANDO MATRICULA...</h4>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <>
                <Container>
                  <CampoMatricula onSubmit={pasarMatricula} />
                </Container>
                <Footer />
              </>
            )}
          </>
        ) : (
          <InfoMatricula data={data} />
        )}
      </body>
    </div>

  );
}

export default Home;
