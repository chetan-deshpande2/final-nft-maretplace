import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../axios';
import ExploreNftListRow from '../Containers/Explore/ExploreNftListRow'
function Favorites() {
  const [addFavData, setFavData] = useState([])
  const [like, setliked] = useState();
  const [loadingFilter, setLoadingFilter] = useState(true);
  const { _id } = JSON.parse(localStorage.getItem('userLoggedIn')) || ''

  useEffect(() => {
    // http://192.168.1.143:8002/api/userLikes?id=63fc56b0e0637d62e0f6d3ec
    instance
      .get(`/api/userLikes?id=${_id}`)
      .then(res => (setFavData(res.data.data)))
      .finally(() => setLoadingFilter(false))

  }, [like])

  return (
    <>
    {/* {cardData.map((item)=>{
    return(<>   </>)  })} */}
  <section className="bg-section live-auction-section">
        <div className="container">
          <div className="section-heading text-center mb-lg-5 mb-4 live-auction-heading">
            <div className="d-flex justify-content-center align-items-center">
              <div className="mx-lg-auto d-flex">
                <h2 className="section-title mb-1">Favorites</h2>
              </div>
            </div>
            <img src="assets/images/path1.png" alt="" className="img-fluid" />
          </div>
          <div className="row">
            {/* <div className="live-auction-area mb-5">
              <div className="">
              {/* {favoriteStore.map((favorite)=>{
                   return(<> */}
                {/* <div className="col-6 col-sm-3">
                    <div className="live-auction-area">
                    <Link to="/exploredetail">
                        <div className="auction-card-two mb-4 ">
                        <div className="card-body">
                            <div className="auction-create-by"><img src="assets/images/img2.png" alt="" className="avatar-icon img-fluid" />
                            <span className="creator-name">Created by @{ "undefined"}</span>
                            </div>
                            <div className="card-media">
                              <img className="img-fluid" src={'sfd'} alt="th" />
                            </div>
                            <div className="card-title mb-2 pb-3">
                            <h5>{"Name undefined"}</h5>
                            </div>
                            <div className="meta-info m-t-24">
                            <div className="meta-info-wrapper">
                                <div className="bid-title mb-1">
                                <span>Current Bid</span>
                                </div>
                                <div className="eth-price">
                                <h6><img src="assets/images/icons/ethereum-big.png" alt="" className="me-1" /> 12
                                </h6>
                                </div>
                            </div>
                            <button className="btn place-bid-btn">Place Bid</button>
                            <button className="wishlist-button" tabIndex={0}>
                                <span className="number-like d-flex">
                                <i className="ri-heart-line me-1" /> 75
                                </span>
                            </button>
                            </div>
                        </div>
                        </div>
                    </Link>
                    </div>
                </div>
                            
              </div>
            </div> */}
                      <ExploreNftListRow  data={addFavData} loadingFilter={loadingFilter} setliked={setliked} />

          </div>
          {/* <div >
            <div className="col-lg-6 col-md-6 col-mb-2 mx-auto">
              <button className="btn btn-load">Load More</button>
            </div>
          </div> */}
        </div></section>
    </>
  )
}

export default Favorites;
