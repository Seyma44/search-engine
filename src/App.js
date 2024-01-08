// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AddLinkPage from './pages/AddLinkPage';
import ListPage from './pages/ListPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/add-link" element={<AddLinkPage />} />
        <Route path="/list-page" element={<ListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
