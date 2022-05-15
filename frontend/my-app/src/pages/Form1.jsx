import React, { useState } from 'react';
import './Form.css';
import FormSignup from './FormSignup';
import FormLogin from './FormLogin';
import { Link } from 'react-router-dom';
import FormSuccess from './FormSuccess';

const Form1 = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img'/>
        </div>
        {!isSubmitted ? (
          <FormLogin submitForm={submitForm} />
         
        ) : (
          <FormSuccess />
          
        )}

        
      </div>
    </>
  );
};

export default Form1;
