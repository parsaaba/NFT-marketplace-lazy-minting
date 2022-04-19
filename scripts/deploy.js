const fs = require('fs')

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

 
  // We get the contract to deploy
  const MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
  const marketPlace = await MarketPlace.deploy();
  await marketPlace.deployed();
  console.log("marketPlace deployed to:", marketPlace.address);

  const Factory = await hre.ethers.getContractFactory("LazyFactory");
  const factory = await Factory.deploy(
    marketPlace.address,
    'Vadee',
    'galleryName',
    '0x720472c8ce72c2A2D711333e064ABD3E6BbEAdd3'
  );
  await factory.deployed();
  console.log("Factory deployed to:", factory.address);

  factoryData = {
    address: factory.address,
    abi: JSON.parse(factory.interface.format('json'))
  };

  marketPlaceData = {
    address: marketPlace.address,
    abi: JSON.parse(marketPlace.interface.format('json'))
  };
  
  fs.writeFileSync('app/src/build/contracts/LazyFactory.json',JSON.stringify(factoryData))
  fs.writeFileSync('app/src/build/contracts/MarketPlace.json',JSON.stringify(marketPlaceData))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});