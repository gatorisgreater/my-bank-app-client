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
    <div>
      <h1>BaaS Pro Shops <br></br>Debit Card Application Form</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        
        {!isSubmitted && (
          
        <><><table style={{ width: '50%', margin: '20px auto', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc' }}></th>
            <th style={{ border: '1px solid #ccc' }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ccc' }}><label htmlFor="firstName">First Name:</label></td>
            <td style={{ border: '1px solid #ccc' }}><input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required /></td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #ccc' }}><label htmlFor="lastName">Last Name:</label></td>
          <td style={{ border: '1px solid #ccc' }}><input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required /></td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #ccc' }}><label htmlFor="addressLine1">Address Line 1:</label></td>
          <td style={{ border: '1px solid #ccc' }}><input type="text" name="addressLine1" placeholder="Address Line 1" onChange={handleChange} required /></td>
        </tr>
        <tr>
        <td style={{ border: '1px solid #ccc' }}><label htmlFor="addressLine2">Address Line 2:</label></td>
        <td style={{ border: '1px solid #ccc' }}><input type="text" name="addressLine2" placeholder="Address Line 2" onChange={handleChange} /></td>
        </tr>
        <tr>
        <td style={{ border: '1px solid #ccc' }}><label htmlFor="city">City:</label></td>  
        <td style={{ border: '1px solid #ccc' }}><input type="text" name="city" placeholder="City" onChange={handleChange} required /></td>
        </tr>
        <tr>
        <td style={{ border: '1px solid #ccc' }}><label htmlFor="state">State:</label></td>            
        <td style={{ border: '1px solid #ccc' }}><input type="text" name="state" placeholder="State (e.g., NY)" onChange={handleChange} required /></td>
        </tr>
        <tr>
        <td style={{ border: '1px solid #ccc' }}><label htmlFor="zip">Zip:</label></td>     
        <td style={{ border: '1px solid #ccc' }}><input type="text" name="zip" placeholder="Zip/Postal Code" onChange={handleChange} required /></td>
        </tr>
        <tr>
        <td style={{ border: '1px solid #ccc' }}><label htmlFor="country">State:</label></td>     
        <td style={{ border: '1px solid #ccc' }}><input type="text" name="country" placeholder="Country" value="US" readOnly /></td>
        </tr>
        <tr>
        <td style={{ border: '1px solid #ccc' }}><label htmlFor="ssn">SSN:</label></td>       
        <td style={{ border: '1px solid #ccc' }}><input type="text" name="ssn" placeholder="SSN (9 digits)" onChange={handleChange} required /></td>
        </tr>
        <tr>
        <td style={{ border: '1px solid #ccc' }}><label htmlFor="email">Email:</label></td>     
        <td style={{ border: '1px solid #ccc' }}><input type="email" name="email" placeholder="Email Address" onChange={handleChange} required /></td>
        </tr>
        <tr>
        <td style={{ border: '1px solid #ccc' }}><label htmlFor="dob">Date of Birth:</label></td>     
        <td style={{ border: '1px solid #ccc' }}><input type="text" name="dob" placeholder="Date of Birth (YYYY-MM-DD)" onChange={handleChange} required /></td>
        </tr>
        </tbody></table>
        </><button type="submit">Submit</button></>
        )}
        
      </form>
    </div>
  );
};

export default ApplicationForm;
