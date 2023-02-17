// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RegistroVehicular is Ownable {
    address ownerContrato;

    constructor() {
        ownerContrato = owner();
    }

    //* Mapping para el personal autorizado
    mapping(address => bool) public autorizados;

    //* Eventos
    event NewMatricula(string matricula, uint256 timeStamp, InfoMatricula info);
    event UpdateMatricula(
        string matricula,
        uint256 timeStamp,
        InfoMatricula info
    );
    event PersonalAgregado(string message, address newPersonal);

    //* Structs
    struct Infracciones {
        string nombre;
        string fecha;
    }

    struct InfoMatricula {
        string nombre;
        string emision;
        string modeloVehiculo;
        string matricula;
        bool vigencia;
        Infracciones[] infracciones;
    }

    //* Modifier
    modifier personalAutorizado(address _addr) {
        require(
            autorizados[_addr] == true || _addr == ownerContrato,
            "No tienes permisos de administrador"
        );
        _;
    }

    //todo: Función para agregar personal autorizado -> administradores
    function agregarPersonal(address newPersonal) public onlyOwner {
        autorizados[newPersonal] = true;
        emit PersonalAgregado("Nuevo personal agregado: ", newPersonal);
    }

    //todo:  Función para registrar Vehiculos
    function addVehiculo(
        string memory _nombre,
        string memory _emision,
        string memory _modeloVehiculo,
        string memory _matricula
    ) public personalAutorizado(msg.sender) {
        /// Por defecto un vehiculo se registrará con 0 infracciones
        InfoMatricula memory info;
        Infracciones[] memory infracciones;

        info.nombre = _nombre;
        info.emision = _emision;
        info.modeloVehiculo = _modeloVehiculo;
        info.matricula = _matricula;
        info.vigencia = true;
        info.infracciones = infracciones;

        //* Emitimos un evento para la matricula creada
        emit NewMatricula(info.matricula, block.timestamp, info);
    }

    //todo:  Función para editar información de un vehiculo -> Agregar infracciones
    function editInfo(
        InfoMatricula memory _infoMatricula,
        bool _vigencia,
        Infracciones[] memory _infracciones
    ) public personalAutorizado(msg.sender) {
        /*
         *array 1 => 4 elementos --- posicion: [0,1,2,3]
         *array 2 => 3 elementos --- posicion: [4,5,6]
         */
        uint256 cantidad = _infoMatricula.infracciones.length +
            _infracciones.length;

        /// Creamos un array vacio de tipo struct Infracciones
        Infracciones[] memory infracciones = new Infracciones[](cantidad);

        /// Primero recorremos el array previo, almacenando sus elementos en el array vacio creado arriba
        /// Aquí terminamos en la posicion 'x-1'
        for (uint i = 0; i < _infoMatricula.infracciones.length; i++) {
            infracciones[i] = Infracciones(
                _infoMatricula.infracciones[i].nombre,
                _infoMatricula.infracciones[i].fecha
            );
        }

        /// Luego recorremos el array pasado por parametro y almacenamos la información en los espacios restantes
        /// Aquí retomamos desde la posicion 'x'
        uint8 j = 0;
        for (uint i = _infoMatricula.infracciones.length; i < cantidad; i++) {
            infracciones[i] = Infracciones(
                _infracciones[j].nombre,
                _infracciones[j].fecha
            );
            j++;
        }
        j = 0;

        /// Ahora 'infracciones' contiene los elementos pasados más los nuevos ingresados por parametro
        /// Actualizamos el valor del array dentro del struct '_infoMatricula' con el nuevo array recien creado("infracciones")
        _infoMatricula.infracciones = infracciones;
        
        _infoMatricula.vigencia = _vigencia;

        //* Emitimos un evento para la matricula actualizada
        emit UpdateMatricula(
            _infoMatricula.matricula,
            block.timestamp,
            _infoMatricula
        );
    }
}
