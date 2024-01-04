import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: 0, // Initialize with 0 for numeric input
    cover: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Input validation
    if (!book.title || !book.price) {
      setError('Title and Price are required.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/book', book);
      navigate('/'); // Redirect to the home page
    } catch (err) {
      setError('An error occurred while adding the book.');
      console.log(err);
    }
  };

  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type='text' placeholder='Title' onChange={handleChange} name='title' />
      <input type='text' placeholder='Description' onChange={handleChange} name='desc' />
      <input type='number' placeholder='Price' onChange={handleChange} name='price' />
      <input type='text' placeholder='Cover URL' onChange={handleChange} name='cover' />
      <button onClick={handleClick}>Add</button>
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default Create;
