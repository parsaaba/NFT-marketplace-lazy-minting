import { ethers } from 'ethers';

export async function connectMetaMaskWallet() {
  try {
    window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();

    return { signerAddress, signer, chainId };
  } catch (e) {
    throw new Error('🦊 Connect to Metamask using the top right button.');
  }
}

export async function validateAddress(signerAddress, otherAddress) {
  try {
    if (otherAddress && signerAddress !== otherAddress) {
      const wallet = otherAddress;
      const userAccountStart = wallet ? wallet.slice(0, 5) : null;
      const userAccountEnd = wallet ? wallet.slice(-5) : null;
      throw new Error(
        `Please use the following wallet  ${userAccountStart}...${userAccountEnd}`
      );
    }
  } catch (e) {
    throw new Error(e);
  }
}
