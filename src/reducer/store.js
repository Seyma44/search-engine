import { createStore } from 'redux';

const initialState = {
  searchTerm: '',
  allData: [],
  listResults: [],
  displayedResults: [],
  currentPage: 1,
  sortedResults: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_ALL_DATA':
      return { ...state, allData: action.payload };
    case 'SET_LIST_RESULTS':
      return { ...state, listResults: action.payload };
    case 'SET_DISPLAYED_RESULTS':
      return { ...state, displayedResults: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SORTED_RESULTS':
      return { ...state, sortedResults: action.payload };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
