import React, { useEffect, useState } from 'react'
import { Link,useHistory} from 'react-router-dom'
import $ from "jquery"; 
import instance from '../../axios';

function MyCollections() {
  const [collectionData, setCollectionData] = useState([])
  const { _id,profile_image,user_name } = JSON.parse(localStorage.getItem('userLoggedIn')) || ''
  const [image, setImage] = useState({ preview: profile_image || "/assets/images/avt-5.jpg", raw: "" });
  
//   const collection = [
//     { title: 'Metroverse', title2:'By Metroverse',text:'Metroverse Is A Land Trading NFT Strategy Game On Ethereum. Collect, Trade, And Stake Your City Blocks To Earn The $MET Utility Token' },
//     { title: 'Metroverse', title2:'By Metroverse',text:'Metroverse Is A Land Trading NFT Strategy Game On Ethereum. Collect, Trade, And Stake Your City Blocks To Earn The $MET Utility Token' },
//     { title: 'Metroverse', title2:'By Metroverse',text:'Metroverse Is A Land Trading NFT Strategy Game On Ethereum. Collect, Trade, And Stake Your City Blocks To Earn The $MET Utility Token' },
//     { title: 'Metroverse', title2:'By Metroverse',text:'Metroverse Is A Land Trading NFT Strategy Game On Ethereum. Collect, Trade, And Stake Your City Blocks To Earn The $MET Utility Token' },
//     { title: 'Metroverse', title2:'By Metroverse',text:'Metroverse Is A Land Trading NFT Strategy Game On Ethereum. Collect, Trade, And Stake Your City Blocks To Earn The $MET Utility Token' },
//     { title: 'Metroverse', title2:'By Metroverse',text:'Metroverse Is A Land Trading NFT Strategy Game On Ethereum. Collect, Trade, And Stake Your City Blocks To Earn The $MET Utility Token' },
//     { title: 'Metroverse', title2:'By Metroverse',text:'Metroverse Is A Land Trading NFT Strategy Game On Ethereum. Collect, Trade, And Stake Your City Blocks To Earn The $MET Utility Token' },
//     { title: 'Metroverse', title2:'By Metroverse',text:'Metroverse Is A Land Trading NFT Strategy Game On Ethereum. Collect, Trade, And Stake Your City Blocks To Earn The $MET Utility Token' },
//     { title: 'Metroverse', title2:'By Metroverse',text:'Metroverse Is A Land Trading NFT Strategy Game On Ethereum. Collect, Trade, And Stake Your City Blocks To Earn The $MET Utility Token' },
//  ]
//  const Tab =()=>{ 
//  $(window).load(function(){
//   $('#tab a[href="#create-collection]').tab('show');
// }); 
// }

useEffect(() => {

  instance
    .get(`/api/userCollections?id=${_id}`)
    .then(res => (setCollectionData(res.data.data)))

}, [])
  return (
    <>
 <section className="bg-section">
        <div className="container">
          <div className="section-heading text-center mb-3">
            <h2 className="section-title mb-1">My Collections</h2>
            <span><img src="assets/images/path1.png" alt="" className="img-fluid" /></span>
          </div>
          <div className="collection-header-section text-center mb-lg-5 mb-4">
            <div>
              <h6>Create , Curate And Manage Collections Of Unique NFT's To Share And Sell</h6>
              <div className="d-flex align-items-center justify-content-center mt-3">
              <Link to="/createnewitem#create-collection" >  <button className="btn btn-violet">Create a Collection</button></Link>  
                {/* <div className="user-more-detail ms-3">
                  <div className="more">
                    <div className="icon dropdown">
                      <a href="#" data-bs-toggle="dropdown" aria-expanded="false"><i className="ri-more-fill" /></a>
                      <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <Link  className="dropdown-item" to="/getlisted"><span className="dropdown-icon"><img src="assets/images/icons/import.png" /></span>  Import an exsiting smart contract</Link>
                        <a className="dropdown-item" target="_blank" href="https://studio.manifold.xyz/"> <span className="dropdown-icon"><img src="assets/images/icons/manifold-studio.png" /></span> Mint with Manifold Studio </a>
                        <a className="dropdown-item" href="#"> <span className="dropdown-icon"><img src="assets/images/icons/nfthee-logo.png" /></span> Mint on NFThee</a>
                        <a className="dropdown-item" href="#"> <span className="dropdown-icon"><img src="assets/images/icons/mintbase.png" /></span> Mint on Mintbase</a>
                        <a className="dropdown-item" href="#"> <span className="dropdown-icon"><img src="assets/images/icons/zora.png" /></span> Mint on Zora </a>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="tabbable-gallery my-collection-card">
            <div className="row">
            {collectionData.map((collection, index) => {
                        return (
                          <div className="col-12 col-sm-3 " key={index}>
                            <div className="live-auction-area">
                              <div className="auction-card-two mb-4 ">
                                <div className="card-body">
                                  <div className="auction-create-by">
                                    <img
                                      src={image.preview}
                                      alt=""
                                      className="avatar-icon img-fluid"
                                    />
                                    <span className="creator-name">
                                      Created By @
                                      {user_name ? user_name : 'undefined'}
                                    </span>
                                  </div>
                                  <div className="card-media">
                                    <Link to={`/explorefilter/${collection._id}`}>

                                      <img
                                        // src={'/assets/images/featured-img7.jpg'}
                                        src={collection?.logo_image || '/assets/images/featured-img7.jpg'
                                        }
                                        alt=""
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </div>
                                  <div className="card-title mb-2 pb-2 border-bottom-0">
                                    <div className='c-card-detail'>
                                      <h5>
                                        <a href="#">{collection?.name}</a>
                                      </h5>
                                      <h6>
                                        {collection?.description ? collection?.description : 'undefined'}
                                      </h6>
                                    </div>
                                    {/* <div className="eth-price">
                        <div className="bid-title">
                          <span></span>
                        </div>
                        <h6>
                          <img
                            src="/assets/images/icons/ethereum.png"
                            alt=""
                            className="me-1"
                          />
                          {!collection?.putOnMarketplace ? (
                            // <small className="font-weight-light">Bids</small>'
                            ''
                          ) : collection?.putOnMarketplace?.price ? (
                            <span>{collection?.putOnMarketplace?.price}</span>
                          ) : (
                            <span>
                              {collection?.putOnMarketplace?.minimumBid}
                            </span>
                          )}
                        </h6>
                      </div> */}
                                  </div>
                                  <div className="meta-info">
                                 
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
              
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MyCollections;