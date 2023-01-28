import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import pic from '../img/profile_pic.png';
import '../CSS/InfoMatricula.css';
import { TablaVehiculos, TablaInfracciones } from '../components/TablaVehiculos';

//* Pestaña que mostrará la información referente a una matricula
function InfoMatricula(props) {

  //! De acuerdo a la matricula, buscaremos en la BlockcChain la informacion relacionada con esta.
  /// La información vendrá en forma de un objeto.
  /// Contendrá: {nombre, emision del carnet, fecha de vencimiento, matricula, ¿Vehiculos a su nombre?, Infracciones:[{nombre, fecha}] }

  return (
    <div className='fondo'>
      <Container className='centrado'>
        <br />
        <Row>
          <Col sm={12} md={12} lg={4} >
            <Card style={{ width: '16rem' }} className="mx-auto d-block">
              <Card.Img variant="top" src={pic} />
            </Card>
          </Col>
          <Col sm={12} md={12} lg={8}>
            <Row>
              <h5 className='h5'><b>Patrick Bateman</b></h5>
            </Row>
            <Row>
              <p>Carnet de conducir: <b>Vigente</b> <br />
                Emitido el 10/10/2022
              </p>
            </Row>
            <Row>
              <p>Matricula: {props.matricula}</p>
            </Row>
            <Row>
              <p>Vehiculos a su nombre</p>
              <TablaVehiculos
                cantidad="1"
                modelo="Nisan 2000"
                matricula={props.matricula}
              />
            </Row>
          </Col>
        </Row>
        <br />
        <h5 className='h5'>INFRACCIONES:</h5>
        <TablaInfracciones
          cantidad="1"
          name="Exceso de velocidad"
          fecha="21/11/2001" />
      </Container>
    </div>

  );
}

export default InfoMatricula;