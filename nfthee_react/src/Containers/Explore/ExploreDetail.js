/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  // FilterCard,
  // filter_card,
  // AccordionCards,
  // cardData,
  SingleSlider,
} from './ExploreFilterData';
import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import {
  ModalBuynft,
  ConvertModal,
  ListingModal,
} from '../../Components/Layout/Modal';

import { useTranslation } from 'react-i18next';
import Apexcharts from '../../Components/Apexcharts';
import Loader from '../../Components/Loader/Loader';
import $ from 'jquery';
import { MultiSelect } from 'react-multi-select-component';
import {
  acceptBid,
  fetchBid,
  createBid,
  updateBid,
  getCollection,
  handleBidNotification,
  handleAcceptNotification,
  deleteBid,
  getPriceConversion,
  RemoveAuction,
} from '../../services/apiServices';
import '../../index.css';
import instance from '../../axios';
import { handleLikes } from '../../services/apiServices';
import {
  wrapPaymentTokens,
  unwrapPaymentTokens,
} from '../../Config/token-actions/wrap-token';

import {
  handleAcceptBid,
  handleDeListToken,
  handleWithdrawBidForToken,
  handleNFTBidListing,
} from '../../Config/sendFunctions';

import { getUserAddress } from '../../Config/constants';
import Swal from 'sweetalert2';
import axios from 'axios';
import { checkNetwork } from '../../Config/helpers';

const options = [
  { label: 'Creation', value: 'Creation' },
  { label: 'Transfer', value: 'Transfer' },
  { label: 'Bids', value: 'Bids' },
  // { label: "Cancel Listing", value: "Cancel Listing" },
  { label: 'Sales', value: 'Sales' },
];
// const mystyle = {
//   display: "block",
//   width: "550px",
//   fontSize: "1rem",
//   fontWeight: 400,
//   lineHeight: 1.5,
//   color: "#212529",
//   backgroundColor: "#fff",f
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "right 0.75rem center",
//   backgroundSize: "16px 12px",
//   border: "1px solid #ced4da",
//   borderRadius: "0.25rem"
// }
function ExploreDetail() {
  // const ExploreDetail = ( currencyImage ) => {
  const { id } = useParams();
  const history = useHistory();
  // console.log("id of /ExploreDetails", id);
  const [selected, setSelected] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [convertModalOpen, setconvertModalIsOpen] = useState(false);
  const [listingModalOpen, setlistingModalIsOpen] = useState(false);
  const userId = JSON.parse(localStorage.getItem('userLoggedIn')) || '';
  const [like, setliked] = useState();
  const [listing, setListing] = useState('0');
  const [priceInUSD, setPriceInUSD] = useState(0);
  const [currency, setCurrency] = useState();
  const [currencyImage, setCurrencyImage] = useState();
  const [report, setReport] = useState();
  const [priceCov, setPriceCon] = useState();

  const [openForBids, setOpenForBids] = useState({
    Bid_price: '',
  });
  console.log({ listing });
  const [fixedPrice, setFixedPrice] = useState({
    price: '',
  });
  const [timedAuction, setTimedAuction] = useState({
    minimumBid: 0,
    finishDate: 0,
  });

  const [changes, setChanges] = useState();
  const [count, setCount] = useState();
  const pageUrl = window.location.href;


  function myFunction() {
    navigator.clipboard.writeText(pageUrl);
    var tooltip = document.getElementById('tooltip');
    tooltip.classList.add('active');
    setTimeout(() => {
      tooltip.classList.remove('active');
    }, 1500);
    
  }
  //creating function to load ip address from the API
  const getData = async () => {
    const postId = id;
    const res = await axios.get('https://geolocation-db.com/json/');

    await instance
      .post(`/api/posts/${postId}/views`, { ip: res.data.IPv4 })
      .then((res) => setCount(res.data.data));
  };
  const handleFixedPriceChange = (e) => {
    setFixedPrice({
      ...fixedPrice,
      [e.target.name]: e.target.value,
    });
  };

  const handleBidPriceChange = (e) => {
    setOpenForBids({
      ...openForBids,
      [e.target.name]: e.target.value,
    });
  };
  console.log('======>', { fixedPrice }, { openForBids });

  const handleTimedAuctionChange = (e) => {
    setTimedAuction({
      ...timedAuction,
      [e.target.name]: e.target.value,
    });
  };
  const handleReportData = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  const convertToggleModal = () => {
    setconvertModalIsOpen(!convertModalOpen);
  };
  const listingToggleModal = () => {
    setlistingModalIsOpen(!listingModalOpen);
  };

  useEffect(() => {
    collectionSlider();
  });
  const [nftData, setNftData] = useState([]);
  const [shownList, setShownList] = useState([]);
  const [bidData, setBidData] = useState([]);

  const handleBidData = async () => {
    const data = await fetchBid(id);
    console.log('data',data)
    setBidData(data.data);
  };
  const submitReport = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (report.action) {
      formData.append('action', report.action);
    }
    if (report.report_issue) {
      formData.append('report_issue', report.report.report_issue);
    }
    formData.append('nftId', id);
    formData.append('userId', userId._id);

    instance
      // .post(`/api/insertReport`, formData)
      .post(`/api/insertReport`, {
        action: report.action,
        // report_issue:report_issue,
        nftId: id,
        userId: userId._id,
      })

      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Reported Successfully',
            showConfirmButton: false,
            timer: 2500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  useEffect( () => {

   let newCurrency;
    if(nftData.chooseBlockchain==='Polygon Testnet'){
      newCurrency = 'MATIC';
    }
    if(nftData.chooseBlockchain==='Ethereum Sepolia Testnet'){
      newCurrency = 'ETH';
    } if(nftData.chooseBlockchain==='BSC Testnet'){
      newCurrency = 'BNB';
    } if(nftData.chooseBlockchain==='Harmony Testnet'){
      newCurrency = 'ONE';
    }
 setCurrency(newCurrency)
  }, [nftData.chooseBlockchain]);
  useEffect( () => {
 
    let newCurrencyImage;
     if(nftData.chooseBlockchain==='Polygon Testnet'){
      newCurrencyImage = '/assets/images/icons/polygon.png';
     }
     if(nftData.chooseBlockchain==='Ethereum Sepolia Testnet'){
      newCurrencyImage = "/assets/images/icons/ethereum-big.png";
     } if(nftData.chooseBlockchain==='BSC Testnet'){
      newCurrencyImage = '/assets/images/icons/binance.png';
     } if(nftData.chooseBlockchain==='Harmony Testnet'){
      newCurrencyImage = '/assets/images/icons/harmony.png';
     }
  setCurrencyImage(newCurrencyImage)
   }, [nftData.chooseBlockchain]);
  useEffect(async () => {
    // console.log({selected},{options})
    handleBidData();
    getData();
    await instance
      .get(`/api/read?id=${id}`)
      .then((response) => {
        // setLoading(true);
        // console.log(response.data, "<><><>><>><><><><><><><");
        setNftData(response.data.data);

        setIsLoading(false);
        let name = response.data.data.chooseCollection;
        // console.log({ name });
        instance.get(`/api/all?collection=${name}`).then((response) => {
          setShownList(response.data.data);
        });
      })

      .catch((e) => {
        // setLoading(true);
      });
  }, [id, like, changes]);
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

  function abbreviateNumber(num) {
    const tier = Math.floor(Math.log10(num) / 3) || 0;
    let result = '' + num;
    // if zero, we don't need a suffix
    if (tier > 0) {
      // get suffix and determine scale
      const suffix = SI_SYMBOL[tier];
      const scale = Math.pow(10, tier * 3);
      // scale the number
      const scaled = num / scale;
      // format number and add suffix
      result = scaled.toFixed(1).replace('.0', '') + suffix;
    }
    return result;
  }
  const num = count || 0;
  const abbreviatedNum = abbreviateNumber(num);

  const handlePriceConversion = async (nftPrice) => {
    // let result = await getPriceConversion(res);
    // if(nftData.chooseBlockchain==='Polygon Testnet'){
    //  res='MATIC'
    // }
    let result = await getPriceConversion(nftData.chooseBlockchain);
    console.log({result},)
    let convertToUSD = (parseFloat(result) * parseFloat(nftPrice)).toFixed(5);
    console.log({convertToUSD})
    setPriceInUSD(convertToUSD);
    setPriceCon(result);
  };

  useEffect(async () => {
    let priceOfNFT =
      nftData?.putOnMarketplace && nftData?.putOnMarketplace.price === undefined
        ? nftData?.putOnMarketplace.Bid_price
        : nftData?.putOnMarketplace.price
        ? nftData?.putOnMarketplace.price
        : nftData?.putOnMarketplace.Bid_price;
    console.log('->->->', { priceOfNFT });

    await handlePriceConversion(priceOfNFT);
  }, [handlePriceConversion]);
  // const [selected, setSelected] = useState([]);

  // console.log("exploreDetail",nftData)
  const collectionSlider = () => {
    $(document).ready(function () {
      $('.explore-collection-slider1').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        cssEase: 'linear',
        adaptiveHeight: true,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="ri-arrow-left-s-line"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="ri-arrow-right-s-line"></i></button>',
        responsive: [
          {
            breakpoint: 1124,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 868,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows: false,
            },
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows: false,
            },
          },
        ],
      });
    });
  };
  const [bidAmount, setBidAmount] = useState();

  const handleBidAmount = async (e) => {
    let network = checkNetwork(nftData.chooseBlockchain);
    if (network === 1) {
      let collectionContractAddress = await getCollection(
        nftData.chooseCollection
      );

      console.log(nftData, parseFloat(bidAmount), collectionContractAddress);

      const result = await handleNFTBidListing(
        nftData.tokenId,
        bidAmount,
        collectionContractAddress
      );
      // console.log(result);
      let update = e.target.id;
      console.log({ update });
      if (bidAmount != '' || undefined || null) {
        let bidData = {
          bidder: userId._id,
          owner: nftData?.currentOwner?._id,
          bid_status: 'Bid',
          bid_price: bidAmount,
          nftId: nftData._id,
          bid_quantity: 1,
          collectionName: nftData.chooseCollection,
          to: nftData.currentOwner.user_name,
        };
        await handleBidNotification(
          nftData?.currentOwner?._id,
          bidAmount,
          update,
          nftData._id
        );

        const data = await createBid(bidData);
        if (data.status === 200) {
         
          // if (notifi.status === 200) {
            setTimeout(() => {
              
              setChanges(Math.random());
            }, 2000);
          // }
        }
      }
    }
  };

  const [diable, setDisaable] = useState(false);

  const handleAddFavorite = async (e, collection) => {
    const requestBody = {
      id: userId._id,
      postId: collection,
    };
    if (userId._id != '' || undefined) {
      console.log('test==>>>>>if', requestBody, e.target.id);
      const data = await handleLikes(requestBody, e.target.id, setDisaable);
      if (!data) {
        setDisaable(true);
      } else setDisaable(false);
      if (data) {
        setDisaable(false);
        setliked(Math.random());
      }
    }
  };
  const [fetchHistory, setFetchHistory] = useState([]);

  const [xaxis, setxaxis] = useState();
  const [avgPrice, setAvgPrice] = useState();
  const [volume, setVolume] = useState();

  const [itemEvent, setItemEvent] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [itemOffer, setItemOffer] = useState([]);
  const [itemDate, setItemDate] = useState([]);

  const [activeTab, setActiveTab] = useState('0');
  const [eth, setEth] = useState();
  const [wth, setWth] = useState();
  const [contractAddress, setContractAddress] = useState('');

  const handleEth = async (e) => {
    console.log({ eth }, { wth });

    await wrapPaymentTokens(eth);
  };
  const handleWth = async (e) => {
    console.log({ eth }, { wth });

    await unwrapPaymentTokens(wth);
  };

  const handleTokenAcceptBid = async (bidPrice, bidderAddress, bidId) => {
    console.log(bidPrice, bidderAddress,);

    let data = await getCollection(nftData.chooseCollection);

    let result = await handleAcceptBid(
      data,
      nftData.tokenId,
      bidderAddress,
      JSON.stringify(bidPrice)
    );

    if (result === 1) {
     let data= await handleAcceptNotification(nftData?.currentOwner?._id, bidAmount, id);
      let bidAccepted = await acceptBid(bidId);
      await handleAcceptNotification(nftData?.currentOwner?._id, bidAmount, id,nftData?.currentOwner?.user_name);
      // let notification = await handleAcceptNotification();

      if (bidAccepted === 200) {
        setliked(Math.random());
      }
    }
    console.log('data.........................result...........', data);
  };

  const withdrawTokenBid = async (bidid) => {
    // let collectionAddress = await getCollection(nftData.chooseCollection);

    // let result = await handleWithdrawBidForToken(
    //   collectionAddress,
    //   nftData.tokenId
    // );

    let r = await deleteBid(bidid);

    if (r.success === true) {
      setliked(Math.random());
    }
    console.log('delete', r);
  };

  const removeFromAuction = async () => {
    console.log('Remove from auction');
    let network = checkNetwork(nftData.chooseBlockchain);

    if (network === 1) {
      let collectionAddress = await getCollection(nftData.chooseCollection);

      let result = await handleWithdrawBidForToken(
        collectionAddress,
        nftData.tokenId
      );
      if (result === 1) {
        let removeStatus = await RemoveAuction(nftData._id);
        if (removeStatus === 200) {
          let historyMetaData = {
            nftId: `${nftData?._id}`,
            userId: `${nftData?.currentOwner?._id}`,
            collection_name: `${nftData?.chooseCollection}`,
            action: 'Delisting',
            actionMeta: 'Listed',
            message: `nft Delisted by ${userId.user_name} `,
            price: ` `,
            to: ' ',
            from: `${userId.user_name}`,
          };
          console.log('history', { historyMetaData });
          let response = await instance.post(
            `/api/insertHistory`,
            historyMetaData
          );
          Swal.fire({
            icon: 'success',
            title: 'Removed From Auction Successfully',
            showConfirmButton: false,
            timer: 2500,
          });

          setChanges(Math.random());
        }
      }
    }
  };

  const handleTokenDelisting = async () => {
    let network = checkNetwork(nftData.chooseBlockchain);

    if (network === 1) {
    let collectionAddress = await getCollection(nftData.chooseCollection);
    // console.log(collectionAddress);
    let result = await handleDeListToken(collectionAddress, nftData.tokenId);
    console.log('DELSITINGF',result);
    if (result === 1) {
      let removeStatus = await RemoveAuction(nftData._id);
      if (removeStatus === 200) {
        let historyMetaData = {
          nftId: `${nftData?._id}`,
          userId: `${nftData?.currentOwner?._id}`,
          collection_name: `${nftData?.chooseCollection}`,
          action: 'Delisting',
          actionMeta: 'Listed',
          message: `nft Delisted by ${userId.user_name} `,
          price: ` `,
          to: ' ',
          from: `${userId.user_name}`,
        };
        console.log('history', { historyMetaData });
        let response = await instance.post(
          `/api/insertHistory`,
          historyMetaData
        );
        Swal.fire({
          icon: 'success',
          title: 'Delisting  Successfully',
          showConfirmButton: false,
          timer: 2500,
        });

        setChanges(Math.random());
      }
    }
    }
  };
  // search
  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  // search end
  useEffect(() => {
    function openGraph(divId) {
      $('#' + divId).toggle();
    }
    $('.graph-icon img').click(function () {
      $(this).toggleClass('btnColor-pink');
    });
  }, []);
  const hasBidder = bidData.some((bid) => {
    return bid.bidder.hasOwnProperty('_id') && bid.bidder._id === userId._id;
  });

  // console.log({ fixedPrice }, { openForBids }, { timedAuction });
  useEffect(() => {
    let fetch = instance.post(`/api/fetchHistory?nftId=${id}`).then((res) => {
      //  console.log('resItem',res.data.data[0].action))
      // const action = res.data.data.map((item) => item);
      // console.log("action", action);
      setItemEvent(res.data.data);
    });

    //  .then((res)=>setItemActivity(res.data.data.action))
  }, []);

  useEffect(() => {
    let fetch = instance.post(`/api/fetchHistory?nftId=${id}`).then((res) => {
      const action = res.data.data.map((item, index) => {
        if (item.action === 'Creation') {
          return { ...item, index };
        }
        return item;
      });
      console.log('List', { action });
      setItemList(action);
    });
  }, []);
  useEffect(() => {
    let fetch = instance.post(`/api/fetchHistory?nftId=${id}`).then((res) => {
      const action = res.data.data.map((item, index) => {
        if (item.action === 'Bids') {
          return { ...item, index };
        }
        return item;
      });
      console.log('List', { action });
      setItemOffer(action);
    });
  }, []);

  useEffect(() => {
    instance
      .post(`/api/fetchHistory?nftId=${id}`)
      .then((res) => {
        // console.log('resHistory',res.data.data);

        const history = res.data.data.map((item) => item.message);
        setFetchHistory(history);
        const newAxis = res.data.data.map((data) => data.sCreated);
        // const vol = res.data.data.map((data) => data.action);
        const newprice = res.data.data.map((data) => data.price);
        setxaxis(newAxis);
        setAvgPrice(newprice);
        // setVolume(vol);
      })
      .catch((error) => {
        console.error('Error fetching history', error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main>
          <section className='explore-detail-bg-section'>
            <div className='container-fluid px-lg-5'>
              <div className='row mb-3'>
                <div className='col-lg-12 col-md-12'>
                  <button
                    className='rounded-pill'
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    <span className='back-text'>
                      {' '}
                      <i className='ri-arrow-left-s-line' />
                      {t('product.Back')}
                    </span>
                  </button>
                </div>
              </div>
              <div className='explore-item-detail mb-lg-5 mb-3'>
                <div className='row'>
                  {isModalOpen && (
                    <ModalBuynft
                      onRequestClose={toggleModal}
                      nftData={nftData}
                      userId={userId._id}
                      setChanges={setChanges}
                    />
                  )}
                  {convertModalOpen && (
                    <ConvertModal
                      onRequestClose={convertToggleModal}
                      setActiveTab={setActiveTab}
                      setEth={setEth}
                      setWth={setWth}
                      handleEth={handleEth}
                      handleWth={handleWth}
                      eth={eth}
                      wth={wth}
                      activeTab={activeTab}
                    />
                  )}

                  {listingModalOpen && (
                    <ListingModal
                      setChanges={setChanges}
                      listClosing={listingToggleModal}
                      userId={userId}
                      itemData={nftData}
                      listing={listing}
                      setListing={setListing}
                      handleFixedPriceChange={handleFixedPriceChange}
                      handleTimedAuctionChange={handleTimedAuctionChange}
                      fixedPrice={fixedPrice}
                      handleBidPriceChange={handleBidPriceChange}
                      openForBids={openForBids}
                      timedAuction={timedAuction}
                      setTimedAuction={setTimedAuction}
                    />
                  )}
                  <div className='col-lg-6 col-md-6'>
                    <div className='item-image'>
                      <img
                        src={nftData?.uploadFile}
                        alt=''
                        className='img-fluid'
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-6'>
                    <div className='explore-item-detail-content'>
                      <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h3 className='heading-title mb-0'>
                          {nftData
                            ? nftData.name
                            : t('product.The Fantasy Flower Illustration')}
                        </h3>
                        <div className='user-more-detail'>
                          <div className='explore-social-icon d-flex align-items-center'>
                          <span id='tooltip' className='tooltip '>
    Copied !
  </span>
                            <ul>
                              <li>
                             
                                <div className='user-more-detail'>
                                  <div className='more'>
                                    <div className='icon'>
                                      {' '}
                                      <a href={`/exploredetail/${id}`}>
                                        {' '}
                                        <img
                                          src={
                                            '/assets/images/icons/rotate.png'
                                          }
                                          alt=''
                                        />{' '}
                                      </a>{' '}
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className='user-more-detail'>
                                  <div className='more'>
                                    <div className='icon dropdown'>
                                      <a
                                        href='#'
                                        data-bs-toggle='dropdown'
                                        aria-expanded='false'
                                      >
                                        <i className='ri-more-fill' />
                                      </a>
                                      <div className='dropdown-menu dropdown-menu-end dropdown-menu-arrow'>
                                   
                                        <a className='dropdown-item'    
                                      href='javascript:void(0)'
                                      type='button'
                                      onClick={myFunction}
                                      data-toggle='tooltip'
                                      title='Share'>
                                          {' '}
                                          <span className='dropdown-icon'>
                                            <img
                                              src={
                                                '/assets/images/icons/share.png'
                                              }
                                            />
                                          </span>{' '}
                                          {t('product.share')}{' '}
                                        </a><br/><br/>
                                        <a
                                          className='dropdown-item'
                                          href='#reportModal'
                                          data-bs-toggle='modal'
                                          data-bs-target='#reportModal'
                                        >
                                          {' '}
                                          <span className='dropdown-icon'>
                                            <img
                                              src={
                                                '/assets/images/icons/report.png'
                                              }
                                            />
                                          </span>{' '}
                                          {t('product.report')}{' '}
                                        </a>
                                        
                                        <a className='dropdown-item' href='#'>
                                          {' '}
                                          <span className='dropdown-icon'>
                                            <img
                                              src={
                                                '/assets/images/icons/home.png'
                                              }
                                            />
                                          </span>{' '}
                                          {t('product.website')}{' '}
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className='mb-3'>
                        <div className='d-flex align-items-center'>
                          <a href='#' className='view'>
                            <i className='ri-eye-line icon' /> {abbreviatedNum}
                          </a>

                          {/* <i className='ri-heart-line icon' />{' '}
                            {nftData.likes.length
                              ? nftData.likes.length
                              : ''}
                            100 */}
                          <span className='like ms-3'>
                            {nftData.likes.includes(userId._id) ? (
                              <button
                                className='wishlist-button p-2 m-0'
                                id='unliked'
                                disabled={diable}
                                onClick={(e) =>
                                  handleAddFavorite(e, nftData._id)
                                }
                                tabIndex={0}
                              >
                                <span className='number-like d-flex'>
                                  <i
                                    id='unliked'
                                    className='ri-heart-fill me-1'
                                  />
                                  {nftData.likes
                                    ? nftData.likes.length === 0
                                      ? ''
                                      : nftData.likes.length
                                    : ''}
                                </span>
                              </button>
                            ) : (
                              <button
                                className='wishlist-button p-2 m-0'
                                id='liked'
                                disabled={diable}
                                onClick={(e) =>
                                  handleAddFavorite(e, nftData._id)
                                }
                                tabIndex={0}
                              >
                                <span className='number-like d-flex'>
                                  <i
                                    id='liked'
                                    className=' ri-heart-line me-1'
                                  />
                                  {nftData.likes
                                    ? nftData.likes.length === 0
                                      ? ''
                                      : nftData.likes.length
                                    : ''}
                                </span>
                              </button>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className='mb-3 d-flex d-lg-block flex-wrap'>
                        <a href='#' className='token-detail'>
                          <span>{t('product.Token id')} : </span>#
                          {nftData.tokenId}
                        </a>
                        <a href='#' className='token-detail ms-lg-3'>
                          <span>{t('product.Token standard')} : </span>
                          {nftData.chooseType === 'single' ? (
                            <span>ERC721 </span>
                          ) : (
                            <span>ERC1155 </span>
                          )}
                        </a>
                        <a href='#' className='token-detail ms-lg-3'>
                          <span>Contract: </span> Test
                          {/* {contractAddress.substring(0, 5)} */}
                        </a>{' '}
                        <br />
                        <a href='#' className='token-detail '>
                          <span style={{ marginLeft: '0' }}>
                            {t('product.Blockchain')} :{' '}
                          </span>
                          {nftData ? nftData.chooseBlockchain : 'undefined'}
                        </a>
                        <a href='#' className='token-detail ms-lg-3'>
                          <span>Creator Royalties : </span>0.5 %{' '}
                          <i class='las la-info-circle'></i>
                        </a>
                      </div>
                      <div className='row mb-4 gx-lg-3'>
                        <div className='col-lg-5 col-md-5'>
                          <a href='#'>
                            <div className='creator-card mb-4 mb-lg-0'>
                              <div className='card-body'>
                                <div className='avatars'>
                                  <div className='media'>
                                    <img
                                      src={
                                        nftData?.currentOwner?.profile_image ||
                                        '/assets/images/avt-1.jpg'
                                      }
                                      alt=''
                                      className='avatar'
                                    />
                                  </div>
                                  <div className='ms-3'>
                                    <p className='text1'>Owned By</p>
                                    <span className='text2'>
                                      <Link
                                        to={`/users/${nftData?.currentOwner?._id}`}
                                      >
                                        {nftData?.currentOwner?.user_name || ''}
                                      </Link>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>

                        <div className='col-lg-5 col-md-5'>
                          <a href='#'>
                            <div className='creator-card'>
                              <div className='card-body'>
                                <div className='avatars align-items-start'>
                                  <div className='media'>
                                    <a href='#'>
                                      {' '}
                                      <img
                                        src='/assets/images/icons/tezoz.png'
                                        alt=''
                                        className='avatar'
                                      />
                                    </a>
                                  </div>
                                  <div className='ms-3'>
                                    <p className='text1'>Collection </p>
                                    <span className='text2'>
                                      {nftData
                                        ? nftData.chooseCollection
                                        : 'undefined'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className='mb-3'>
                        <ul className='nav nav-tabs' id='myTab' role='tablist'>
                          <li className='nav-item' role='presentation'>
                            <button
                              className='nav-link active'
                              id='description-tab'
                              data-bs-toggle='tab'
                              data-bs-target='#description'
                              type='button'
                              role='tab'
                              aria-controls='home'
                              aria-selected='true'
                            >
                              {t('product.Description')}
                            </button>
                          </li>
                          <li className='nav-item' role='presentation'>
                            <button
                              className='nav-link'
                              id='about-tab'
                              data-bs-toggle='tab'
                              data-bs-target='#about'
                              type='button'
                              role='tab'
                              aria-controls='about'
                              aria-selected='false'
                            >
                              {t('product.about project')}
                            </button>
                          </li>
                          {/* <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="history-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#history"
                              type="button"
                              role="tab"
                              aria-controls="history"
                              aria-selected="false"
                            >
                              History
                            </button>
                          </li> */}
                          <li className='nav-item' role='presentation'>
                            <button
                              className='nav-link'
                              id='attribute-tab'
                              data-bs-toggle='tab'
                              data-bs-target='#attribute'
                              type='button'
                              role='tab'
                              aria-controls='attribute'
                              aria-selected='false'
                            >
                              {t('product.Attributes')}
                            </button>
                          </li>
                          {nftData.putOnMarketplace.Bid_price ? (
                            <li className='nav-item' role='presentation'>
                              <button
                                className='nav-link'
                                id='Bid-tab'
                                data-bs-toggle='tab'
                                data-bs-target='#Bid'
                                type='button'
                                role='tab'
                                onClick={handleBidData}
                                aria-controls='Bid'
                                aria-selected='false'
                              >
                                {t('Bid')}
                              </button>
                            </li>
                          ) : (
                            ''
                          )}
                        </ul>

                        <div
                          className='tab-content custom-scrollbar'
                          id='myTabContent'
                        >
                          <div
                            className='tab-pane fade show active'
                            id='description'
                            role='tabpanel'
                            aria-labelledby='description-tab'
                          >
                            <div className='card-body'>
                              <p className='para1'>
                                {nftData
                                  ? nftData.designation
                                  : t('product.detail_description')}
                              </p>
                              <div className='col-lg-6 col-md-6 px-lg-0'>
                                <div className='creator-card creator-card-two mb-lg-4'>
                                  <div className='card-body'>
                                    <div className='avatars '>
                                      <div className='media'>
                                        <div className='badge'>
                                          <img
                                            src='/assets/images/icons/star-check.png'
                                            alt=''
                                          />
                                        </div>
                                        <a href='#'>
                                          <img
                                            src={
                                              nftData?.currentOwner
                                                ?.profile_image ||
                                              '/assets/images/avt-1.jpg'
                                            }
                                            alt=''
                                            className='avatar'
                                          />
                                        </a>
                                      </div>
                                      <div className='ms-3'>
                                        <p className='text1'>
                                          {t('product.Minted By')}{' '}
                                          <span>
                                            <Link
                                              to={`/users/${nftData?.currentOwner?._id}`}
                                            >
                                              {nftData?.currentOwner?.user_name
                                                ? nftData?.currentOwner
                                                    ?.user_name
                                                : ''}
                                            </Link>
                                          </span>
                                        </p>
                                        <span className='text2'>
                                          {/* 3 hours ago */}
                                          {nftData?.timeSinceCreated
                                            ? nftData?.timeSinceCreated
                                            : '3 hours ago'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className='tab-pane fade'
                            id='about'
                            role='tabpanel'
                            aria-labelledby='about-tab'
                          >
                            <div className='card-body'>
                              <p className='para1'>
                                {nftData ? nftData.about : 'lorem35'}
                              </p>
                            </div>
                          </div>
                          {/* <div
                            className="tab-pane fade"
                            id="history"
                            role="tabpanel"
                            aria-labelledby="history-tab"
                          >
                            <div className='card-body'>
                              {fetchHistory.map((message) => (
                                <div className='history-content mb-2'>
                                  <div className='card-body  p-1'>
                                    <p className='card-text para1 m-0' key={message}>{message}</p>
                                  </div>



                                </div>
                              ))}
                            </div>

                          </div> */}

                          {/* WETHtoETH */}
                          {/* {nftData.putOnMarketplace.Bid_price &&nftData.currentOwner ===id? */}
                          <div
                            className='tab-pane fade'
                            id='Bid'
                            role='tabpanel'
                            aria-labelledby='Bid-tab'
                          >
                            {bidData
                              .filter((bid) => bid.bid_price > 0)
                              .map((data, i) => (
                                <div className='card-body'>
                                  <div className='col-lg-6 col-md-6 px-lg-0'>
                                    <div className='creator-card creator-card-two mb-lg-4'>
                                      <div className='card-body' key={i}>
                                        <div className='avatars align-items-start'>
                                          <div className='media'>
                                            <div className='badge'>
                                              <img
                                                src='/assets/images/icons/star-check.png'
                                                alt=''
                                              />
                                            </div>
                                            <a href='#'>
                                              <img
                                                src={
                                                  data?.bidder?.profile_image
                                                    ? data.bidder.profile_image
                                                    : '/assets/images/avt-1.jpg'
                                                }
                                                alt=''
                                                className='avatar'
                                              />
                                            </a>
                                          </div>
                                          <div className='ms-3'>
                                            <p className='text2'>
                                              <div className='input-group-prepend'>
                                                <span className='input-group-text'>
                                                  {/* <img
                                                    src='/assets/images/icons/ethereum-pink.png'
                                                    alt=''
                                                    className='me-1 eth-icon'
                                                  /> */}
                                                     {/* { (data.nftId?.chooseBlockchain === "Polygon Testnet")?
                                                                  <img
                                                                    src="/assets/images/icons/polygon.png"
                                                                    alt=''
                                                                    className='me-1'
                                                                  />: (data.nftId?.chooseBlockchain === "BSC Testnet")?  <img
                                                                  src="/assets/images/icons/binance.png"
                                                                  alt=''
                                                                  className='me-1'
                                                                />:(data.nftId?.chooseBlockchain === "Ethereum Sepolia Testnet")?  <img
                                                                src="/assets/images/icons/ethereum-big.png"
                                                                alt=''
                                                                className='me-1'
                                                              />: (data.nftId?.chooseBlockchain === "Harmony Testnet")?  <img
                                                              src="/assets/images/icons/harmony.png"
                                                              alt=''
                                                              className='me-1'
                                                            />: '' } */}
                                                  <img
                                                      src={currencyImage}
                                                       alt=""
                                                      />          
                                                  {' '}
                                                  {data.bid_price
                                                    ? data.bid_price
                                                    : ''}
                                                   {currency}
                                                </span>
                                                &nbsp;&nbsp;
                                                <span
                                                  style={{ maxWidth: '175px' }}
                                                >
                                                  {/* <br/> */}
                                                  &nbsp;&nbsp; Bided
                                                  &nbsp;&nbsp;By&nbsp;&nbsp;{' '}
                                                  {data?.bidder?.user_name
                                                    ? data?.bidder?.user_name
                                                    : 'HEROSTHENAME'}
                                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                </span>
                                                {nftData?.currentOwner?._id ===
                                                userId._id ? (
                                                  <>
                                                    <button
                                                      type='button'
                                                      class='btn btn-success'
                                                      onClick={() =>
                                                        handleTokenAcceptBid(
                                                          data.bid_price,
                                                          data.bidder
                                                            .account_address,
                                                          data._id
                                                        )
                                                      }
                                                    >
                                                      Accept
                                                    </button>
                                                    <button
                                                      type='button'
                                                      class='btn btn-danger'
                                                      onClick={() =>
                                                        withdrawTokenBid(
                                                          data._id
                                                        )
                                                      }
                                                    >
                                                      Reject
                                                    </button>
                                                  </>
                                                ) : null}
                                                {data?.bidder?._id ===
                                                userId._id ? (
                                                  <button
                                                    type='button'
                                                    id='Cancelled'
                                                    class='btn btn-danger'
                                                    onClick={() =>
                                                      withdrawTokenBid(data._id)
                                                    }
                                                  >
                                                    Cancel
                                                  </button>
                                                ) : null}
                                              </div>
                                            </p>
                                            <span className='text2'>
                                              {/* 3 hours ago */}
                                              {data.bidder.timeSinceCreated}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          {/* :''} */}

                          <div
                            className='tab-pane fade'
                            id='attribute'
                            role='tabpanel'
                            aria-labelledby='attribute-tab'
                          >
                            <div className='explore-attribute-card-section'>
                              <div className='row'>
                                {nftData?.attribute?.map((attri, i) => (
                                  <div className='col-lg-4' key={i}>
                                    <div className='card'>
                                      <div className='card-body'>
                                        <h3 className='card-title'>
                                          Attribute{' '}
                                        </h3>
                                        <h4 className='card-text'>
                                          Attribute Name:{attri.attrName}
                                        </h4>
                                        <p className='card-subtext'>
                                          Attribute Type:{attri.attrType}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mb-3'>
                        <div className='col-lg-6 col-md-6 px-lg-0'>
                          <div className='pricing-area'>
                            <h3 className='pricing-title'>Pricing</h3>
                            <div className='pricing-card'>
                              <div className='card-body'>
                                <div className='d-flex align-items-center'>
                                  <div className='media'>
                                    {/* <a href="#"><img src="/assets/images/avatar3.png" alt="" /></a> */}
                                  </div>
                                  <div className='pricing-detail'>
                                    {/* <h4> {t("product.Highest Bid By")} Kohaku Tora</h4> */}
                                    <div className="d-flex align-items-center">
                                     {!nftData?.putOnMarketplace?.wait?( <span className="d-flex align-items-center">
                                        <a href="#" className="value1">
                                          <img
                                            src={currencyImage}
                                            alt=""
                                          />
                                          {nftData?.putOnMarketplace
                                            ? nftData?.putOnMarketplace
                                              ?.price ||
                                            nftData?.putOnMarketplace
                                              ?.Bid_price
                                            : ''}{' '}
                                          {currency}
                                        </a>
                                        <h6
                                          className="m-1 sc-fe5f9c83-0 mGAUR Price--fiat-amount Price--fiat-amount-secondary "
                                          style={{ fontSize: '12px' }}
                                          tabindex="-1"
                                        >
                                          ${priceInUSD}
                                        </h6>

                                          {/* <sup> <a href="#" className="value2 ml-1">$</a></sup> */}
                                        </span>
                                      ) : (
                                        'wait for listing'
                                      )}
                                      {/* <h6 className="text-muted ml-auto mb-0 small"> ${priceInUSD} </h6> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        {/* //purchased */}
                        {nftData?.currentOwner?._id === userId._id &&
                        nftData?.listing === 'delisting' ? (
                          <>
                            <div className='col-lg-4 mb-4 mb-lg-0'>
                              <button
                                className='btn btn-outline-white1 w-100'
                                onClick={listingToggleModal}
                              >
                                <i className='bx bxs-purchase-tag me-2' />
                                listing
                              </button>
                            </div>
                          </>
                        ) : null}

                        {/* buyer */}

                        {nftData?.listing === 'listing' &&
                        nftData.putOnMarketplace.Bid_price &&
                        nftData.currentOwner._id !== userId._id ? (
                          <>
                            <div className='col-lg-4 mb-4 mb-lg-0'>
                              <button
                                className='btn btn-outline-white1 w-100'
                                data-bs-toggle='modal'
                                data-bs-target='#makeOfferModal'
                              >
                                <i className='bx bxs-purchase-tag me-2' /> Make
                                An Offer
                              </button>
                            </div>
                          </>
                        ) : null}
                        {nftData?.listing === 'listing' &&
                        nftData.putOnMarketplace.price &&
                        nftData.currentOwner._id !== userId._id ? (
                          <>
                            <div className='col-lg-4 mb-4 mb-lg-0'>
                              <button
                                className='btn btn-violet btn-shadow w-100'
                                onClick={() => toggleModal()}
                              >
                                <i className='bx bxs-basket me-2' />
                                {t('product.Buy now')}
                              </button>
                            </div>
                            <div className='col-lg-4 mb-4 mb-lg-0'>
                              <button
                                className='btn btn-outline-white1 w-100'
                                onClick={convertToggleModal}
                              >
                                <i className='bx bx-credit-card me-2' />{' '}
                                {t('Convert')}
                              </button>
                            </div>
                          </>
                        ) : null}

                        {/* seller */}
                        {nftData?.currentOwner?._id === userId._id &&
                        nftData.putOnMarketplace.price &&
                        nftData.listing === 'listing' ? (
                          <>
                            <div className='col-lg-4 mb-4 mb-lg-0'>
                              <button
                                className='btn btn-outline-white1 w-100'
                                onClick={handleTokenDelisting}
                              >
                                <i className='bx bxs-purchase-tag me-2' />
                                Delisting
                              </button>
                            </div>
                          </>
                        ) : null}
                        {nftData?.currentOwner?._id === userId._id &&
                        nftData.putOnMarketplace.Bid_price &&
                        nftData.listing === 'listing' ? (
                          <>
                            <div className='col-lg-4 mb-4 mb-lg-0'>
                              <button
                                className='btn btn-outline-white1 w-100'
                                onClick={removeFromAuction}
                              >
                                <i className='bx bx-credit-card me-2' /> Remove
                                From Auction
                              </button>
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div
                        className='modal fade'
                        id='makeOfferModal'
                        tabIndex={-1}
                        role='dialog'
                        aria-labelledby='exampleModalLabel'
                        aria-hidden='true'
                      >
                        <div className='modal-dialog modal-dialog-centered modal-lg make-offer-modal-section'>
                          <div className='modal-content'>
                            <div className='modal-header text-center d-block'>
                              <h5 className='modal-title d-inline-block'>
                                {t('product.Make an offer')}
                              </h5>
                              <button
                                type='button'
                                className='close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              >
                                <span aria-hidden='true'>×</span>
                              </button>
                            </div>
                            <div className='modal-body'>
                              <div className='offer-price'>
                                <label htmlFor className='form-label'>
                                  {t('product.Price')}
                                </label>
                                <div className='input-group mb-3'>
                                  <div className='input-group-prepend'>
                                    <span className='input-group-text'>
                                      {/* <img
                                        src='/assets/images/icons/ethereum-pink.png'
                                        alt=''
                                        className='me-1 eth-icon'
                                      /> */}
                                      <img
                                                src={currencyImage}
                                                alt=""
                                                className="me-1"
                                              />
                                      {' '}
                                      {currency}
                                    </span>
                                  </div>
                                  <input
                                    type='number'
                                    className='form-control'
                                    placeholder={t('product.amount')}
                                    value={bidAmount}
                                    onChange={(e) =>
                                      setBidAmount(e.target.value)
                                    }
                                  />
                                  <div className='input-group-append'>
                                    <span className='input-group-text'>
                                      $0.00
                                    </span>
                                  </div>
                                </div>
                                <div className='mt-2 text-end'>
                                  <h6 className='balance-value'>
                                    {t('product.Balance')} :{' '}
                                    <span>0.000 WETH</span>
                                  </h6>
                                </div>
                              </div>
                              {/* <div className="offer-expiration">
                              <label htmlFor className="form-label">{t("product.Offer Expiration")}</label>
                              <div className="row mb-3">
                                <div className="col-md-3 col-5">
                                  <select className="form-select" aria-label="Default select example" >
                                    <option selected>1 day</option>
                                    <option value={1}>2 days</option>
                                    <option value={1}>3 days</option>
                                  </select>
                                </div>
                                <div className="col-md-9 ps-lg-0">
                                  <input type="text" className="form-control" defaultValue="11:47" />
                                </div>
                              </div>
                              <div className="custom-checkbox">
                                <div className="form-check">
                                  <input className="form-check-input" type="checkbox" id="offer-checkbox" />
                                  <label className="form-check-label" htmlFor="offer-checkbox">{t("product.By Checking This Box, I Agree To NFTHEE Terms Of Service")}</label>
                                </div>
                              </div>
                            </div> */}
                            </div>
                            <div className='modal-footer border-0'>
                              {hasBidder ? (
                                <button
                                  type='button'
                                  className='btn btn-violet shadow-none'
                                  data-bs-dismiss='modal'
                                  aria-label='Close'
                                  id='update'
                                  onClick={handleBidAmount}
                                >
                                  {t('Update Offer')}
                                </button>
                              ) : (
                                <button
                                  type='button'
                                  className='btn btn-violet shadow-none'
                                  data-bs-dismiss='modal'
                                  aria-label='Close'
                                  onClick={handleBidAmount}
                                >
                                  {t('product.Make Offer')}
                                </button>
                              )}

                              {/* //  <button */}
                              {/* //     type='button' */}
                              {/* //     className='btn btn-violet shadow-none' */}
                              {/* //     data-bs-dismiss='modal' */}
                              {/* //     aria-label='Close' */}
                              {/* //     onClick={handleBidAmount} */}
                              {/* //   > */}
                              {/* //     {t('product.Make Offer')} */}
                              {/* //   </button> */}
                              <button
                                type='button'
                                className='btn btn-violet-outline ms-3'
                                data-bs-toggle='modal'
                                data-bs-target='#convertEth'
                              >
                                {t('product.Convert ETH')}
                              </button>
                            </div>

                            {/* //convert modal */}
                            <div
                              className='modal fade'
                              id='convertEth'
                              tabIndex={-1}
                              role='modal-dialog'
                              aria-labelledby='convertEth'
                              aria-hidden='true'
                            >
                              <div className='modal-dialog modal-dialog-centered modal-lg make-offer-modal-section'>
                                <div className='modal-content'>
                                  <div className='modal-header text-center d-block'>
                                    <h5 className='modal-title d-inline-block'>
                                      {t('Convert ETH  ')}
                                    </h5>
                                    <button
                                      type='button'
                                      className='close'
                                      data-bs-toggle='modal'
                                      data-bs-dismiss='modal'
                                    >
                                      <span aria-hidden='true'>×</span>
                                    </button>
                                  </div>
                                  <div className='modal-body'>
                                    <div className='offer-price'>
                                      <div
                                        className='tab-content custom-scrollbar'
                                        id='myTabContent'
                                      >
                                        <ul
                                          className='nav nav-tabs'
                                          id='myTab'
                                          role='tablist'
                                        >
                                          <li
                                            className='nav-item'
                                            role='presentation'
                                          >
                                            <button
                                              className='nav-link active'
                                              id='ETHtoWETH-tab'
                                              data-bs-toggle='tab'
                                              data-bs-target='#ETHtoWETH'
                                              type='button'
                                              role='tab'
                                              aria-controls='ETHtoWETH'
                                              aria-selected='true'
                                              value={1}
                                              onClick={(e) =>
                                                setActiveTab(e.target.value)
                                              }
                                            >
                                              {t(' ETH to WETH')}
                                            </button>
                                          </li>
                                          <li
                                            className='nav-item'
                                            role='presentation'
                                          >
                                            <button
                                              className='nav-link'
                                              id='WETHtoETH-tab'
                                              data-bs-toggle='tab'
                                              data-bs-target='#WETHtoETH'
                                              type='button'
                                              role='tab'
                                              aria-controls='WETHtoETH'
                                              aria-selected='false'
                                              value={2}
                                              onClick={(e) =>
                                                setActiveTab(e.target.value)
                                              }
                                            >
                                              {t('WETH to ETH')}
                                            </button>
                                          </li>
                                        </ul>
                                        <div
                                          className='tab-pane fade show active'
                                          id='ETHtoWETH'
                                          role='tabpanel'
                                          aria-labelledby='ETHtoWETH-tab'
                                        >
                                          <div className='input-group mb-3'>
                                            <div className='input-group-prepend'>
                                              <span className='input-group-text'>
                                                {/* <img
                                                  src='/assets/images/icons/ethereum-pink.png'
                                                  alt=''
                                                  className='me-1 eth-icon'
                                                /> */}
                                                <img
                                                src={currencyImage}
                                                alt=""
                                                className="me-1"
                                              />
                                                {' '}
                                                Eth{currency}
                                              </span>
                                            </div>
                                            <input
                                              type='number'
                                              className='form-control'
                                              placeholder={t('Enter Amount')}
                                              value={eth}
                                              onChange={(e) =>
                                                setEth(e.target.value)
                                              }
                                            />
                                            <div className='input-group-append'>
                                              <span className='input-group-text'>
                                                $0.00
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className='tab-pane fade'
                                          id='WETHtoETH'
                                          role='tabpanel'
                                          aria-labelledby='WETHtoETH-tab'
                                        >
                                          <div className='input-group mb-3'>
                                            <div className='input-group-prepend'>
                                              <span className='input-group-text'>
                                                {/* <img
                                                  src='/assets/images/icons/ethereum-pink.png'
                                                  alt=''
                                                  className='me-1 eth-icon'
                                                /> */}
                                                <img
                                                src={currencyImage}
                                                alt=""
                                                className="me-1"
                                              />
                                                {' '}
                                                WETH{currency}
                                              </span>
                                            </div>
                                            <input
                                              type='number'
                                              className='form-control'
                                              placeholder={t('Enter Amount')}
                                              value={wth}
                                              onChange={(e) =>
                                                setWth(e.target.value)
                                              }
                                            />
                                            <div className='input-group-append'>
                                              <span className='input-group-text'>
                                                $0.00
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className='mt-2 text-end'>
                                        <h6 className='balance-value'>
                                          {t('product.Balance')} :{' '}
                                          <span>0.000 WETH</span>
                                        </h6>
                                      </div>
                                      <div className='modal-footer border-0'>
                                        {activeTab === '1' ? (
                                          <button
                                            type='button'
                                            className='btn btn-violet shadow-none'
                                            data-bs-toggle='modal'
                                            data-bs-dismiss='modal'
                                            onClick={handleEth}
                                          >
                                            {t('Wrap')}
                                          </button>
                                        ) : (
                                          <button
                                            type='button'
                                            className='btn btn-violet shadow-none'
                                            data-bs-toggle='modal'
                                            data-bs-dismiss='modal'
                                            onClick={handleWth}
                                          >
                                            {t('Unwrap')}
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="modal-footer border-0">
                            <button type="button" className="btn btn-violet shadow-none"  data-bs-dismiss="modal" aria-label="Close" onClick={handleBidAmount}>{t("product.Make Offer")}</button>
                            <button type="button" className="btn btn-violet-outline ms-3">{t("product.Convert ETH")}</button>
                          </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-lg-5 mb-0'>
                <div className='col-lg-6 col-md-6 mb-4 mb-lg-0'>
                  <div className='explore-detail-accordion'>
                    <div className='accordion accordion1'>
                      <div className='accordion-item'>
                        <h2 className='accordion-header'>
                          <button
                            className='accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseOne'
                            aria-expanded='true'
                          >
                            {t('product.Listing')}
                          </button>
                        </h2>
                        <div
                          id='collapseOne'
                          className='accordion-collapse collapse show'
                        >
                          <div className='accordion-body'>
                            <div className='table-responsive'>
                              <table className='table table1'>
                                <thead>
                                  <tr>
                                    <th scope='col'>{t('product.Price')}</th>
                                    <th scope='col'>
                                      {t('product.USD Price')}
                                    </th>
                                    <th scope='col'>
                                      {/* {t('product.ate ')} */}
                                      Date / Time
                                    </th>
                                    <th scope='col'>{t('product.from')}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      {itemList.map(
                                        (event) =>
                                          event.action === 'Creation' && (
                                            <p key={event}>
                                              {/* <i className="bx bxs-purchase-tag me-1" /> */}
                                              <img
                                                src={currencyImage}
                                                alt=""
                                                className="me-1"
                                              />
                                              {event.price}{currency}
                                            </p>
                                          )
                                      )}
                                    </td>
                                    {/* <td>$959.13</td> */}
                                    <td>
                                      {itemList.map(
                                        (event) =>
                                          event.action === 'Creation' && (
                                            <p key={event}>
                                              {/* <i className="bx bxs-purchase-tag me-1" /> */}

                                              <h6
                                                style={{
                                                  fontSize: '12px',
                                                  marginRight: '5px',
                                                }}
                                              >
                                                {' '}
                                                ${priceInUSD}{' '}
                                              </h6>
                                            </p>
                                          )
                                      )}
                                    </td>
                                    {/* <td>In 5 days</td> */}
                                    <td>
                                      {itemList.map(
                                        (event) =>
                                          event.action === 'Creation' && (
                                            <p key={event}>
                                              {/* <i className="bx bxs-purchase-tag me-1" /> */}
                                              {event.timeSinceCreated}
                                            </p>
                                          )
                                      )}
                                    </td>
                                    <td>
                                      {/* <a href="#">Shreepadgaonkar</a> */}
                                      {itemList.map(
                                        (event) =>
                                          event.action === 'Creation' && (
                                            <p key={event}>
                                              {/* <i className="bx bxs-purchase-tag me-1" /> */}
                                              {event.from}
                                            </p>
                                          )
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 col-md-6 mb-4 mb-lg-0'>
                  <div className='explore-detail-accordion'>
                    <div className='accordion accordion2'>
                      <div className='accordion-item'>
                        <h2 className='accordion-header'>
                          <button
                            className='accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseTwo'
                            aria-expanded='true'
                          >
                            {t('product.Offering')}
                          </button>
                        </h2>
                        <div
                          id='collapseTwo'
                          className='accordion-collapse collapse show'
                        >
                          <div className='accordion-body'>
                            <div className='table-responsive'>
                              <table className='table table2'>
                                <thead>
                                  <tr>
                                    <th scope='col'>{t('product.Price')}</th>
                                    <th scope='col'>
                                      {t('product.USD Price')}
                                    </th>
                                    {/* <th scope="col">
                                      {t('product.Floor Difference')}
                                    </th> */}
                                    <th scope='col'>
                                      {/* {t('product.Expiration')} */}
                                      Date / Time
                                    </th>
                                    <th scope='col'>{t('product.from')}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* <tr>
                                    <td>
                                      <img
                                        src="/assets/images/icons/ethereum.png"
                                        alt=""
                                        className="me-1"
                                      />{' '}
                                      0.3 WETH
                                    </td>
                                    <td>$959.13</td>
                                    <td>48.3% Below</td>
                                    <td>In 5 days</td>
                                    <td>
                                      <a href="#">John Deo</a>
                                    </td>
                                  </tr> */}
                                  <tr>
                                    <td>
                                      {itemOffer.map(
                                        (event) =>
                                          event.action === 'Bids' && (
                                            <p key={event}>
                                              {/* <i className="bx bxs-purchase-tag me-1" /> */}
                                              <img
                                                src='/assets/images/icons/ethereum.png'
                                                alt=''
                                                className='me-1'
                                              />
                                              {event.price}WETH
                                            </p>
                                          )
                                      )}
                                    </td>
                                    {/* <td>$959.13</td> */}
                                    <td>
                                      {itemOffer.map(
                                        (event) =>
                                          event.action === 'Bids' && (
                                            <p key={event}>
                                              {/* <i className="bx bxs-purchase-tag me-1" /> */}

                                              <h6
                                                style={{
                                                  fontSize: '12px',
                                                  marginRight: '5px',
                                                }}
                                              >
                                                $
                                                {(
                                                  parseFloat(priceCov) *
                                                  parseFloat(event.price)
                                                ).toFixed(5)}
                                              </h6>
                                            </p>
                                          )
                                      )}
                                    </td>
                                    {/* <td>In 5 days</td> */}
                                    <td>
                                      {itemOffer.map(
                                        (event) =>
                                          event.action === 'Bids' && (
                                            <p key={event}>
                                              {/* <i className="bx bxs-purchase-tag me-1" /> */}
                                              {event.timeSinceCreated}
                                            </p>
                                          )
                                      )}
                                    </td>
                                    <td>
                                      {/* <a href="#">Shreepadgaonkar</a> */}
                                      {itemOffer.map(
                                        (event) =>
                                          event.action === 'Bids' && (
                                            <p key={event}>
                                              {/* <i className="bx bxs-purchase-tag me-1" /> */}
                                              {event.from}
                                            </p>
                                          )
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-6 col-md-6 mb-4 mb-lg-0'>
                  <div className='explore-detail-accordion'>
                    <div className='accordion accordion3'>
                      <div className='accordion-item'>
                        <h2 className='accordion-header'>
                          <button
                            className='accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseThree'
                            aria-expanded='true'
                          >
                            {/* {t("product.Listing")} */}
                            Pricing History
                          </button>
                        </h2>
                        <div
                          id='collapseThree'
                          className='accordion-collapse collapse show'
                        >
                          <div className='accordion-body'>
                            <div className='table-responsive'>
                              <table className='table table3'>
                                <thead>
                                  <tr>
                                    <th scope='col'>
                                      {t('product.Lowest Listing')}
                                    </th>
                                    <th scope='col'>
                                      {t('product.Suggested Price')}
                                    </th>
                                    <th scope='col'>
                                      {t('product.Highest Sale')}
                                    </th>
                                    <th scope='col'>
                                      {t('product.Total Sales')}
                                    </th>
                                    <th scope='col'>
                                      <select
                                        className='form-select'
                                        style={{ width: '108px' }}
                                      >
                                        <option selected>All Time</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                      </select>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>0 WAX ($0.00)</td>
                                    <td>0.14 WAX ($0.05)</td>
                                    <td>
                                      <div>27000.11 WAX</div>
                                      <div>($10,252,52)</div>
                                    </td>
                                    <td>16858488</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div>
                              {/* <div id="chart" /> */}
                              {(avgPrice && xaxis != undefined) ||
                              null ||
                              '' ||
                              null ? (
                                <Apexcharts
                                  xaxiss={xaxis}
                                  avgPrice={avgPrice}
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 col-md-6 mb-4 mb-lg-0'>
                  <div className='explore-detail-accordion'>
                    <div className='accordion accordion4'>
                      <div className='accordion-item'>
                        <h2 className='accordion-header'>
                          <button
                            className='accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseFour'
                            aria-expanded='true'
                          >
                            {t('product.Item Activity')}
                          </button>
                        </h2>
                        <div
                          id='collapseFour'
                          className='accordion-collapse collapse show'
                        >
                          <div className='accordion-body custom-scrollbar'>
                            <div className='col-lg-12 col-md-12 category-filter-search-bar'>
                              <div className='row align-items-center'>
                                <div className='col-lg-2 col-md-2'>
                                  <h3 className='filter-label'>
                                    {t('product.Filter By')}
                                  </h3>
                                </div>
                                <div className='col-lg-10 col-md-10'>
                                  <div className='d-flex align-items-center'>
                                    {/* <select className="form-select" aria-label="Default select example">
                                    <option selected>Choose Category</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                  </select> */}
                                    {/* <pre>{JSON.stringify(selected)}</pre> */}
                                    <div className='w-75'>
                                      {/* <MultiSelect
                                        options={options}
                                        value={selected}
                                        // value={selected.length ? selected[0].action : ''}
                                        onChange={setSelected}
                                        // onChange={(e)=>setSelected(e.target.value)}
                                        labelledBy='Select'
                                        
                                         isSearchable
                                      //  className="form-select"
                                      /> */}

                                      <span className='fa fa-search search-icon'></span>
                                      <select
                                        id='search'
                                        className='form-control'
                                        onChange={handleSearch}
                                        style={{ width: '100%' }}
                                      >
                                        <option value=''>
                                          Select an option
                                        </option>
                                        {/* <option value="Option 1">Option 1</option> */}
                                        <option value='Creation'>
                                          Creation
                                        </option>
                                        <option value="Bids">Bids</option>
                                        <option value="Sale">Sale</option>
                                        <option value="Offer">Offer</option>
                                        <option value="Transfer">Transfer</option>
                                        <option value="Purchase">Purchase</option>
                                      </select>
                                      {/* </label> */}
                                    </div>
                                    <button
                                      disabled
                                      className='btn btn-search m-0'
                                    >
                                      Search
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className='table-responsive'
                              style={{ overflowY: 'hidden' }}
                            >
                              <table className='table table4'>
                                <thead>
                                  <tr>
                                    <th scope='col'>Event</th>
                                    <th scope='col'>{t('product.Price')}</th>
                                    <th scope='col'>{t('product.from')}</th>
                                    <th scope='col'>To</th>
                                    <th scope='col'>Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* {itemEvent.map((event) => ( */}
                                  {itemEvent
                                    .filter((item) =>
                                      item.action.includes(search)
                                    )
                                    .map((event) => (
                                      <tr key={event}>
                                        <td>{event.action}</td>

                                        {event.bid_price}
                                        <td>
                                          <img
                                            src={currencyImage}
                                            alt=""
                                            className="me-1"
                                          />
                                          {event.price}
                                        </td>
                                        <td>
                                          <a href='#'>{event.from}</a>
                                        </td>
                                        <td>
                                          <a href='#'>{event.to}</a>
                                        </td>
                                        <td>
                                          <a
                                            href='#'
                                            className='tooltip-wrapper'
                                          >
                                            <img
                                              src='/assets/images/icons/share-blue-icon.png'
                                              alt=''
                                              className='me-1'
                                            />{' '}
                                            {event.timeSinceCreated}
                                          </a>
                                        </td>
                                      </tr>
                                    ))}
                                  {/* </tr>
                                  <tr>
                                    <td>
                                      <span className='d-flex align-items-center'>
                                        <i className='bx bxs-purchase-tag me-1' />{' '}
                                        list
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src='/assets/images/icons/ethereum.png'
                                        alt=''
                                        className='me-1'
                                      />
                                      $959.13
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#' className='tooltip-wrapper'>
                                        <img
                                          src='/assets/images/icons/share-blue-icon.png'
                                          alt=''
                                          className='me-1'
                                        />{' '}
                                        2 Days Ago
                                        <span className='tooltip'>
                                          March 22 2021, 5:10 Pm
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <span className='d-flex align-items-center'>
                                        <i className='bx bxs-purchase-tag me-1' />{' '}
                                        list
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src='/assets/images/icons/ethereum.png'
                                        alt=''
                                        className='me-1'
                                      />
                                      $959.13
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#' className='tooltip-wrapper'>
                                        <img
                                          src='/assets/images/icons/share-blue-icon.png'
                                          alt=''
                                          className='me-1'
                                        />{' '}
                                        2 Days Ago
                                        <span className='tooltip'>
                                          March 22 2021, 5:10 Pm
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <span className='d-flex align-items-center'>
                                        <i className='bx bxs-purchase-tag me-1' />{' '}
                                        list
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src='/assets/images/icons/ethereum.png'
                                        alt=''
                                        className='me-1'
                                      />
                                      $959.13
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#' className='tooltip-wrapper'>
                                        <img
                                          src='/assets/images/icons/share-blue-icon.png'
                                          alt=''
                                          className='me-1'
                                        />{' '}
                                        2 Days Ago
                                        <span className='tooltip'>
                                          March 22 2021, 5:10 Pm
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <span className='d-flex align-items-center'>
                                        <i className='bx bxs-purchase-tag me-1' />{' '}
                                        list
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src='/assets/images/icons/ethereum.png'
                                        alt=''
                                        className='me-1'
                                      />
                                      $959.13
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#' className='tooltip-wrapper'>
                                        <img
                                          src='/assets/images/icons/share-blue-icon.png'
                                          alt=''
                                          className='me-1'
                                        />{' '}
                                        2 Days Ago
                                        <span className='tooltip'>
                                          March 22 2021, 5:10 Pm
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <span className='d-flex align-items-center'>
                                        <i className='bx bxs-purchase-tag me-1' />{' '}
                                        list
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src='/assets/images/icons/ethereum.png'
                                        alt=''
                                        className='me-1'
                                      />
                                      $959.13
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#' className='tooltip-wrapper'>
                                        <img
                                          src='/assets/images/icons/share-blue-icon.png'
                                          alt=''
                                          className='me-1'
                                        />{' '}
                                        2 Days Ago
                                        <span className='tooltip'>
                                          March 22 2021, 5:10 Pm
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <span className='d-flex align-items-center'>
                                        <i className='bx bxs-purchase-tag me-1' />{' '}
                                        list
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src='/assets/images/icons/ethereum.png'
                                        alt=''
                                        className='me-1'
                                      />
                                      $959.13
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#' className='tooltip-wrapper'>
                                        <img
                                          src='/assets/images/icons/share-blue-icon.png'
                                          alt=''
                                          className='me-1'
                                        />{' '}
                                        2 Days Ago
                                        <span className='tooltip'>
                                          March 22 2021, 5:10 Pm
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <span className='d-flex align-items-center'>
                                        <i className='bx bxs-purchase-tag me-1' />{' '}
                                        list
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src='/assets/images/icons/ethereum.png'
                                        alt=''
                                        className='me-1'
                                      />
                                      $959.13
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#' className='tooltip-wrapper'>
                                        <img
                                          src='/assets/images/icons/share-blue-icon.png'
                                          alt=''
                                          className='me-1'
                                        />{' '}
                                        2 Days Ago
                                        <span className='tooltip'>
                                          March 22 2021, 5:10 Pm
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <span className='d-flex align-items-center'>
                                        <i className='bx bxs-purchase-tag me-1' />{' '}
                                        list
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src='/assets/images/icons/ethereum.png'
                                        alt=''
                                        className='me-1'
                                      />
                                      $959.13
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#' className='tooltip-wrapper'>
                                        <img
                                          src='/assets/images/icons/share-blue-icon.png'
                                          alt=''
                                          className='me-1'
                                        />{' '}
                                        2 Days Ago
                                        <span className='tooltip'>
                                          March 22 2021, 5:10 Pm
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <span className='d-flex align-items-center'>
                                        <i className='bx bxs-purchase-tag me-1' />{' '}
                                        list
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src='/assets/images/icons/ethereum.png'
                                        alt=''
                                        className='me-1'
                                      />
                                      $959.13
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#' className='tooltip-wrapper'>
                                        <img
                                          src='/assets/images/icons/share-blue-icon.png'
                                          alt=''
                                          className='me-1'
                                        />{' '}
                                        2 Days Ago
                                        <span className='tooltip'>
                                          March 22 2021, 5:10 Pm
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <span className='d-flex align-items-center'>
                                        <i className='bx bxs-purchase-tag me-1' />{' '}
                                        list
                                      </span>
                                    </td>
                                    <td>
                                      <img
                                        src='/assets/images/icons/ethereum.png'
                                        alt=''
                                        className='me-1'
                                      />
                                      $959.13
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#'>John Doe</a>
                                    </td>
                                    <td>
                                      <a href='#' className='tooltip-wrapper'>
                                        <img
                                          src='/assets/images/icons/share-blue-icon.png'
                                          alt=''
                                          className='me-1'
                                        />{' '}
                                        2 Days Ago
                                        <span className='tooltip'>
                                          March 22 2021, 5:10 Pm
                                        </span>
                                      </a>
                                    </td>
                                  </tr> */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='explore-collection-card-area py-lg-5 py-4'>
            <div className='container'>
              <div className='section-heading text-center mb-4'>
                <div>
                  <h2 className='section-title mb-1'>
                    {t('product.More from this collection')}
                  </h2>
                  <span>
                    <img
                      src='/assets/images/path1.png'
                      alt=''
                      className='img-fluid'
                    />
                  </span>
                </div>
              </div>
              <div className='col-lg-11 col-md-11 mx-auto p-0'>
                <div className='explore-collection-slider1'>
                  {/* <div className="single-slide">
                  <div className="live-auction-area">
                    <div className="auction-card-two">
                      <div className="card-body">
                        <div className="auction-create-by"><a href="#"><img src="assets/images/img2.png" alt="" className="avatar-icon img-fluid" /></a>
                          <span href="#" className="creator-name">Created by @Lorihart</span>
                        </div>
                        <div className="card-media">
                          <a href="#"><img src="assets/images/featured-img7.jpg" alt="" className="img-fluid" /></a>
                        </div>
                        <div className="card-title mb-2 pb-2 border-bottom">
                          <h5><a href="#">Walking On The Air</a></h5>
                        </div>
                        <div className="bid-title">
                          <span>Current Bid</span>
                        </div>
                        <div className="meta-info">
                          <div className="eth-price">
                            <h6><img src="assets/images/icons/ethereum.png" alt="" /> 2.59</h6>
                          </div>
                          <button className="wishlist-button" tabIndex={0}>
                            <span className="number-like d-flex">
                              <i className="ri-heart-line me-1" /> 75
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div> */}
                  {/* <!-- Button trigger modal --> */}
                  {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reportModal">
  Launch demo modal
</button> */}
                  {/* 
<!-- Modal --> */}
                  <div
                    class='modal fade'
                    id='reportModal'
                    tabindex='-1'
                    aria-labelledby='reportModalLabel'
                    aria-hidden='true'
                  >
                    <div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
                      <div class='modal-content'>
                        <div class='modal-header'>
                          <h5 class='modal-title' id='reportModalLabel'>
                            Report
                          </h5>
                          <button
                            type='button'
                            class='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                          ></button>
                        </div>
                        <div class='modal-body'>
                          <form onSubmit={submitReport}>
                            <div class='mb-3'>
                              <select
                                class='form-select'
                                name='action'
                                onChange={handleReportData}
                                aria-label='Default select example'
                              >
                                <option disabled selected>
                                  Select
                                </option>
                                <option value='Fake Collection'>
                                  Fake Collection Or possible scam
                                </option>
                                <option value='Explict'>
                                  Explict and sensitive content
                                </option>
                                <option value='Spam'>Spam</option>
                                <option value='Other'>Other</option>
                              </select>
                            </div>
                            {report?.action === 'Other' ? (
                              <div class='mb-3'>
                                <label
                                  for='message-text'
                                  class='col-form-label'
                                >
                                  Issue:
                                </label>
                                <textarea
                                  name='report_issue'
                                  onChange={handleReportData}
                                  class='form-control'
                                  id='message-text'
                                ></textarea>
                              </div>
                            ) : null}
                          </form>
                        </div>
                        <div class='modal-footer'>
                          <button
                            type='submit'
                            onClick={submitReport}
                            class='btn btn-primary'
                          >
                            Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {shownList
                    .filter((item) => item._id != id)
                    .map((item, index) => {
                      return (
                        <SingleSlider
                          key={index}
                          {...item}
                          setliked={setliked}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default ExploreDetail;
