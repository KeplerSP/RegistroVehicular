import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import CampoMatricula from './CampoMatricula';
import NavbarBrand from './NavBar';
import InfoMatricula from './InfoMatricula';

function Home() {

  const [loadForm, setLoadForm] = useState(true);
  const [matricula, setMatricula] = useState("");

  //* Crear una función anónima que trabaje con la matricula ingresada
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
          <Container>
            <CampoMatricula onSubmit={pasarMatricula} />
          </Container>
        ) : (
          <InfoMatricula matricula={matricula} />
        )}
      </body>
    </div>
  );
}

export default Home;
