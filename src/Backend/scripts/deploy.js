// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Desplegando contrato con:", deployer.address);
  console.log("Balance de la cuenta:", (await deployer.getBalance()).toString());

  const RegistroVehicular = await hre.ethers.getContractFactory("RegistroVehicular");
  const registroVehicular = await RegistroVehicular.deploy();

  await registroVehicular.deployed();

  /// Save copies of each contracts abi and address to the Frontend.
  ///•De esta forma almacenamos en contractsData la compilación de estos SC
  saveFrontendFiles(registroVehicular, "RegistroVehicular");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../Frontend/contractsData";

  /// Si no existe el directorio, entonces crearlo
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    ///Crera un elemento JSON con los siguientes datos
    /// El '2' se refiere a la identación que tendrá el archivo JSON para facilitar su letura
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
