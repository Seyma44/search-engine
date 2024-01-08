import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Marker, ArrowUp, ArrowDown } from 'react-flaticons';
import PaginationButtons from '../components/PaginationButtons';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';
import logo from '../assets/tesodev-logo.png';
import '../styles/ListPage.scss';

const ListPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const allData = useSelector((state) => state.allData);
  const listResults = useSelector((state) => state.listResults);
  const sortedResults = useSelector((state) => state.sortedResults);
  const currentPage = useSelector((state) => state.currentPage);
  const itemsPerPage = 5;

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
  }, [dispatch]);
  

  const handleSearchInputChange = (e) => {
    const newSearchTerm = e.target.value;
    dispatch({ type: 'SET_SEARCH_TERM', payload: newSearchTerm });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
    handleSearchButtonClick(newSearchTerm);

    // Save the search term to localStorage
    localStorage.setItem('searchTerm', newSearchTerm);
  };
 
  const handleSearchButtonClick = (trimmedSearchTerm) => {
    if (trimmedSearchTerm.trim().length < 1) {
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
  
    dispatch({ type: 'SET_LIST_RESULTS', payload: results });
  };
    
  const navigateToListPage = () => {
    const trimmedSearchTerm = searchTerm.trim()

    // Check if the trimmed search term is valid (not empty or consists only of white spaces)
    if (trimmedSearchTerm === '') {
      // You may also show a message or perform some other action to indicate to the user that the search term is invalid
      return;
    }

    navigate('/list-page', {
      state: { listResults, searchTerm: trimmedSearchTerm },
    });
  };

   // Pagination functions
   const totalPages = Math.ceil(listResults.length / itemsPerPage);

   const handlePageChange = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //const displayedResults = listResults.slice(startIndex, endIndex);

  const renderPaginationButtons = () => {
    if (listResults.length <= itemsPerPage) {
      return null; // No pagination needed if there are less than or equal to itemsPerPage results
    }
  
    const pageButtons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
  
    if (startPage > 1) {
      pageButtons.push(
        <PaginationButtons
          key="prev"
          label="Previous"
         
          onClick={() => handlePageChange(currentPage - 1)}
        />
      );
      if (startPage > 2) {
        pageButtons.push(<span key="dots-prev"> ... </span>);
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <PaginationButtons
          key={i}
          label={i}
          onClick={() => handlePageChange(i)}
          isSelected={i === currentPage}
        />
      );
    }
  
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<span key="dots-next"> ... </span>);
      }
  
      // Always show the last page button
      pageButtons.push(
        <PaginationButtons
          key={totalPages}
          label={totalPages}
          onClick={() => handlePageChange(totalPages)}
        />
      );
  
      // Always show the "Next" button
      pageButtons.push(
        <PaginationButtons
          key="next"
          label="Next"
          onClick={() => handlePageChange(currentPage + 1)}
        />
      );
    }
  
    return pageButtons;
  };
  //pagination finished

  const handleSortChange = (criteria) => {
    const [sortBy, sortOrder] = criteria.split(' ');

    let sortedList = [...listResults];
    if (sortBy === 'nameSurname') {
      sortedList.sort((a, b) =>
        sortOrder === 'ascending' ? a.nameSurname.localeCompare(b.nameSurname) : b.nameSurname.localeCompare(a.nameSurname)
      );
    } else if (sortBy === 'date') {
      sortedList.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
      });
    }

    dispatch({ type: 'SET_SORTED_RESULTS', payload: sortedList });
  };
  

  const displayedResults = sortedResults.length > 0 ? sortedResults.slice(startIndex, endIndex) : listResults.slice(startIndex, endIndex);

  useEffect(() => {
    // Reset sorting state when search term changes
    dispatch({ type: 'SET_SORTED_RESULTS', payload: [] });
  }, [searchTerm]);
  
  return (
    <>
      <div className="list-page-container">
        <div className="header">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
          </Link>
          <div className="top-right-button">
            <Button label="Add New Record" type="link" to="/add-link" />
          </div>
          <div className='search-box-container'>
            <SearchBox
            style={{fontWeight:'bold', color:'#484848'}}
              className="custom-search-box"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search..."
            />
             <Button label="Search" type="button" onClick={navigateToListPage} />
          </div>
        </div>
        <div className="list-page-container-list">
          <div className="row-container">
            <div className="button-container">
              <div className="dropdown">
                <button className="dropbtn">
                  <ArrowUp color="#484848" size="14px" />
                  <ArrowDown color="#484848" size="14px" />
                  Order By
                </button>
                <div className="dropdown-content">
                  <span onClick={() => handleSortChange('nameSurname ascending')}>Name ascending</span>
                  <span onClick={() => handleSortChange('nameSurname descending')}>Name descending</span>
                  <span onClick={() => handleSortChange('date ascending')}>Date ascending</span>
                  <span onClick={() => handleSortChange('date descending')}>Date descending</span>
                </div>
            </div>
          </div>
          <div className="my-result-list">
            {displayedResults.length > 0 ? (
              displayedResults.map((result) => (
                <div className="search-result-list" key={result.id}>
                  <div className="icon-column">
                    <Marker color="#2d2d2d" size="18px" />
                  </div>
                  <div className="info-column">
                    <div className="name-style">{result.nameSurname}</div>
                    <div className="city-style">
                      {result.city}, {result.country}
                    </div>
                  </div>
                  <div className="info-column">
                    <div className="city-style">{result.company}</div>
                    <div className="name-style">{result.date}</div>
                  </div>
                </div>
              ))
              ) : (
              <div className="no-results-message">No results found.</div>
            )}
          </div>
        </div>
        <div className="pagination">{renderPaginationButtons()}</div>
        </div>
      </div>
    </>
  );
};

export default ListPage;
