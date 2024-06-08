import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';

const NewCustomerDetails = () => {
  const history = useNavigate();
  const { customerData, updateCustomerData } = useContext(LoginContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCustomerData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the next page
    history('/orderDetails');
  };

  const inputStyle = "py-1 px-3 flex-1 rounded-xl border border-2"
  const divStyle = 'flex sm:justify-between p-2 sm:items-center xs:flex-col sm:flex-row'

  return (
    <form onSubmit={handleSubmit} className='xs:w-[90%] sm:w-3/5 mx-auto lg:w-2/5 xs:h-full sm:h-[100vh]'>
        <h1 className='text-3xl text-center py-3'>Customer Details</h1>
      <div className={divStyle}>
        <label htmlFor="firstname" className='flex-1 xs:text-sm sm:text-md xs:mr-5 sm:mr-0 xs:mb-1 sm:mb-0'>First Name:</label>
        <input type="text" id="firstname" name="firstname" value={customerData.firstname} onChange={handleChange} className={inputStyle} required/>
      </div>
      <div className={divStyle}>
        <label htmlFor="lastname" className='flex-1 xs:text-sm sm:text-md xs:mr-5 sm:mr-0 xs:mb-1 sm:mb-0'>Last Name:</label>
        <input type="text" id="lastname" name="lastname" value={customerData.lastname} onChange={handleChange} className={inputStyle} required/>
      </div>
      
      <div className={divStyle}>
        <label htmlFor="contactNumber" className='flex-1 xs:text-sm sm:text-md xs:mr-3 sm:mr-0 xs:mb-1 sm:mb-0'>Contact Number:</label>
        <input type="text" id="contactNumber" name="contactNumber" value={customerData.contactNumber} onChange={handleChange} className={inputStyle} required/>
      </div>
      <div className={divStyle}>
        <label htmlFor="addressLine1" className='flex-1 xs:text-sm sm:text-md xs:mr-3 sm:mr-0 xs:mb-1 sm:mb-0'>Address Line:</label>
        <input type="text" id="addressLine1" name="addressLine1" value={customerData.addressLine1} onChange={handleChange} className={inputStyle} required/>
      </div>
      <div className={divStyle}>
        <label htmlFor="postalCode" className='flex-1 xs:text-sm sm:text-md xs:mr-6 sm:mr-0 xs:mb-1 sm:mb-0'>Postal Code:</label>
        <input type="text" id="postalCode" name="postalCode" value={customerData.postalCode} onChange={handleChange} className={inputStyle} required/>
      </div>
      <div className={divStyle}>
        <label htmlFor="city" className='flex-1 xs:text-sm sm:text-md xs:mr-9 sm:mr-0 xs:mb-1 sm:mb-0'>City:</label>
        <input type="text" id="city" name="city" value={customerData.city} onChange={handleChange} className={inputStyle} required/>
      </div>
      <div className={divStyle}>
        <label htmlFor="state" className='flex-1 xs:text-sm sm:text-md xs:mr-8 sm:mr-0 xs:mb-1 sm:mb-0'>Province:</label>
        <input type="text" id="state" name="state" value={customerData.state} onChange={handleChange} className={inputStyle} required/>
      </div>
      <div className={divStyle}>
        <label htmlFor="email" className='flex-1 xs:text-sm sm:text-md xs:mr-5 sm:mr-0 xs:mb-1 sm:mb-0'>Email:</label>
        <input type="email" id="email" name="email" value={customerData.email} onChange={handleChange} className={inputStyle} required/>
      </div>
      <div className='flex justify-center pb-3'>
        <button type="submit" className='px-7 py-2 bg-green-400 hover:bg-green-500 hover:scale-105 transition-transform text-lg rounded-3xl mt-6'>Next</button>
      </div>
    </form>
  );
};

export default NewCustomerDetails