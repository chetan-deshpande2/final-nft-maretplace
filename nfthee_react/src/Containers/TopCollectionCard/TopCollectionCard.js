import { useEffect, useState, useRef } from 'react';
import { top_collection, top_sellers } from '../Home/Data';
import $ from 'jquery';
import { TopCollectionCard_select } from '../../Components/NiceSelect';
import Card from '../Card';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import instance from '../../axios';

function TopCollectionCard() {
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isOpen, setIsopen] = useState(true);
  const [collections, setCollections] = useState([]);
  const [blockchains, setBlockchains] = useState([]);
  const [categories, setCategories] = useState([]);
  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const history = useHistory();

  const [noOfElement, setNoOfElement] = useState(12);
  const [message, setMessage] = useState('');
  const loadMore = () => {
    setNoOfElement(prev=>prev + 12);
    if (noOfElement > collections.length) {
      const Msg = '--No Content--';
      setMessage(Msg);
      console.log(Msg);
    }
  };

  const slice = top_sellers.slice(0, noOfElement);
  const [show, setShow] = useState('hidden');
  const ShowResult = () => {
    setShow('show');
  };
  const [filter, setfilter] = useState('filterClose');
  const FilterClose = () => {
    window.scrollTo(0, 0);
    filter === 'filterClose' ? setfilter('') : setfilter('filterClose');
  };

  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getCollection`)
      .then((response) => setCollections(response.data.data));
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getBlockchain`)
      .then((response) => setBlockchains(response.data.data));
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getCategory`)
      .then((response) => setCategories(response.data.data));
  }, []);

  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filterSearch, setFilterSearch] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [serachButton, setSearchButton] = useState(false);

  const handleSelectFilters = (name, e) => {
    if (selectedFilter.includes(name)) {
      const removeFilter = selectedFilter.filter((el) => {
        return el !== name ? true : false;
      });
      setSelectedFilter(removeFilter);
    } else {
      setSelectedFilter([...selectedFilter, name]);
    }
    const { checked } = e.target;
    const j = e.target.name;
    //for checkbox checked or unchecked
    if (checked) {
      setFilterSearch((state) => [...state, { [e.target.name]: name }]);
    }
    if (checked == false && j === 'blockChain') {
      setFilterSearch((state) => state.filter((el) => el.blockChain != name));
    }
    if (checked == false && j === 'collection') {
      setFilterSearch((state) => state.filter((el) => el.collection != name));
    }

    if (checked == false && j === 'categories') {
      setFilterSearch((state) => state.filter((el) => el.categories != name));
    }
  };
  console.log(
    '<><<><><><<<>><>>>',
    { collections },
    { blockchains },
    { categories },
    { filterSearch }
  );

  const [queryParamChanged, setQueryParamChanged] = useState(false);

  useEffect(() => {
    // if (!serachButton) return;
    // if (location.search) {
    //   let a = location.search.slice(5);
    //   setSearchText(a);
    // }
    const collectionArr = filterSearch.filter((obj) =>
      obj.hasOwnProperty('collection')
    );
    const blockChainArr = filterSearch.filter((obj) =>
      obj.hasOwnProperty('blockChain')
    );

    const categoriesArr = filterSearch.filter((obj) =>
      obj.hasOwnProperty('categories')
    );
    let url = '/topcollectioncard?';

    const addQueryParam = (paramName, arr) => {
      if (arr.length === 0) return;
      const paramValues = arr.map((obj) => obj[paramName]).join(`,`);

      url += `${paramName}=${paramValues}&`;
      setQueryParamChanged(true);
    };
    addQueryParam('categories', categoriesArr);
    addQueryParam('collection', collectionArr);
    addQueryParam('blockChain', blockChainArr);

    if (searchText) {
      url += `str=${searchText.replace(' ', '+')}&`;
    }
    if (
      serachButton ||
      performance.navigation.type === 1 ||
      queryParamChanged
    ) {
      history.push(url.slice(0, -1));
    }

    setSearchButton(false);
    setQueryParamChanged(true);


    
    // instance
    //   .get("api/all" + window.location.search)
    //   .then((response) => setNftData(response.data.data))
    //   .finally(() => setIsLoading(false));
  }, [filterSearch, searchText, serachButton]);
  const handleSearchText = (e) => {
    e.preventDefault();
    setSearchButton(true);
  };

  return (
    <>
      <main>
        <section className='bg-section'>
          <div className='container-fluid'>
            <div className='section-heading text-center mb-5 day-select'>
              <div className='d-flex justify-content-center align-items-center'>
                <div className='section-title-path mx-lg-auto d-lg-flex'>
                  <h2 className='section-title mb-1'>
                    {' '}
                    Top Collections over Last{' '}
                  </h2>
                  {/* <select className="select section-title-collection">
                                <option data-display="1 day"> 1 day</option>
                                <option value={1}>7 Days</option>
                                <option value={2}>15 Days</option>
                                <option value={4}>30 Days</option>
                            </select> */}
                  <TopCollectionCard_select />
                </div>
              </div>
              <img src='assets/images/path1.png' alt='' className='img-fluid' />
            </div>
            <div className='row'>
              <div className='top-collection-over-section'>
                <div className='row'>
                  {isOpen ? (
                    <div
                      className={`col-lg-3 collection-filter-wrapper filter-sticky custom-scrollbar ${filter}`}
                    >
                      <div className='collection-filter'>
                        <div className='panel'>
                          <div className='panel-heading d-flex justify-content-between align-items-center mb-4'>
                            <div className='panel-title'>
                              {filter ? (
                                <img
                                  src='/assets/images/icons/filter-icon.png'
                                  alt=''
                                  className='me-2 filter-icon'
                                  onClick={ToggleSidebar}
                                />
                              ) : (
                                <img
                                  src='/assets/images/icons/filter-icon.png'
                                  alt=''
                                  className='me-2 filter-icon'
                                  onClick={FilterClose}
                                />
                              )}{' '}
                              Filter{' '}
                            </div>
                            <span>
                              {' '}
                              {filter ? (
                                <img
                                  src='assets/images/icons/close.png'
                                  alt=''
                                  className='img-fluid close-icon'
                                  onClick={ToggleSidebar}
                                />
                              ) : (
                                <img
                                  src='assets/images/icons/close.png'
                                  alt=''
                                  className='img-fluid close-icon'
                                  onClick={FilterClose}
                                />
                              )}{' '}
                            </span>
                          </div>
                          {isOpen ? (
                            <div className='panel-body'>
                              <form className='filter-search me-auto d-none d-md-block mb-3'>
                                {' '}
                                <input
                                  type='text'
                                  placeholder='Search'
                                  value={searchText}
                                  onChange={(e) =>
                                    setSearchText(e.target.value)
                                  }
                                  className='form-control'
                                />
                                <div className='search-icon'>
                                  {' '}
                                  <button
                                    className='btn'
                                    onClick={handleSearchText}
                                  >
                                    {' '}
                                    <i className='bx bx-search-alt-2' />{' '}
                                  </button>{' '}
                                </div>
                              </form>
                              <div className='accordion' id='accordionExample'>
                                <div className='accordion-item'>
                                  <h2
                                    className='accordion-header'
                                    id='headingOne'
                                  >
                                    {' '}
                                    <button
                                      className='accordion-button'
                                      type='button'
                                      data-bs-toggle='collapse'
                                      data-bs-target='#collapseOne'
                                      aria-expanded='true'
                                      aria-controls='collapseOne'
                                    >
                                      {' '}
                                      BLOCKCHAIN{' '}
                                    </button>{' '}
                                  </h2>
                                  <div
                                    id='collapseOne'
                                    className='accordion-collapse collapse show'
                                    aria-labelledby='headingOne'
                                    data-bs-parent='#accordionExample'
                                  >
                                    <div className='accordion-body'>
                                      {blockchains?.map((blockchain, i) => (
                                        <div
                                          className='custom-checkbox'
                                          key={blockchain.name}
                                        >
                                          <div className='form-check'>
                                            <input
                                              className='form-check-input '
                                              type='checkbox'
                                              id={blockchain.name}
                                              name={'blockChain'}
                                              onClick={(e) =>
                                                handleSelectFilters(
                                                  blockchain.name,
                                                  e
                                                )
                                              }
                                            />
                                            <label
                                              className='form-check-label '
                                              htmlFor={blockchain.name}
                                            >
                                              <span className='ml-2'>
                                                {blockchain.name}
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className='accordion-item'>
                                  <h2
                                    className='accordion-header'
                                    id='headingTwo'
                                  >
                                    <button
                                      className='accordion-button'
                                      type='button'
                                      data-bs-toggle='collapse'
                                      data-bs-target='#collapseTwo'
                                      aria-expanded='true'
                                      aria-controls='collapseOne'
                                    >
                                      Categories
                                    </button>
                                  </h2>
                                  <div
                                    id='collapseTwo'
                                    className='accordion-collapse collapse show'
                                    aria-labelledby='headingTwo'
                                    data-bs-parent='#accordionExample'
                                  >
                                    <div className='accordion-body'>
                                      {categories?.map((categorie, i) => (
                                        <div
                                          className='custom-checkbox'
                                          key={categorie.name}
                                        >
                                          <div className='form-check'>
                                            <input
                                              className='form-check-input '
                                              type='checkbox'
                                              id={categorie.name}
                                              name={'categories'}
                                              onClick={(e) =>
                                                handleSelectFilters(
                                                  categorie.name,
                                                  e
                                                )
                                              }
                                            />
                                            <label
                                              className='form-check-label '
                                              htmlFor={categorie.name}
                                            >
                                              <span className='ml-2'>
                                                {categorie.name}
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className='accordion-item'>
                                  <h2
                                    className='accordion-header'
                                    id='headingThree'
                                  >
                                    <button
                                      className='accordion-button'
                                      type='button'
                                      data-bs-toggle='collapse'
                                      data-bs-target='#collapseThree'
                                      aria-expanded='true'
                                      aria-controls='collapseTwo'
                                    >
                                      Collection
                                    </button>
                                  </h2>
                                  <div
                                    id='collapseThree'
                                    className='accordion-collapse collapse show'
                                    aria-labelledby='headingThree'
                                    data-bs-parent='#accordionExample'
                                  >
                                    <div className='accordion-body'>
                                      {collections?.map((collection, i) => (
                                        <div
                                          className='custom-checkbox'
                                          key={collection.name}
                                        >
                                          <div className='form-check'>
                                            <input
                                              className='form-check-input '
                                              type='checkbox'
                                              id={collection.name}
                                              name={'collection'}
                                              onClick={(e) =>
                                                handleSelectFilters(
                                                  collection.name,
                                                  e
                                                )
                                              }
                                            />
                                            <label
                                              className='form-check-label '
                                              htmlFor={collection.name}
                                            >
                                              <span className='ml-2'>
                                                {collection.name}
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className='accordion-item'>
                                  <h2
                                    className='accordion-header'
                                    id='headingFour'
                                  >
                                    <button
                                      className='accordion-button'
                                      type='button'
                                      data-bs-toggle='collapse'
                                      data-bs-target='#collapseFour'
                                      aria-expanded='true'
                                      aria-controls='collapseFour'
                                    >
                                      Price
                                    </button>
                                  </h2>
                                  <div
                                    id='collapseFour'
                                    className='accordion-collapse collapse show'
                                    aria-labelledby='headingFour'
                                    data-bs-parent='#accordionExample'
                                  >
                                    <div className='accordion-body '>
                                      <div className='currency-search'>
                                        <select
                                          className='form-select'
                                          aria-label='Default select example'
                                          style={{ display: 'none' }}
                                        >
                                          <option selected>
                                            United State Dollar
                                          </option>
                                          <option value={1}>One</option>
                                          <option value={2}>Two</option>
                                          <option value={3}>Three</option>
                                        </select>
                                        <div
                                          className='nice-select form-select'
                                          tabIndex={0}
                                        >
                                          <span className='current'>
                                            United State Dollar
                                          </span>
                                          <ul className='list'>
                                            <li
                                              data-value='United State Dollar'
                                              className='option selected'
                                            >
                                              United State Dollar
                                            </li>
                                            <li
                                              data-value={1}
                                              className='option'
                                            >
                                              One
                                            </li>
                                            <li
                                              data-value={2}
                                              className='option'
                                            >
                                              Two
                                            </li>
                                            <li
                                              data-value={3}
                                              className='option'
                                            >
                                              Three
                                            </li>
                                          </ul>
                                        </div>
                                        <div className='price-filter'>
                                          <div className='d-flex justify-content-between'>
                                            <div className='filter-box'>
                                              <input
                                                type='text'
                                                className='form-control'
                                                placeholder='From'
                                              />
                                            </div>
                                            <div className='filter-box'>
                                              <input
                                                type='text'
                                                className='form-control'
                                                placeholder='To'
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='col-lg-1' style={{ width: '5.333333%' }}>
                      <div className='collection-filter filter-sticky'>
                        <div className='panel p-0'>
                          <div className='panel-heading'>
                            <div
                              className='panel-title filter-border'
                              onClick={ToggleSidebar}
                            >
                              {' '}
                              <img
                                src='assets/images/icons/filter-icon.png'
                                alt=''
                                className='filter-icon'
                              />{' '}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {filter ? (
                    <div className='col-lg-12 filter-mobile-wrapper'>
                      <button onClick={FilterClose} className='filter_button'>
                        <img
                          src='assets/images/icons/filter-icon.png'
                          alt=''
                          className='me-3'
                        />
                        Filter
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                  <div
                    className={`${
                      isOpen ? 'col-lg-9' : 'col-lg-11'
                    } collection-filter-card`}
                    style={{ width: `${isOpen ? '' : '94.666667%'}` }}
                  >
                    <div className='row'>
                      {collections.map((coll,i) => {
                        return <Card item={coll} index={i}  />;
                      })}
                    </div>
                    <div className='row mb-4'>
                      <div className='col-lg-6 col-md-6 mx-auto'>
                        <h1 className='section-title text-center'>{message}</h1>
                        {!message && (
                          <button className='btn btn-load' onClick={loadMore}>
                            Load More
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TopCollectionCard;
