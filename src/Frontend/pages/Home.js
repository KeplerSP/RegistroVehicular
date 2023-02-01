import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import CampoMatricula from '../components/CampoMatricula';
import NavbarBrand from '../components/NavBar';
import InfoMatricula from './InfoMatricula';
import Footer from '../components/Footer';

//* Pestaña que mostrará el buscador de matriculas y posteriormente la información de esta
function Home() {

  const [loadForm, setLoadForm] = useState(true);
  const [matricula, setMatricula] = useState("");

  /// Crear una función anónima que trabaje con la matricula ingresada
  const pasarMatricula = (matricula) => {
    setMatricula(matricula);
    if (matricula || matricula != matricula) {
      setLoadForm(false);
    }
  }

  return (
    <div>
      <header>
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
          <InfoMatricula matricula={matricula} />
        )}
      </body>
    </div>

  );
}

export default Home;
