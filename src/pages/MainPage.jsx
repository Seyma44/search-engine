import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Marker} from 'react-flaticons';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';
import logo from '../assets/tesodev-logo.png';
import Footer from '../components/Footer';
import MyCarousel from '../components/MyCarousel';
import '../styles/MainPage.scss';
import '../styles/SearchBox.scss'; 


const MainPage = () => {

  const [displayedResults, setDisplayedResults] = useState([]);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const allData = useSelector((state) => state.allData);
  const listResults = useSelector((state) => state.listResults);
  
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('formData')) || { data: [] };
    fetch('/mock-data-converted.json')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          dispatch({ type: 'SET_ALL_DATA', payload: [...data.data, ...localStorageData.data] });
          localStorage.setItem('searchData', JSON.stringify([...data.data, ...localStorageData.data]));
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
  }, [dispatch]);


  const handleSearchInputChange = (e) => {
    const searchTermValue = e.target.value;
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTermValue });
    handleSearchButtonClick(searchTermValue);
    setIsSearchResultsOpen(!!searchTermValue.trim());
  };


  const handleSearchButtonClick = (trimmedSearchTerm) => {
    if (trimmedSearchTerm.trim().length < 2) {
      return;
    }
   
  
    const searchWords = trimmedSearchTerm.toLowerCase().split(/\s+/);

    const results = allData.filter((item) => {
      return searchWords.every((word) => {
        return ['nameSurname', 'city', 'country', 'company'].some((field) => {
          const value = item[field];
          return typeof value === 'string' && value.toLowerCase().indexOf(word) !== -1;
        });
      });
    });
  
    setDisplayedResults(results.slice(0, 3));
    dispatch({ type: 'SET_LIST_RESULTS', payload: results });
    setIsSearchResultsOpen(!!results.length);
  };

 
  const navigateToListPage = () => {
    const trimmedSearchTerm = searchTerm.trim()

    // Check if the trimmed search term 
    if (trimmedSearchTerm === '') {
      return;
    }

    navigate('/list-page', {
      state: { listResults, searchTerm: trimmedSearchTerm },
    });
  };

  return (
    <>
      <div className="main-page-container">
        <div className="top-right-button">
          <Button label="Add New Record" type="link" to="/add-link" />
        </div>
        <div className="center-content">
          <img src={logo} alt="Logo" />
          <div className='logo-bottom-text'>Search app</div>
          <div className='search-title'>Find in records</div>
          <div className="search-input-container-main">
            <SearchBox
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search..."
            />
            <Button label="Search" type="button" onClick={navigateToListPage} />
          </div>
          {isSearchResultsOpen && (
            <div>
              {displayedResults.length > 0 && (
                <div className="search-results-container">
                  {displayedResults.map((result, index) => (
                    <div
                      key={result.id}
                      className="search-result"
                      style={{ borderBottom: index === displayedResults.length - 1 ? 'none' : '1px solid #ccc' }}
                    >
                      <div className="icon-column">
                        <Marker color='#2d2d2d' size='18px' />
                      </div>
                      <div className="info-column">
                        <div className='name-style'>{result.nameSurname}</div>
                        <div className='city-style'>{result.city}, {result.country}</div>
                      </div>
                    </div>
                  ))}
                  {displayedResults.length > 2 && (
                    <div className="load-more" onClick={navigateToListPage}>
                      Show More
                    </div>
                  )}
                </div>
              )}
            </div> 
          )} 
        </div>    
      </div>  
      <div className="slider-content">
        <div className='slider-title'>Top News</div>
        <MyCarousel />
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
