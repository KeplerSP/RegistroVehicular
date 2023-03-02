import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../CSS/InfoMatricula.css';
import { TablaVehiculos, TablaInfracciones } from '../components/TablaVehiculos';

//* Pestaña que mostrará la información referente a una matricula
function InfoMatricula(props) {

  const data = props.data

  return (
    <div className='fondo'>
      <Container className='centrado'>
        <br />
        <Row>
          <Col className="centrarFormulario">
            <Card style={{ width: '16rem' }} className="mx-auto d-block">
              <Card.Img variant="top" src={`https://keplerg.infura-ipfs.io/ipfs/${data[5]}`} />
            </Card>
          </Col>
          <Col sm={12} md={12} lg={8} className="centrarFormulario">
            <Row>
              <h5 className='h5'><b>{data[0]}</b></h5>
            </Row>
            <Row>
              <p>Carnet de conducir: <b>{data[4] ? "VIGENTE" : "VENCIDO"}</b> <br />
                Emitido: {data[1]}
              </p>
            </Row>
            <Row>
              <p>Matricula: {data[3]}</p>
            </Row>
            <Row>
              <p>Vehiculos a su nombre</p>
              <TablaVehiculos
                cantidad="1"
                modelo={data[2]}
                matricula={data[3]}
              />
            </Row>
          </Col>
        </Row>
        <br />
        <h5 className='h5'>INFRACCIONES:</h5>
        <TablaInfracciones
          cantidad={data[6].length}
          infracciones={data[6]}
        />
      </Container>
    </div>

  );
}

export default InfoMatricula;