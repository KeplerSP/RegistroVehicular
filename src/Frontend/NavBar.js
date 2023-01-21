import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Icono from './img/person-circle.svg';

function NavbarBrand() {
  // AGREGAR UN SIGNO DE SESION AL EXTREMO DERECHO -> Vincular esto con React-Root
  return (
    <>
      <Navbar bg="dark" variant="dark" className='navbar'>
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="Logo de Planet Express"
              src="https://i.imgur.com/W94AD7b.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            PLANET EXPRESS
          </Navbar.Brand>
          <Navbar.Brand href="/admin">
            <img
              alt="Logo de Planet Express"
              src={Icono}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarBrand;