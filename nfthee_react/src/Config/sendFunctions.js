import { ethers } from 'ethers';

import theeERC721ABI from './abis/polygon/TheeERC721.json';
import theeERC1155ABI from './abis/polygon/TheeERC1155.json';
import Creator from './abis/polygon/Creator.json';
import MarketplaceABI from './abis/polygon/Market.json';
import Market from './abis/polygon/Marketplace.json';
import Royalty from './abis/polygon/Royalty.json';
import ERC721 from './abis/polygon/TestERC721.json';
import ERC20 from './abis/polygon/TestERC20.json';
import contracts from './contracts';
import { generateRandomNumbers, getUnixTimeAfterDays } from './helpers';
import { getFullYearTime, getUserAddress } from './constants';
import { getCollection } from '../services/apiServices';

const exportInstance = async (SCAddress, ABI) => {
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner();
  let a = new ethers.Contract(SCAddress, ABI, signer);
  if (a) {
    return a;
  } else {
    return {};
  }
};

const readReceipt = async (hash) => {
  try {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const receipt = await provider.getTransactionReceipt(hash.hash);
    console.log(receipt.logs);
    let contractAddress = receipt.logs[0].address;
    return contractAddress;
  } catch (e) {
    console.log('error in api', e);
  }
};

export const approveTokens = async (ownerAddress, amount) => {
  let blockchainContractAddress = await blockchainNetworkChainId();
  
  console.log("token Approve")
  const tokens = ethers.utils.parseEther('1000000000');
  const tokenAmount = ethers.utils.parseEther(amount);

  let res1;
  let hash;
  let tokenInstance = await exportInstance(
    blockchainContractAddress.ERC20,
    ERC20.abi
  );
  res1 = await tokenInstance.mint(tokenAmount);

  hash = res1;

  res1 = await res1.wait();

  if (res1.status === 0) {
    console.log('Transaction Failed');
  }
  let contractAddress = await readReceipt(hash);

  res1 = await tokenInstance.approve(
    blockchainContractAddress.marketplaceAddress,
    tokenAmount
  );

  hash = res1;

  res1 = await res1.wait();

  if (res1.status === 0) {
    console.log('Transaction Failed');
  }
  return res1.status;
};

export const blockchainNetworkChainId = async () => {
  console.log(window.ethereum.networkVersion);

  if (window.ethereum.networkVersion === '11155111') {
    let marketplaceAddress = contracts.ethereumContracts.MARKETPLACE;
    let Creator = contracts.ethereumContracts.CREATOR;
    let ERC20 = contracts.ethereumContracts.TESTERC20;

    return { marketplaceAddress, Creator, ERC20 };
  } else if (window.ethereum.networkVersion === '97') {
    let marketplaceAddress = contracts.bscContracts.MARKETPLACE;
    let Creator = contracts.bscContracts.CREATOR;
    let ERC20 = contracts.bscContracts.TESTERC20;

    return { marketplaceAddress, Creator, ERC20 };
  } else if (window.ethereum.networkVersion === '80001') {
    let marketplaceAddress = contracts.polygonContracts.MARKETPLACE;
    let Creator = contracts.polygonContracts.CREATOR;
    let ERC20 = contracts.polygonContracts.TESTERC20;

    return { marketplaceAddress, Creator, ERC20 };
  } else if (window.ethereum.networkVersion === '1666700000') {
    let marketplaceAddress = contracts.harmonyContracts.MARKETPLACE;
    let Creator = contracts.harmonyContracts.CREATOR;
    let ERC20 = contracts.harmonyContracts.TESTERC20;

    return { marketplaceAddress, Creator, ERC20 };
  } else {
    console.log('Select Valid Blockchain');
  }
};

/**
 *
 * @param For Collection Creation
 */

export const handleCollectionCreation = async (
  chooseBlockchain,
  nftType,
  name,
  symbol,
  minterAddress,
  royaltyPercentage
) => {
  let res1;
  let contractAddress;
  let creator;
  console.log(
    chooseBlockchain,
    nftType,
    name,
    symbol,
    minterAddress,
    royaltyPercentage
  );

  const userAddress = await getUserAddress();

  let blockchainContractAddress = await blockchainNetworkChainId();
  const options = {
    gasPrice: 10000000000,
    gasLimit: 9000000,
  };

  console.log(userAddress);
  if (window.ethereum.networkVersion === '11155111') {
    console.log('eth');
    creator = await exportInstance(
      contracts.ethereumContracts.CREATOR,
      Creator.abi
    );
  } else if (window.ethereum.networkVersion === '80001') {
    console.log('poly');

    creator = await exportInstance(
      contracts.polygonContracts.CREATOR,
      Creator.abi
    );
  } else if (window.ethereum.networkVersion === '97') {
    console.log('bsc');

    creator = await exportInstance(contracts.bscContracts.CREATOR, Creator.abi);
  } else if (window.ethereum.networkVersion === '1666700000') {
    console.log('harmony');

    creator = await exportInstance(
      contracts.harmonyContracts.CREATOR,
      Creator.abi
    );
    console.log(creator);
  }

  if (nftType === 1) {
    try {
      // let data = await creator.setDeployerAddress(
      //   '0xF0aBF97618Bce8b50A894c33494689d890a82E6d',
      //   '0xe1E8dd423D4f6D107E8d8B95850080B950FcFd65',
      //   options
      // );
      res1 = await creator.deployERC721(
        name,
        symbol,
        '0x41c100Fb0365D9A06Bf6E5605D6dfF72F44fb106',
        options
      );
      console.log('after res');
      let hash = res1;

      res1 = await res1.wait();
      console.log(res1);

      if (res1.status === 0) {
        console.log('Transaction Failed');
      }
      contractAddress = await readReceipt(hash);

      let marketplaceInstance = await exportInstance(
        blockchainContractAddress.marketplaceAddress,
        Market.abi
      );

      console.log(contractAddress, userAddress, royaltyPercentage, options);

      // res1 = await marketplaceInstance.royalty(contractAddress);

      // res1 = await res1.wait();
      // console.log('res1 collection  ===>>>', res1);

      // if (res1.status === 0) {
      //   console.log('Transaction Failed');
      // }

      res1 = await marketplaceInstance.setRoyalty(
        contractAddress,
        userAddress,
        royaltyPercentage,
        options
      );
      res1 = await res1.wait();

      if (res1.status === 0) {
        console.log('Transaction Failed');
      }

      return contractAddress;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    try {
      res1 = await creator.deployERC1155(
        name,
        blockchainContractAddress.marketplaceAddress
      );
      let hash = res1;

      res1 = await res1.wait();

      if (res1.status === 0) {
        console.log('Transaction Failed');
      }
      contractAddress = await readReceipt(hash);
      return contractAddress;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

/**
 *
 * @param {*} NFT Creation
 */
export const handleNFTCreation = async (
  chooseBlockchain,
  chooseCollection,
  name,
  symbol,
  chooseType,
  minterAddress
) => {
  console.log(
    chooseBlockchain,
    chooseCollection,
    name,
    symbol,
    { chooseType },
    minterAddress
  );
  let res1;
  let res;
  let contractAddress;
  let creator;
  const tokenId = generateRandomNumbers();

  let collectionAddress = await getCollection(chooseCollection);

  let blockchainContractAddress = await blockchainNetworkChainId();

  if (chooseType === 'single') {
    try {
      console.log(collectionAddress);
      let mintNFT = await exportInstance(collectionAddress, theeERC721ABI.abi);

      // const options = {
      //   gasPrice: 10000000000,
      //   gasLimit: 9000000,
      // };

      res = await mintNFT.mint(tokenId, '0x00');
      res = await res.wait();
      if (res.status === 0) {
        console.log('Transaction Failed');
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      return error;
    }
    return { tokenId, collectionAddress, res };
  } else {
    try {
      let mintNFT = await exportInstance(collectionAddress, theeERC1155ABI.abi);

      res1 = await mintNFT.mint(tokenId, 10, '', '0x00');
      let hash = res1;

      res1 = await res1.wait();

      if (res1.status === 0) {
        console.log('Transaction Failed');
      }
      contractAddress = await readReceipt(hash);
      return contractAddress;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

//* List NFTon Marketplace To Buy with Wrapped token/ native Token
/**
 *
 * @param {*} Normal Listing and Buying
 */

export const handleListNFTSale = async (
  chooseType,
  tokenId,
  fixedPrice,
  collectionAddress
) => {
  console.log(chooseType, tokenId, fixedPrice, collectionAddress);
  let res;
  const price = ethers.utils.parseEther(fixedPrice).toString();
  const userAccount = await getUserAddress();

  const time = getUnixTimeAfterDays(20);

  let blockchainContractAddress = await blockchainNetworkChainId();

  let nftInstance = await exportInstance(collectionAddress, theeERC721ABI.abi);

  let checkApproval = await nftInstance.isApprovedForAll(
    userAccount,
    blockchainContractAddress.marketplaceAddress
  );
  console.log(checkApproval);
  if (checkApproval === false) {
    res = await nftInstance.setApprovalForAll(
      blockchainContractAddress.marketplaceAddress,
      true
    );
    res = await res.wait();
  }

  let marketplaceInstance = await exportInstance(
    blockchainContractAddress.marketplaceAddress,
    Market.abi
  );

  console.info(collectionAddress, tokenId, price, time, 1, 2);

  let gasLimit = await marketplaceInstance.estimateGas.listToken(
    collectionAddress,
    tokenId,
    price,
    time,
    1,
    1
  );

  let options = {
    from: userAccount,
    gasLimit: Number(gasLimit) + 10,
  };

  console.log(Number(gasLimit) + 10);
  res = await marketplaceInstance.listToken(
    collectionAddress,
    tokenId,
    price,
    time,
    1,
    1,
    options
  );

  res = await res.wait();
  if (res.status === 0) {
    console.log('Transaction Failed');
  }
  return res.status;
};

/**
 *
 * @param {*} Fixed Price Buying Function
 */

export const handleNFTBuy = async (tokenPrice, collectionName, tokenId) => {
  console.info(tokenPrice, collectionName, tokenId);

  let res;
  const userAddress = await getUserAddress();
  console.log(userAddress);
  let blockchainContractAddress = await blockchainNetworkChainId();

  const price = ethers.utils.parseEther(tokenPrice);
  console.log(price);

  const options = {
    gasPrice: 10000000000,
    gasLimit: 9000000,
    value: price,
  };
  let collectionAddress = await getCollection(collectionName);

  console.log(collectionAddress);

  let nftInstance = await exportInstance(collectionAddress, theeERC721ABI.abi);
  console.log(userAddress, blockchainContractAddress.marketplaceAddress);

  let checkApproval = await nftInstance.isApprovedForAll(
    userAddress,
    blockchainContractAddress.marketplaceAddress
  );
  console.log(checkApproval);
  if (checkApproval === false) {
    await nftInstance.setApprovalForAll(
      blockchainContractAddress.marketplaceAddress,
      true
    );
  }

  let marketplaceInstance = await exportInstance(
    blockchainContractAddress.marketplaceAddress,
    Market.abi
  );

  console.info(collectionAddress, tokenId, 1, 1, 2, options);
  let paymentToken = 2;
  if (paymentToken === 2) {
    res = await marketplaceInstance.buyToken(
      collectionAddress,
      tokenId,
      1,
      1,
      2,
      options
    );
  } else {
    // let tokenInstance = await exportInstance(
    //   contracts.polygonContracts.TESTERC20,
    //   ERC20.abi
    // );

    // let checkApproval = await tokenInstance.allowance(
    //   userAddress,
    //   blockchainContractAddress.marketplaceAddress
    // );
    // console.log(checkApproval, price);
    // if (checkApproval <= price) {
    //   await tokenInstance.approve(
    //     blockchainContractAddress.marketplaceAddress,
    //     price * 2
    //   );
    // }
    await approveTokens(userAddress, tokenPrice);
    res = await marketplaceInstance.buyToken(
      collectionAddress,
      tokenId,
      1,
      1,
      1,
      { gasPrice: 10000000000, gasLimit: 9000000 }
    );
  }
  res = await res.wait();
  if (res.status === 0) {
    console.log('Transaction Failed');
  }
  console.log(res);
};

/**
 *
 * @returns NFT Bid Listing Function
 */

export const handleNFTBidListing = async (
  tokenId,
  tokenPrice,
  collectionAddress
) => {
  console.log(tokenId, tokenPrice, collectionAddress);
  let res;
  const price = ethers.utils.parseEther(tokenPrice);
  const time = getUnixTimeAfterDays(100);
  const userAddress = getUserAddress();
  let blockchainContractAddress = await blockchainNetworkChainId();

  let nftInstance = await exportInstance(collectionAddress, theeERC721ABI.abi);

  let checkApproval = await nftInstance.isApprovedForAll(
    userAddress,
    blockchainContractAddress.marketplaceAddress
  );
  console.log(checkApproval);
  if (checkApproval === false) {
    await nftInstance.setApprovalForAll(
      blockchainContractAddress.marketplaceAddress,
      true
    );
  }

  let marketplaceInstance = await exportInstance(
    blockchainContractAddress.marketplaceAddress,
    Market.abi
  );
  console.log(marketplaceInstance);

  // let options = {
  //   from: userAddress,
  //   gasLimit: Number(gasLimit) + 1000,
  // };

  const options = {
    gasPrice: 10000000000,
    gasLimit: 9000000,
  };

  let tokenApproval = await approveTokens(userAddress, tokenPrice);

  console.log("-->>>>>>",tokenApproval);

  console.info(collectionAddress, tokenId, price, time, 1, 1, 1);
  res = await marketplaceInstance.enterBidForToken(
    collectionAddress,
    tokenId,
    price,
    time,
    1,
    1,
    1,
    options
  );

  res = await res.wait();
  if (res.status === 0) {
    console.log('Transaction Failed');
  }
  return res.status;
};

export const handleDeListToken = async (contractAddress, tokenId) => {
  let blockchainContractAddress = await blockchainNetworkChainId();

  let res1;
  let marketplaceInstance = await exportInstance(
    blockchainContractAddress.marketplaceAddress,
    Market.abi
  );

  res1 = await marketplaceInstance.delistToken(contractAddress, tokenId);

  res1 = await res1.wait();
  if (res1.status === 0) {
    console.log('Transaction Failed');
  }
  return res1.status;
};

export const handleAcceptBid = async (
  contractAddress,
  tokenId,
  bidderAddress,
  priceOfNFT
) => {
  let res;
  const price = ethers.utils.parseEther(priceOfNFT);
  let blockchainContractAddress = await blockchainNetworkChainId();

  let marketplaceInstance = await exportInstance(
    blockchainContractAddress.marketplaceAddress,
    Market.abi
  );

  const options = {
    gasPrice: 10000000000,
    gasLimit: 9000000,
  };
  res = await marketplaceInstance.acceptBidForToken(
    contractAddress,
    tokenId,
    bidderAddress,
    1,
    1,
    1,
    price,
    options
  );
  res = await res.wait();
  if (res.status === 0) {
    console.log('Transaction Failed');
  }
  return res.status;
};

// export const handleWithdrawBidForToken = async (contractAddress, tokenId) => {
//   let res1;

//   let blockchainContractAddress = await blockchainNetworkChainId();

//   let marketplaceInstance = await exportInstance(
//     blockchainContractAddress.marketplaceAddress,
//     Market.abi
//   );

//   let gasLimit = await marketplaceInstance.estimateGas.withdrawBidForToken(
//     contractAddress,
//     tokenId
//   );
//   console.log(gasLimit);

//   res1 = await marketplaceInstance.withdrawBidForToken(
//     contractAddress,
//     tokenId
//   );

//   res1 = await res1.wait();
//   if (res1.status === 0) {
//     console.log('Transaction Failed');
//   }
//   return res1.status;
// };


export const handleWithdrawBidForToken = async (contractAddress, tokenId) => {
  let res1;

  let blockchainContractAddress = await blockchainNetworkChainId();

  let marketplaceInstance = await exportInstance(
    blockchainContractAddress.marketplaceAddress,
    Market.abi
  );

  // let gasLimit = await marketplaceInstance.estimateGas.withdrawBidForToken(
  //   contractAddress,
  //   tokenId
  // );
  // console.log(gasLimit);

  const options = {
    gasPrice: 10000000000,
    gasLimit: 9000000,
  };
  res1 = await marketplaceInstance.withdrawBidForToken(
    contractAddress,
    tokenId,
    options
  );

  res1 = await res1.wait();
  if (res1.status === 0) {
    console.log('Transaction Failed');
  }
  return res1.status;
};