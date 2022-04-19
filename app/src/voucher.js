// Mst match the smart contract constants.
const SIGNING_DOMAIN_NAME = 'VADEE';
const SIGNING_DOMAIN_VERSION = '1';

class Voucher {
  constructor({ contract, signer }) {
    this.contract = contract;
    this.signer = signer;
  }

  // design your domain separator
  async designDomain() {
    if (this.domainData != null) {
      return this.domainData;
    }
    const chainId = await this.contract.getChainID();

    this.domainData = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contract.address,
      chainId,
    };

    return this.domainData;
  }

  async signTransaction(
    artworkId,
    title,
    editionNumber,
    edition,
    totalInWei,
    totalInDollar,
    firstName,
    tokenUri
  ) {
    const domain = await this.designDomain();
    // define your data types
    const types = {
      Voucher: [
        { name: 'title', type: 'string' },
        { name: 'artworkId', type: 'uint256' },
        { name: 'editionNumber', type: 'string' },
        { name: 'edition', type: 'string' },
        { name: 'priceWei', type: 'uint256' },
        { name: 'priceDollar', type: 'string' },
        { name: 'tokenUri', type: 'string' },
        { name: 'content', type: 'string' },
      ],
    };
    const theId = `${artworkId}${editionNumber}`;

    const voucher = {
      title,
      artworkId: parseInt(theId),
      editionNumber: editionNumber.toLocaleString(),
      edition: edition.toLocaleString(),
      priceWei: totalInWei,
      priceDollar: totalInDollar,
      tokenUri,
      content: `Hey ${firstName}, You are signing this work to be available for sale!`,
    };

    // signer._signTypedData(domain, types, value) =>  returns a raw signature
    const signature = await this.signer._signTypedData(domain, types, voucher);

    return {
      ...voucher,
      signature,
    };
  }
}

export default {
  Voucher,
};
