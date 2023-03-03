import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Icono from '../img/person-circle.svg';
import Logo from '../img/logo_navbar.png';
import { Link } from 'react-router-dom';

function NavbarBrand() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className='navbar'>
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="Logo de la página"
              src={Logo}
              width="40"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            REGISTRO DESCENTRALIZADO
          </Navbar.Brand>
          <Link to="/admin">
            <img
              alt="Icono de administrador"
              src={Icono}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Link>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarBrand;