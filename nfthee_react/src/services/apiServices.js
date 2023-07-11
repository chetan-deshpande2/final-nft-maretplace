// const BASE_URL = 'https://theemarketplace.onrender.com/api/';

import axios from 'axios';
import instance from '../axios';
// import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const BASE_URL = process.env.REACT_APP_BASE_URL + '/api';

export const getBlogData = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    let response = await fetch(BASE_URL + 'blog/fetch', requestOptions);
    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json');
    const result = isJson && (await response.json());
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

export const getSearchResult = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const response = await fetch(BASE_URL + '/search', requestOptions);
    const isJson = response.headers
      .get('content-type')
      ?.includes('applicatio/json');
    const result = isJson && (await response.json());
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

export const getSearchCollection = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const response = await fetch(BASE_URL + '/searchUser', requestOptions);
    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json');
    const result = isJson && (await response.json());
    return result;
  } catch (error) {
    return error;
  }
};

// export const getCollectionData = async () => {
//   instance.get('/createCollection/read',);
// };

// let historyMetaData = {
//   nftId: bidData.nftId,
//   userId: bidData.owner,
//   action: 'Bids',
//   actionMeta: 'Accept',
//   message: `bid for ${bidData.bidQuantity} of ${
//     details.oQuantity
//   } editions at ${convertToEth(bidData.bidPrice)} ${
//     paymentTokenData.symbol
//   } by ${sellerUsername}`,
//   created_ts: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
// };

export const insertHistory = async () => {
  const headers = {
    Authorization: 'Bearer my-token',
  }; //*  pass this header along with post request
  await instance
    .post('/api/insertHistory')
    .then((response) => {
      return console.log(response);
    })
    .catch((error) => {
      return console.log(error);
    });
};

// export const listNFT

export const getCollection = async (name) => {
  // console.log(name)
  // let requestOptions = { name: name };

  let datas = await instance
    .post('/api/getSingleCollectionByName', { name })
    .then((response) => {
      let data = response.data.data.contract_address;
      console.log(data);
      return data;
    })
    .catch((error) => {
      return error;
    });
  return datas;
};

export const handleLikes = async (result, value, setDisaable) => {
  const removeUrl = '/api/unlike';
  const addUrl = '/api/like';
  let data;

  if (value === 'liked') {
    console.log('value', value);
    setDisaable(true);
    data = await instance
      .post(addUrl, result)
      .finally(() => setDisaable(false));
  }
  if (value === 'unliked') {
    setDisaable(true);
    data = await instance
      .post(removeUrl, result)
      .finally(() => setDisaable(false));
  }
  console.log(data);
  return data;
};

export const createBid = async ({
  nftId,
  bidder,
  owner,
  bid_status,
  bid_price,
  bid_quantity,
  collectionName,
  to
}) => {
  const create = '/api/createBidNft';
  const url = '/api/getOrdersByNftId';
  // http://192.168.1.147:8002/api/getOrdersByNftId
  // let all=bidData.nftId
  const ldata = JSON.parse(localStorage.getItem('userLoggedIn'));
  console.log({ldata})
  let data;
  const order = await instance.post(url, { nftId });
  console.log({order},nftId)
  let orderId = order.data.data[0]._id;
  if (orderId) {
    let bidData = {
      bidder,
      owner,
      bid_status,
      bid_price: bid_price,
      nftId,
      orderId: orderId,
      bid_quantity,
    };
    data = await instance.post(create, bidData);
  }
  let historyMetaData = {
    nftId: nftId,
    userId: bidder,
    collection_name:`${collectionName}`,
    action: 'Bids',
    actionMeta: 'Default',
    message: `Bid by ${ldata.user_name}  with ${bid_price} price `,
    price:`${bid_price}`,
    from:`${ldata.user_name}`,
    to:`${to}`
  // };
  //  `${buyQuantity} Quantity For ${currentOrderMinBid} ${CURRENCY} by ${
  //   currentUser.slice(0, 3) +
  //   '...' +
  //   currentUser.slice(39, 42)
  // }`,
  // created_ts:  Moment(new Date()).format("YYYY-MM-DD HH:mm:ss"
  // ),
  };
  console.log('history', historyMetaData);
  let response = await instance
    .post(`/api/insertHistory`, historyMetaData)
    .then((res) => console.log('res.....................', res));

  return data;
};

export const acceptBid = async (bidID) => {
  const fetchUrl = '/api/acceptBidNft';
  let bidData={
    bidID:bidID,
    bid_status:"Accepted",
    bid_quantity:1
  }
  let data;

  data = await instance.post(fetchUrl, bidData);
  
  return data.status;
};

export const deleteBid = async (bidID) => {
  const fetchUrl = '/api/updateBidNft';
  let data;

  data = await instance.post(fetchUrl, { bidID, action: 'Delete' });

  return data.data;
};

export const fetchBid = async (nftId) => {
  const fetchUrl = '/api/fetchBidNft';
  let data;

  data = await instance.post(fetchUrl, { nftId });

  return data.data;
};

// export const fetchUserBid = async (id) => {
//   // http://localhost:8002?id=640972565a4dfcc2eb3b3fd3/api/userLikes?id=63fc56b0e0637d62e0f6d3ec
//   const fetchUrl = `http://192.168.1.143:8002/api/userBids?id=${id}`;
//   let data;

//   data = await // instance
//   axios.post(fetchUrl);

//   return data.data;
// };

 export const handleBuyNotification = async (id,collection_name,nftId,oldUserName) => {
  console.log({id},{collection_name},{nftId},{oldUserName})
  const ldata = JSON.parse(localStorage.getItem('userLoggedIn'));
  let receiver_token = '';

  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/signup/read?id=${id}`)
    .then((res) => {
      console.log('Sdvsdvsdsdvsdv', res.data.data.token_id);
      receiver_token = res.data.data.token_id;
    })
    .catch((e) => {
      console.log('get user data with id error-----', e);
    });

  setTimeout(() => {
    let payload = {
      sender_id: ldata._id,
      receiver_id: id,
      sender_token: ldata.token_id,
      receiver_token: receiver_token,
      sender_username: ldata.user_name,
      message: `${ldata.user_name} bought your Nft`,
    };
    console.log({payload})
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/notificationSend`, payload)
      .then((res) => {
        console.log('notification api send receiver', res);
      })
      .catch((e) => {
        console.log('notification api receiver', e);
      });

     const server_key =
      'AAAAkW3_zTk:APA91bGGi7WzQuFoyXb_e3Kv7LL4IKhab5dAfrKQpqBuGB69akF05Nisqcxc5aly1nsKqj-pgYlvWL_J6gLFx5IdwIaAe53JVYuUp602KIdyMfyy98eK2B8lAvzrBjTl2BEN723ySonS';

     const headers = {
      Authorization: `key=${server_key}`,
      'Content-Type': 'application/json',
     };
 
     let payloads = {
      to: receiver_token,
      data: {
        body: `${ldata.user_name} bought your Nft`,
        title: 'Firebase Notification',
      },
    };

    console.log('token---------------------', receiver_token);
    axios
      .post(`https://fcm.googleapis.com/fcm/send`, payloads, {
        headers: headers,
      })
      .then((res) => {
        console.log('FCM send method receiver', res);
      })
      .catch((e) => {
        console.log('FCM api error receiver', e);
      });
  }, 3000);
  let historyMetaData = {
    nftId:nftId ,
    userId:id,
    collection_name: `${collection_name}`,
    action: 'Purchase',
    actionMeta: 'Unlisted',
    message: `nft purchased by ${ldata.user_name} `,
    price: '0.01',
    to: `${ldata.user_name}`,
    from: `${oldUserName}`,
  };
  console.log('history', { historyMetaData });
  let response = await instance
  .post(`/api/insertHistory`, historyMetaData)
  .then((res) => console.log('res.....................', {res}));
  
};

export const handleBidNotification = async (id, bidAmount, update, nftId) => {
  // const { id } = useParams();
  // console.log('nftId',id)
  const ldata = JSON.parse(localStorage.getItem('userLoggedIn'));
  let receiver_token = '';
  console.log(bidAmount, 'djfjkdfgjdgdjfffjfkjfgn');
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/signup/read?id=${id}`)
    .then((res) => {
      console.log('Sdvsdvsdsdvsdv', res.data.data.token_id);
      receiver_token = res.data.data.token_id;
    })
    .catch((e) => {
      console.log('get user data with id error-----', e);
    });

  setTimeout(() => {
    let payload = {
      sender_id: ldata._id,
      receiver_id: id,
      sender_token: ldata.token_id,
      receiver_token: receiver_token,
      nftId: nftId,
      sender_username: ldata.user_name,
      message: `${ldata.user_name} ${
         update === 'update' ? 'updated bid' : 'bided'
      } on your Nft ${bidAmount}`,
    };

    instance
      .post(`/api/notificationSend`, payload)
      .then((res) => {
        console.log('notification api send receiver', res);
      })
      .catch((e) => {
        console.log('notification api receiver', e);
      });

    const server_key =
      'AAAAkW3_zTk:APA91bGGi7WzQuFoyXb_e3Kv7LL4IKhab5dAfrKQpqBuGB69akF05Nisqcxc5aly1nsKqj-pgYlvWL_J6gLFx5IdwIaAe53JVYuUp602KIdyMfyy98eK2B8lAvzrBjTl2BEN723ySonS';

    const headers = {
      Authorization: `key=${server_key}`,
      'Content-Type': 'application/json',
    };

    let payloads = {
      to: receiver_token,
      data: {
        body: `${ldata.user_name} ${
          typeof update === 'string' ? 'updated bid' : 'bided'
        } on your Nft ${bidAmount}`,
        title: 'Firebase Notification',
      },
    };

    console.log('token---------------------', receiver_token);
    axios
      .post(`https://fcm.googleapis.com/fcm/send`, payloads, {
        headers: headers,
      })
      .then((res) => {
        console.log('FCM send method receiver', res);
      })
      .catch((e) => {
        console.log('FCM api error receiver', e);
      });
  }, 3000);
};

export const handleAcceptNotification = async (id, bidAmount, nftId,newUser) => {
  console.log('nftId', nftId,newUser);

  // const currentPath = window.location.pathname;
  // console.log('nftIdsss',currentPath);

  const ldata = JSON.parse(localStorage.getItem('userLoggedIn'));
  let receiver_token;
  console.log(bidAmount, 'djfjkdfgjdgdjfffjfkjfgn');
await  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/signup/read?id=${id}`)
    .then((res) => {
      console.log('Sdvsdvsdsdvsdv', res.data.data.token_id);
      receiver_token = res.data.data.token_id;
    })
    .catch((e) => {
      console.log('get user data with id error-----', e);
    });
  let payload;
  setTimeout(() => {
    payload = {
      sender_id: ldata._id,
      receiver_id: id,
      sender_token: ldata.token_id,
      receiver_token: receiver_token,
      sender_username: ldata.user_name,
      message: `${ldata.user_name} accepted your offer`,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/notificationSend`, payload)
      .then((res) => {
        console.log('notification api send receiver', res);
      })
      .catch((e) => {
        console.log('notification api receiver', e);
      });

    const server_key =
      'AAAAkW3_zTk:APA91bGGi7WzQuFoyXb_e3Kv7LL4IKhab5dAfrKQpqBuGB69akF05Nisqcxc5aly1nsKqj-pgYlvWL_J6gLFx5IdwIaAe53JVYuUp602KIdyMfyy98eK2B8lAvzrBjTl2BEN723ySonS';

    const headers = {
      Authorization: `key=${server_key}`,
      'Content-Type': 'application/json',
    };

    let payloads = {
      to: receiver_token,
      data: {
        body: `${ldata.user_name} accepted your offer`,
        title: 'Firebase Notification',
      },
    };

    console.log('token---------------------', receiver_token);
    axios
      .post(`https://fcm.googleapis.com/fcm/send`, payloads, {
        headers: headers,
      })
      .then((res) => {
        console.log('FCM send method receiver', res);
      })
      .catch((e) => {
        console.log('FCM api error receiver', e);
      });
  }, 3000);
  console.log('console', ldata, receiver_token);
  let historyMetaData = {
    nftId: nftId,
    userId: ldata._id,
    action: 'Transfer',
    actionMeta: 'Default',
    message: `Accept Bid by ${ldata?.user_name} `,
    from:ldata.user_name,
    to:`${newUser}`
  };
  //   //  `${buyQuantity} Quantity For ${currentOrderMinBid} ${CURRENCY} by ${
  //   //   currentUser.slice(0, 3) +
  //   //   '...' +
  //   //   currentUser.slice(39, 42)
  //   // }`,
  //   // created_ts: moment(new Date()).format(
  //   //   'YYYY-MM-DD HH:mm:ss'
  //   // ),
  // // };
  console.log('history', historyMetaData);
  let response = await instance
    .post(`/api/insertHistory`, historyMetaData)
    .then((res) => console.log('res.....................', res));
};

export const getPriceConversion = async (blockchainName) => {
  // console.log({blockchainName})
  let res;
  if(blockchainName==='Polygon Testnet'){
    res='MATIC'
  }
  if(blockchainName==='Ethereum Sepolia Testnet'){
    res='ETH'
  } if(blockchainName==='BSC Testnet'){
    res='BNB';
  } if(blockchainName==='Harmony Testnet'){
    res='ONE'
  }
  if(blockchainName===''){
    res='MATIC'
  }
  // let res = 'BNB';
  let result = await axios
    .get(`https://min-api.cryptocompare.com/data/price?fsym=${res}&tsyms=USD`)
    .then((response) => {
      let data = response.data.USD;
      console.log(data);
      return data;
    })
    .catch((error) => {
      return error;
    });
  return result;
}; 

// const maticPrice = await getPriceConversion('MATIC');
// const bnbPrice = await getPriceConversion('BNB');
// const ethPrice = await getPriceConversion('ETH');
// export const getPriceConversion = async (symbol) => {
//   // let res = 'MATIC';
//   let result = await axios
//     .get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`)
//     .then((response) => {
//       let data = response.data.USD;
//       console.log(data);
//       return data;
//     })
//     .catch((error) => {
//       return error;
//     });
//   return result;
// }; 
export const handleNftBuyData = async (currentOwner,nftId) => {

  await instance.post('/api/buyNft',{currentOwner:currentOwner,nftId:nftId})
.then(res=>{
  if(res.status===200){
    Swal.fire({
      icon: "success",
      title: "Purchased Successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  }
})
  // return result;
};
export const RemoveAuction = async (nftId) => {

  let result=  await instance.post('/api/nftRemoveAuction',{nftId:nftId})

  return result.status;
};

export const UpdateListing = async (nftId,price,action) => {
 let data;

 if(action===0){
  data={
    nftId:nftId,
    putOnMarketplace:{
      price:price
    },
    listing:'listing'
  }
 }if(action===1){
  data={
    nftId:nftId,
    putOnMarketplace:{
      Bid_price:price
    },
    listing:'listing'
  }
 }
 let result= await instance.post('/api/updateListing',data)

  return result.status;
};




