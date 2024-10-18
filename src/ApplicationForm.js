import React, { useState } from 'react';
import axios from 'axios';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    ssn: '',
    email: '',
    dob: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { state, country, ssn, dob } = formData;
    if (!/^[A-Z]{2}$/.test(state)) {
      setError('State must be a two-letter code (e.g., NY, CA)');
      return false;
    }
    if (country !== 'US') {
      setError('Country must be "US"');
      return false;
    }
    if (!/^\d{9}$/.test(ssn)) {
      setError('SSN must be 9 digits, no dashes');
      return false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      setError('Date of Birth must be in ISO-8601 format (YYYY-MM-DD)');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitted(true);
    
    try {
      const response = await axios.post('http://localhost:8080/api/apply', formData);

      const outcome = response.data.summary.outcome;

      switch (outcome) {
        case 'Approved':
          setMessage('Success! You have successfully created an account with our service.');
          break;
        case 'Manual Review':
          setMessage('Thanks for submitting your application, we’ll be in touch shortly.');
          break;
        case 'Denied':
          setMessage('Sorry, your application was not successful.');
          break;
        default:
          setMessage('Unexpected outcome. Please try again.');
      }
    } catch (err) {
    console.log("error: ", err)
      setError('There was an error submitting your application. Please try again later.');
    }
  };

  return (
<div className="app-container">
  <h1 className="form-title">BaaS Pro Shops <br />Debit Card Application Form</h1>
  <form onSubmit={handleSubmit} className="form">
    {error && <p className="error-message">{error}</p>}
    {message && <p className="success-message">{message}</p>}
    
    {!isSubmitted && (
      <><div className="form-grid">
            <div className="form-row">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="addressLine1">Address Line 1:</label>
              <input type="text" name="addressLine1" placeholder="Address Line 1" onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="addressLine2">Address Line 2:</label>
              <input type="text" name="addressLine2" placeholder="Address Line 2" onChange={handleChange} />
            </div>
            <div className="form-row">
              <label htmlFor="city">City:</label>
              <input type="text" name="city" placeholder="City" onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="state">State:</label>
              <input type="text" name="state" placeholder="State (e.g., NY)" onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="zip">Zip:</label>
              <input type="text" name="zip" placeholder="Zip/Postal Code" onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="country">Country:</label>
              <input type="text" name="country" placeholder="Country" value="US" readOnly />
            </div>
            <div className="form-row">
              <label htmlFor="ssn">SSN:</label>
              <input type="text" name="ssn" placeholder="SSN (9 digits)" onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="dob">Date of Birth:</label>
              <input type="text" name="dob" placeholder="Date of Birth (YYYY-MM-DD)" onChange={handleChange} required />
            </div>
          </div><button type="submit" className="submit-button">Submit</button></>
)}
    

  </form>
</div>
  );
};

export default ApplicationForm;
