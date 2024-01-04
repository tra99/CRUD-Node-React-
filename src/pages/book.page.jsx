import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookPage = () => {
  const [books, setBooks] = useState([]);

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/book');
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleDelete = async (book_id) => {
    try {
      await axios.delete(`http://localhost:8080/book/${book_id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Library Travell</h1>
      <div className='book'>
        {books.map((book) => (
          <div key={book.book_id}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <div>{book.price}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <button className='delete' onClick={() => handleDelete(book.book_id)}>
                Delete
              </button>
              <button className='Edit'>
                <Link to={`/update/${book.book_id}`}>Edit</Link>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button style={{ marginTop: 10, alignItems: 'center' }}>
        <Link to='/create'>Add new book</Link>
      </button>
    </div>
  );
};

export default BookPage;
