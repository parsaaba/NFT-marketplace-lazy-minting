const { expect } = require("chai");
const hardhat = require("hardhat");
const { Voucher } = require("../app/src/voucher");
const { ethers } = hardhat;


async function deploy() {
  const [artist, redeemer, newBuyer, _] = await ethers.getSigners()
  
  const fee = ethers.utils.parseUnits(
    '0.00000001',
    'ether'
  );

  const marketFactory = await ethers.getContractFactory("MarketPlace")
  const marketContract = await marketFactory.deploy()
  await marketContract.deployed()
  const marketAddress = marketContract.address

  let galleryFactory = await ethers.getContractFactory("LazyFactory",artist)
  const galleryContract = await galleryFactory.deploy(marketAddress, 'VADEE', 'myGallery', artist.address)
  await galleryContract.deployed()
  const factoryAddress = galleryContract.address

  // the redeemerContract is an instance of the contract that's wired up to the redeemer's signing key
  const redeemerFactory = galleryFactory.connect(redeemer)
  const redeemerContract = redeemerFactory.attach(factoryAddress)

  return {
    artist,
    redeemer,
    newBuyer,
    galleryContract,
    redeemerContract,
    marketContract,
    fee
  }
}

describe("MarketPlace", function () {
  it("Should deploy MarketPlace", async function () {
    const marketFactory = await ethers.getContractFactory("MarketPlace")
    const marketContract = await marketFactory.deploy()
    await marketContract.deployed()
    const marketPlaceAddress = marketContract.address
    expect(marketPlaceAddress).not.to.equal(0)
  })


  it("Should artist deploy their gallery and sign a voucher", async function () {
    const { artist, galleryContract } = await deploy()
    const priceInWei = ethers.utils.parseUnits(
      '0.054',
      'ether'
    );

    const theVoucher = new Voucher({ contract: galleryContract, signer: artist });
    const voucher = await theVoucher.signTransaction(1, 'title','1','10', priceInWei, '150', 'Ehsan', 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi')
    expect(voucher.signature).not.to.equal(0)
  })
  


  it("Should redeem and mint an NFT from a signed voucher", async function () {
    const { artist, redeemer, galleryContract, redeemerContract, fee } = await deploy()
    const priceInWei = ethers.utils.parseUnits(
      '0.054',
      'ether'
    );

    const theVoucher = new Voucher({ contract: galleryContract, signer: artist });
    const voucher = await theVoucher.signTransaction(1, 'title','1','10', priceInWei, '150', 'Ehsan', 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi')

    await expect(redeemerContract.redeem(redeemer.address, voucher, fee, {value: priceInWei}))
      .to.emit(galleryContract, 'Transfer')  // transfer from null address to artist
      .withArgs('0x0000000000000000000000000000000000000000', artist.address, voucher.artworkId)
      .and.to.emit(galleryContract, 'Transfer') // transfer from artist to redeemer
      .withArgs(artist.address, redeemer.address, voucher.artworkId)
      .and.to.emit(galleryContract, 'RedeemedAndMinted') // tokenId is the artworkId
      .withArgs(voucher.artworkId);
  });

  it("Should transfer fee to market Place after minting", async function () {
    const { artist, redeemer, galleryContract, redeemerContract, marketContract,fee } = await deploy()
    const priceInWei = ethers.utils.parseUnits(
      '0.0015',
      'ether'
    );
    const zeroEth = ethers.utils.parseUnits(
      '0',
      'ether'
    );
    const theVoucher = new Voucher({ contract: galleryContract, signer: artist });
    const voucher = await theVoucher.signTransaction(1, 'title','1','10', priceInWei, '150', 'Ehsan', 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi')

    const balanceBefore = await marketContract.fetchMarketBalance();
    expect(balanceBefore).to.equal(zeroEth)
    
    // the payment should be sent from the redeemer's account to the contract address
    await expect(await redeemerContract.redeem(redeemer.address, voucher, fee, { value: priceInWei }))
    .to.changeEtherBalances([redeemer, artist], [-1500000000000000, priceInWei - fee]) 

    const balanceAfter = await marketContract.fetchMarketBalance();
    expect(balanceAfter).to.equal(fee)
  });

  
  it("Should create a market item for sale", async function () {
    const { artist, redeemer, galleryContract, redeemerContract, marketContract,fee } = await deploy()
    const priceInWei = ethers.utils.parseUnits(
      '0.0015',
      'ether'
    );

    const redeemerAddress =await redeemer.address

    const theVoucher = new Voucher({ contract: galleryContract, signer: artist });
    const voucher = await theVoucher.signTransaction(1, 'title','1','10', priceInWei, '150', 'Ehsan', 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi')
    await redeemerContract.redeem(redeemerAddress, voucher, fee, { value: priceInWei })

    const galleryAddress = await galleryContract.address
    const redeemerFactory = marketContract.connect(redeemer)
    const redeemerMarketContract = redeemerFactory.attach(redeemerFactory.address)

    await expect(redeemerMarketContract.createMarketSell(galleryAddress, voucher.artworkId, priceInWei))
      .to.emit(marketContract, 'MarketItemCreated')
      .withArgs(1, galleryContract.address, voucher.artworkId, redeemerAddress, '0x0000000000000000000000000000000000000000', priceInWei, false)
  });

    
  it("Should buy the market item on the market place", async function () {
    const { artist, redeemer,newBuyer, galleryContract, redeemerContract, marketContract,fee } = await deploy()
    const priceInWei = ethers.utils.parseUnits(
      '0.0015',
      'ether'
    );

    const redeemerAddress =await redeemer.address

    const theVoucher = new Voucher({ contract: galleryContract, signer: artist });
    const voucher = await theVoucher.signTransaction(1, 'title','1','10', priceInWei, '150', 'Ehsan', 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi')
    await redeemerContract.redeem(redeemerAddress, voucher, fee, { value: priceInWei })

    const galleryAddress = await galleryContract.address
    const redeemerFactory = marketContract.connect(redeemer)
    const redeemerMarketContract = redeemerFactory.attach(redeemerFactory.address)

    const sellTransaction = await redeemerMarketContract.createMarketSell(galleryAddress, voucher.artworkId, priceInWei)
    const transactionData = await sellTransaction.wait()
    const marketItemId = (parseInt(transactionData.events[2].args.marketItemId))
    const price = (parseInt(transactionData.events[2].args.price))

    const newBuyerFactory = marketContract.connect(newBuyer)
    const newBuyerMarketContract = newBuyerFactory.attach(newBuyerFactory.address)

    const newBuyerAddress =await newBuyer.address
    
    await expect(await newBuyerMarketContract.purchaseMarketItem(galleryAddress, marketItemId, fee, {value: price}))
      .to.emit(redeemerMarketContract, 'MarketItemPurchased')
      .withArgs(marketItemId, galleryContract.address, voucher.artworkId, newBuyerAddress, price)
      .to.changeEtherBalances([newBuyer, redeemer], [-1500000000000000, price - fee]) 
      .to.emit(galleryContract, 'Transfer')  // transfer from market place address to new buyer
      .withArgs(redeemerMarketContract.address, newBuyer.address, voucher.artworkId)
  });

    
  it("Should withdraw the market balance", async function () {
    const { artist, redeemer, newBuyer, galleryContract, redeemerContract, marketContract, fee } = await deploy()
    const priceInWei = ethers.utils.parseUnits(
      '0.0015',
      'ether'
    );

    const zeroEth = ethers.utils.parseUnits(
      '0',
      'ether'
    );
    const redeemerAddress =await redeemer.address

    const theVoucher = new Voucher({ contract: galleryContract, signer: artist });
    const voucher = await theVoucher.signTransaction(1, 'title','1','10', priceInWei, '150', 'Ehsan', 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi')
    await redeemerContract.redeem(redeemerAddress, voucher, fee, { value: priceInWei })

    const balanceBefore = await marketContract.fetchMarketBalance();
    expect(balanceBefore).to.equal(fee)

    await marketContract.withdraw()

    const balanceAfter = await marketContract.fetchMarketBalance();
    expect(balanceAfter).to.equal(zeroEth)
  });
   
  

});
