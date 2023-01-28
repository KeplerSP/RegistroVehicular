import Table from 'react-bootstrap/Table';
import '../CSS/InfoMatricula.css';

export function TablaVehiculos(props) {
  let cantidad = props.cantidad;
  return (
    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>Modelo del Vehiculo</th>
          <th>Matricula</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: cantidad }).map((_, index) => (
          <tr>
            <td key={index}>{props.modelo}</td>
            <td key={index}>{props.matricula}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export function TablaInfracciones(props) {
  let cantidad = props.cantidad;
  return (
    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>Infraccion</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: cantidad }).map((_, index) => (
          <tr>
            <td key={index}>{props.name}</td>
            <td key={index}>{props.fecha}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}