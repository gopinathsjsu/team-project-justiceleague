import React, { useEffect } from 'react';
import './Form.css';

const FormSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/login"
    }, 3000)
  }, []);

  return (
    <div className='form-content-right'>
      <h1 className='form-success'>Successfully registered! Redirecting...</h1>
      <img className='form-img-2' src='img/img-3.svg' alt='success-image' />
    </div>
  );
};

export default FormSuccess;
