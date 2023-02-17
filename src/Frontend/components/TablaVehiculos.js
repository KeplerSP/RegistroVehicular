import Table from 'react-bootstrap/Table';

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
  let arregloInfracciones = props.infracciones;
  // let arregloInfracciones = [
  //   { nombre: "elemento 0", fecha: "elemento 1" },
  //   { nombre: "elemento 2", fecha: "elemento 3" },
  //   { nombre: "elemento 4", fecha: "elemento 5" }
  // ];

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
            <td key={index}>{arregloInfracciones[index].nombre}</td>
            <td key={index}>{arregloInfracciones[index].fecha}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}