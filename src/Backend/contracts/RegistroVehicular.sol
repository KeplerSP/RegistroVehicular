// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

// console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

contract RegistroVehicular {
    address owner;

    constructor() {
        owner = msg.sender;
        addVehiculo("nombre conductor", "emision", "vencimiento", "matricula");
    }

    //* Eventos
    event NewMatricula(string matricula, uint timeStamp, InfoMatricula info);
    event UpdateMatricula(string matricula, uint timeStamp, InfoMatricula info);
    event PersonalAgregado(string message, address newPersonal);

    //* Structs
    struct Infracciones {
        string nombre;
        string fecha;
    }

    Infracciones[] private structInfracciones;

    struct InfoMatricula {
        string nombre;
        string emision;
        string vencimiento;
        string matricula;
        Infracciones[] infracciones;
    }

    // InfoMatricula private infoMatricula;

    //! Solo owner
    function agregarPersonal(address newPersonal) public {
        emit PersonalAgregado("Nuevo personal agregado: ", newPersonal);
    }

    function addVehiculo(
        string memory _nombre,
        string memory _emision,
        string memory _vencimiento,
        string memory _matricula
    ) public {
        InfoMatricula memory info;
        Infracciones[] memory infracciones;

        info.nombre = _nombre;
        info.emision = _emision;
        info.vencimiento = _vencimiento;
        info.matricula = _matricula;
        info.infracciones = infracciones;

        //* Emitimos un evento sobre la matricula creada
        emit NewMatricula(info.matricula, 0, info);
    }

    function editInfo(
        InfoMatricula memory _infoMatricula,
        Infracciones[] memory _infracciones
    ) public {
        /* 
        array 1 => 4 elementos --- posicion: [0,1,2,3]
        array 2 => 3 elementos --- posicion: [4,5,6]
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

        /// Ahora 'infracciones' contiene los elementos pasados más los nuevo ingresados por parametro
        /// Actualizamos el valor del array dentro del struct '_infoMatricula' con el nuevo array recien creado("infracciones")
        _infoMatricula.infracciones = infracciones;

        //* Emitimos un evento sobre la matricula actualizada
        emit UpdateMatricula(_infoMatricula.matricula, 1, _infoMatricula);
    }
}
