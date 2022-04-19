/* eslint-disable no-nested-ternary */
import { ethers } from 'ethers';
import {
  WALLET_CONNECT_FAIL,
  WALLET_CONNECT_REQUEST,
  WALLET_CONNECT_SUCCESS,
  MINT_AND_REDEEM_FAIL,
  MINT_AND_REDEEM_REQUEST,
  MINT_AND_REDEEM_SUCCESS,
  DEPLOY_MY_GALLERY_FAIL,
  DEPLOY_MY_GALLERY_REQUEST,
  DEPLOY_MY_GALLERY_SUCCESS,
  SIGN_MY_ITEM_FAIL,
  SIGN_MY_ITEM_REQUEST,
  SIGN_MY_ITEM_SUCCESS,
} from '../constants/lazyFactoryConstants';

import Voucher from '../voucher';
import LazyFactory from '../contracts/LazyFactory.sol/LazyFactory.json';
import { updateArtwork } from './artworkAction';
import { updateArtistGallery } from './artistAction';
import { connectMetaMaskWallet, validateAddress } from '../wallet';

const decimalPlaces = 2;

// to use in our state / js file for wallet is the alternative --> connectMetaMaskWallet()
export const connectWallet = () => async (dispatch) => {
  try {
    dispatch({ type: WALLET_CONNECT_REQUEST });
    window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    console.log(`chain Id here: ${chainId}`);

    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();
    dispatch({
      type: WALLET_CONNECT_SUCCESS,
      payload: { walletAddress, signer, chainId },
    });
  } catch (e) {
    console.log('problem wallet connection: ');
    dispatch({
      type: WALLET_CONNECT_FAIL,
      payload: '🦊 Connect to Metamask using the top right button.',
    });
  }
};

export const deployMyGallery =
  (marketPlaceAddress, galleryName, artistId) => async (dispatch) => {
    try {
      dispatch({ type: DEPLOY_MY_GALLERY_REQUEST });

      const { signer } = await connectMetaMaskWallet();
      const signerFactory = new ethers.ContractFactory(
        LazyFactory.abi,
        LazyFactory.bytecode,
        signer
      );
      const artistWalletAddress = await signer.getAddress();
      const signerContract = await signerFactory.deploy(
        marketPlaceAddress,
        'VADEE',
        galleryName,
        artistWalletAddress
      );
      await signerContract.deployTransaction.wait(); // loading before confirmed transaction

      const galleryAddress = await signerContract.address;
      dispatch(
        updateArtistGallery(galleryAddress, artistId, artistWalletAddress)
      );
      dispatch({
        type: DEPLOY_MY_GALLERY_SUCCESS,
        payload: { signerContract, signerFactory, artistWalletAddress },
      });
    } catch (e) {
      console.log('problem deploying: ');
      dispatch({
        type: DEPLOY_MY_GALLERY_FAIL,
        payload: e.error
          ? e.error.message
          : e.response && e.response.data.details
          ? e.response.data.details
          : e.message,
      });
    }
  };

export const signMyItem =
  (
    artistGalleryAddress,
    artwork,
    artworkPriceEth,
    shippingEth,
    artworkPriceInDollar,
    shippingDollar,
    firstName
  ) =>
  async (dispatch) => {
    let voucher;
    try {
      dispatch({ type: SIGN_MY_ITEM_REQUEST });
      const { signer, signerAddress } = await connectMetaMaskWallet();
      if (artwork.edition_number === artwork.edition_total) {
        throw new Error('This collection is sold out :(');
      }

      await validateAddress(signerAddress, artwork.artist.wallet_address);

      const signerFactory = new ethers.ContractFactory(
        LazyFactory.abi,
        LazyFactory.bytecode,
        signer
      );

      const signerContract = signerFactory.attach(artistGalleryAddress);

      const theSignature = new Voucher({ contract: signerContract, signer });

      const totalInWei = ethers.utils.parseUnits(
        (parseFloat(shippingEth) + parseFloat(artworkPriceEth)).toString(),
        'ether',
        decimalPlaces
      );

      const totalInDollar = (
        artworkPriceInDollar + shippingDollar
      ).toLocaleString();

      voucher = await theSignature.signTransaction(
        artwork._id,
        artwork.title,
        artwork.edition_number,
        artwork.edition_total,
        totalInWei,
        totalInDollar,
        firstName,
        'tokenUri'
      );

      dispatch(updateArtwork(false, false, false, voucher, 'Signing'));

      dispatch({
        type: SIGN_MY_ITEM_SUCCESS,
        payload: { voucher, signerAddress },
      });
    } catch (e) {
      console.log('problem Signing: ');
      console.log(e);
      dispatch({
        type: SIGN_MY_ITEM_FAIL,
        payload: e.error
          ? e.error.message
          : e.response && e.response.data.details
          ? e.response.data.details
          : e.message,
      });
    }
  };

export const mintAndRedeem =
  (formValues, artistGalleryAddress, voucher, feeEth) => async (dispatch) => {
    try {
      dispatch({ type: MINT_AND_REDEEM_REQUEST });
      const { signer: redeemer } = await connectMetaMaskWallet();

      // Returns a new instance of the ContractFactory with the same interface and bytecode, but with a different signer.
      // const redeemerFactory = signerFactory.connect(redeemer);
      const redeemerFactory = new ethers.ContractFactory(
        LazyFactory.abi,
        LazyFactory.bytecode,
        redeemer
      );

      // Return an instance of a Contract attached to address. This is the same as using the Contract constructor
      // with address and this the interface and signerOrProvider passed in when creating the ContractFactory.
      const redeemerContract = redeemerFactory.attach(artistGalleryAddress);
      const redeemerAddress = await redeemer.getAddress();

      const theVoucher = {
        artworkId: parseInt(voucher.artwork_id),
        title: voucher.title,
        editionNumber: voucher.edition_number,
        edition: voucher.edition,
        priceWei: voucher.price_wei,
        priceDollar: voucher.price_dollar,
        tokenUri: voucher.token_Uri,
        content: voucher.content,
        signature: voucher.signature,
      };

      const feeWei = ethers.utils.parseUnits(
        parseFloat(feeEth).toFixed(5).toString(),
        'ether'
      );

      const redeemTx = await redeemerContract.redeem(
        redeemerAddress,
        theVoucher,
        feeWei,
        {
          value: voucher.price_wei,
        }
      );
      const transactionData = await redeemTx.wait();
      console.log(transactionData);

      const eventTokenId = parseInt(transactionData.events[2].args.tokenId);
      const { transactionHash } = transactionData;

      dispatch(
        updateArtwork(
          artistGalleryAddress,
          false,
          false,
          voucher,
          'RedeemAndMint',
          transactionHash,
          feeWei,
          formValues
        )
      );

      dispatch({
        type: MINT_AND_REDEEM_SUCCESS,
        payload: {
          eventTokenId,
          redeemerAddress,
        },
      });
    } catch (e) {
      console.log('problem buying: ');
      console.log({ e });

      dispatch({
        type: MINT_AND_REDEEM_FAIL,
        payload: e.error
          ? e.error.message
          : e.response && e.response.data.details
          ? e.response.data.details
          : e.message,
      });
    }
  };
