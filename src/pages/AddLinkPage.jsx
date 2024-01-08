import React, { useState } from 'react';
import Button from '../components/Button';
import logo from '../assets/tesodev-logo.png';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/AddLinkPage.scss';


const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

const getCurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = currentDate.getFullYear();
  return `${day}/${month}/${year}`;
};

const AddLinkPage = () => {

  const [formData, setFormData] = useState({
    id: generateUniqueId(),
    nameSurname: '',
    company: 'Tesodev',
    email: '', 
    phone: '499-866-1927',
    website: '', 
    country: '',
    city: '', 
    date: getCurrentDate(),
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    nameSurname: '',
    country: '',
    city: '',
    email: '',
    website: '',
  });
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSave = async () => {
    // Validate form fields before saving
    const formIsValid = validateForm(formData);
  
    // Update error messages
    setErrorMessages({
      nameSurname: validateField('nameSurname', formData.nameSurname) ? '' : getErrorMessage('nameSurname', formData.nameSurname),
      country: validateField('country', formData.country) ? '' : getErrorMessage('country', formData.country),
      city: validateField('city', formData.city) ? '' : getErrorMessage('city', formData.city),
      email: validateField('email', formData.email) ? '' : getErrorMessage('email', formData.email),
      website: validateField('website', formData.website) ? '' : getErrorMessage('website', formData.website),
    });
    setTimeout(() => {
      setShowErrorPopup(false);
    }, 5000);
    if (formIsValid) {
      try {
        const minifiedWebsite = await minifyUrl(formData.website);
        console.log('Minified URL:', minifiedWebsite);

        // Convert formData to the desired format
        const formattedData = { data: [{ ...formData, website: minifiedWebsite }] };
        console.log('Formatted Data:', formattedData);

        // Save data to localStorage
        saveToLocalStorage(formattedData);
        //setShowErrorPopup(false);
        setShowSuccessMessage(true);
        console.log('Save clicked in AddLinkPage!');
      } catch (error) {
        console.error('Error minifying URL:', error);
      }
    }  else {
      // Show error pop-up
      setShowErrorPopup(true);
    }
  };
  
  const generateErrorMessages = () => {
    return Object.values(errorMessages).map((message, index) => (
      <div key={index}>{message}</div>
    ));
  };
 
  const validateField = (name, value) => {
    switch (name) {
      case 'nameSurname':
        return /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{4,60}$/.test(value);
      case 'country':
      case 'city':
        return /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,40}$/.test(value);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.(com(\.tr)?|edu(\.tr)?|org)$/.test(value);
        case 'website':
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
      default:
        return true;
    }
  };
  
  const getErrorMessage = (name, value) => {
    switch (name) {
      case 'nameSurname':
        return 'Please enter a valid name and surname (4-60 characters).';
      case 'country':
        return 'Please enter a valid country (2-40 characters).';
      case 'city':
        return 'Please enter a valid city (2-40 characters).';
      case 'email':
        return 'Please enter a valid email address.';
      case 'website':
        return 'Please enter a valid website URL (https://xyz.com).';
      default:
        return '';
    }
  };

  const validateForm = ({ nameSurname, country, city, email, website }) => {
    // Validate all fields
    const nameSurnameValid = validateField('nameSurname', nameSurname);
    const countryValid = validateField('country', country);
    const cityValid = validateField('city', city);
    const emailValid = validateField('email', email);
    const websiteValid = validateField('website', website);

    // Update error messages
    setErrorMessages({
      nameSurname: nameSurnameValid ? '' : getErrorMessage('nameSurname', nameSurname),
      country: countryValid ? '' : getErrorMessage('country', country),
      city: cityValid ? '' : getErrorMessage('city', city),
      email: emailValid ? '' : getErrorMessage('email', email),
      website: websiteValid ? '' : getErrorMessage('website', website),
    });

    // Check if all fields are valid
    return nameSurnameValid && countryValid && cityValid && emailValid && websiteValid;
  };
 
  const minifyUrl = async (originalUrl) => {
    try {
      const apiUrl = `http://localhost:3001/minify-url?url=${encodeURIComponent(originalUrl)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      return data.data.url;
    } catch (error) {
      throw new Error(`Error minifying URL: ${error.message}`);
    }
  };
  
  const saveToLocalStorage = (data) => {
    try {
      // Retrieve existing data from localStorage
      const existingData = localStorage.getItem('formData');
      
      // Parse existing data or initialize an empty array
      const existingDataArray = existingData ? JSON.parse(existingData).data : [];
  
      // Add the new data to the array
      existingDataArray.push(data.data[0]);
  
      // Save the updated data back to localStorage
      localStorage.setItem('formData', JSON.stringify({ data: existingDataArray }));
  
      console.log('Form data saved to localStorage:', { data: existingDataArray });
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
    }
  };
  

  const getLocalStorageData = () => {
    try {
      const savedFormData = localStorage.getItem('formData');
  
      if (savedFormData !== null) {
        return JSON.parse(savedFormData);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
      return null;
    }
  };
  
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="add-link-page-container">
      {/* Header */}
      <div className="header">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <Link   
          to={{
            pathname: '/list-page'
          }}
          className="return-to-list"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" />
          <div className="list-text">Return to List Page</div>
        </Link>
      </div>
      {/* Form */}
      <div className="form-container">
        <div className={`input-container ${errorMessages.nameSurname && 'error'}`}>
          <label className={`${errorMessages.nameSurname && 'error'}`}>Name Surname</label>
          <input
            type="text"
            name="nameSurname"
            placeholder="Enter name and surname"
            value={formData.nameSurname}
            onChange={handleInputChange}
          />
          <span className="error-text">{errorMessages.nameSurname}</span>
        </div>
        <div className={`input-container ${errorMessages.country && 'error'}`}>
          <label className={`${errorMessages.country && 'error'}`}>Country</label>
          <input
            type="text"
            name="country"
            placeholder="Enter a country"
            value={formData.country}
            onChange={handleInputChange}
          />
          <span className="error-text">{errorMessages.country}</span>
        </div>
        <div className={`input-container ${errorMessages.city && 'error'}`}>
          <label className={`${errorMessages.city && 'error'}`}>City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter a city"
            value={formData.city}
            onChange={handleInputChange}
          />
          <span className="error-text">{errorMessages.city}</span>
        </div>
        <div className={`input-container ${errorMessages.email && 'error'}`}>
          <label className={`${errorMessages.email && 'error'}`}>E-mail</label>
          <input
            type="text"
            name="email"
            placeholder="Enter an email (abc@xyz.com)"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="error-text">{errorMessages.email}</span>
        </div>
        <div className={`input-container ${errorMessages.website && 'error'}`}>
          <label className={`${errorMessages.website && 'error'}`}>Website</label>
          <input
            type="text"
            name="website"
            placeholder="Enter a website (https://xyz.com)"
            value={formData.website}
            onChange={handleInputChange}
          />
          <span className="error-text">{errorMessages.website}</span>
        </div>
        {/* Add button */}
        <div className="add-button-container">
          <Button label="Add" type="button" onClick={handleSave} className="add-button" disabled={!isFormValid} />
        </div>
      </div>
      {showErrorPopup && Object.values(errorMessages).some(message => message) && (
        <div className="popup">
          <div className="popup-header">Error while adding link</div>
            <div className="popup-message">
              <div> {generateErrorMessages()}</div>
              <div className="error-popup-column"><div>Error</div></div>
            </div>
            <button className="popup-close" onClick={() => setShowErrorPopup(false)}> 
             ×
            </button>
        </div>
      )}
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="popup">
          <div className="popup-header">Link added successfully</div>
            <div className="popup-message">
              <div>
                {/* Display formatted data values in a column */}
                {getLocalStorageData() && getLocalStorageData().data && getLocalStorageData().data.length > 0 && (
                  // Display each property of the last object in the array excluding specific properties
                  Object.entries(getLocalStorageData().data[getLocalStorageData().data.length - 1])
                    .filter(([key]) => !['id', 'company', 'phone', 'date'].includes(key))
                    .map(([key, value]) => (
                      <div key={key}>{`${key}: ${value}`}</div>
                    ))
                )}
              </div>
              <div className="success-popup-column">
                <div>Success</div>
              </div>
            </div>
            <button
              className="popup-close"
              onClick={() => {
                setShowSuccessMessage(false);
                refreshPage();
              }}
            >
              ×
            </button>
        </div>
      )}
    </div>
  );
};

export default AddLinkPage;
