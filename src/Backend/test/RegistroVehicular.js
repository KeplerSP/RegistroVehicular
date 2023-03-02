const { expect } = require("chai");
const { ethers } = require("hardhat");

///Empecemos con la descripción hacia un nuevo testing
describe("RegistroVehicular Testing", function () {
  ///•Empecemos con las variables que necesitamos(para el RegistroVehicular,Deployer,direcciones,etc)
  /// Uno hara referencia al SC cuando lo llamemos, y el otro en minuscula cuando lo desplegemos. (registroVehicular)
  let RegistroVehicular;
  let registroVehicular;
  let deployer;
  let addr1;
  let addr2;
  let addrs;

  //TODO: Una vez definida las variables vamos a definir lo que haremos antes de empezar cada Testing.
  beforeEach(async function () {
    ///Obtendremos los SC
    RegistroVehicular = await ethers.getContractFactory("RegistroVehicular");
    [deployer, addr1, addr2, ...addrs] = await ethers.getSigners(); ///->Direcciones que van a involucrarse en el despliegue
    ///Desplegamos los SC
    registroVehicular = await RegistroVehicular.deploy();
  })

  //* Testing para el Deployment -> Que el despliegue sea como esperamos
  describe("Deployment", function () {

    it("La direccion del owner debe ser la del deployer", async function () {
      console.log(`Owner: ${await registroVehicular.owner()} | Deployer: ${deployer.address}`);
      expect(await registroVehicular.owner()).to.equal(deployer.address);
    });

  });

  //* Testing para agregar personal
  describe("Agregar personal", function () {

    it("Solo el Owner puede agregar administradores", async function () {
      /// Nos conectamos con el deployer y añadimos a addr1 como admin
      await expect(registroVehicular.connect(deployer).agregarPersonal(addr1.address))
        .to.emit(registroVehicular, "PersonalAgregado")
        .withArgs(
          "Nuevo personal agregado: ",
          addr1.address
        );

      /// Verificamos que addr1 ha sido añadido correctamente
      expect(await registroVehicular.autorizados(addr1.address)).to.equal(true);
    });

    it("Fallar en caso lo intente otro usuario", async function () {
      await expect(registroVehicular.connect(addr1).agregarPersonal(addr2.address)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

  });

  //* Testing para registrar Vehiculos
  describe("Registrar vehiculo", function () {

    beforeEach(async function () {
      /// Agregamos una cuenta como admin
      await expect(registroVehicular.connect(deployer).agregarPersonal(addr1.address));
    });

    it("Solo personal autorizado puede registrar vehiculos", async function () {
      /// Fallar en caso una cuenta no autorizada intente ejecutar la función
      await expect(registroVehicular.connect(addr2).addVehiculo("1", "2", "3", "4", "5")).to.be.revertedWith(
        "No tienes permisos de administrador"
      );
    });

    it("Información del vehiculo es emitida correctamente", async function () {
      /// Agregamos un nuevo vehiculo y verificamos el evento respectivo
      const tx = await registroVehicular.connect(addr1).addVehiculo(
        "Patrick Bateman",
        "09/02/2023",
        "NISAN 2010",
        "ABC123",
        "imagenUrlIpfs"
      );
      await tx.wait();

      const eventFilter = registroVehicular.filters.NewMatricula();
      const events = await registroVehicular.queryFilter(eventFilter);
      /// 'events' recoge todas la coincidencias con el evento "NewMatricula()"

      let prueba = (events[0].args)[1];
      for (let index = 0; index < prueba.length; index++) {
        const element = prueba[index];
        console.log(`Dato N°${index + 1}: ${element}`);
      }
    });

  });

  //* Testing para editar informacion de un vehiculo
  describe("Editar informacion de un vehiculo", function () {

    beforeEach(async function () {
      /// Agregamos una cuenta como admin
      await expect(registroVehicular.connect(deployer).agregarPersonal(addr1.address));
    });

    it("Solo personal autorizado puede editar informacion", async function () {
      /// Fallar en caso una cuenta no autorizada intente ejecutar la función
      await expect(registroVehicular.connect(addr2).editInfo(
        ["Patrick Bateman", "09/02/2023", "NISAN 2010", "ABC123", true, "urlImgIpfs", []],
        false,
        [{ nombre: "infraccion", fecha: "fecha" }]
      )).to.be.revertedWith(
        "No tienes permisos de administrador"
      );
    });

    it("La informacion se actualiza correctamente", async function () {
      const data = {
        nombre: "borracho",
        fecha: "hace 2 dias"
      }
      /// Agregamos un nuevo vehiculo y verificamos el evento respectivo
      const tx = await registroVehicular.connect(addr1).editInfo(
        ["Patrick Bateman", "09/02/2023", "NISAN 2010", "ABC123", true, "urlImgIpfs", [data]],
        false,
        [data]
      )
      await tx.wait();

      const eventFilter = registroVehicular.filters.UpdateMatricula();
      const events = await registroVehicular.queryFilter(eventFilter);
      /// 'events' recoge todas la coincidencias con el evento "NewMatricula()"

      let prueba = (events[0].args)[1];

      for (let index = 0; index < prueba.length; index++) {
        const element = prueba[index];
        console.log(`Dato N°${index + 1}: ${element}`);

        /// Entramos al arreglo de infracciones y obtenemos su elementos individuales
        if (index == 6) {
          /// En este caso el array de infracciones solo contiene un objeto de tipo infraccion
          console.log("Arreglo Completo:", element);
          console.log("CONDICION:", element[0][0]);
          console.log("FECHA:", element[0][1]);
        }
      }
    });

  });

})