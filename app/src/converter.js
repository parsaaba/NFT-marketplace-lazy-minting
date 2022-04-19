import { ethers } from 'ethers';

export const dollarToEth = (price, ethRate) => {
  const convertedPrice = price / ethRate; // convert dollar to ETH
  return convertedPrice.toFixed(4);
};

export const weiToEth = (wei) => {
  const convertedPrice = ethers.utils.formatEther(wei);
  return convertedPrice;
};
