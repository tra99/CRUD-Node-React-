import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate,Link } from 'react-router-dom'

const Update = () => {

  const [error,setError] = useState(false)

  const [book,setBook]=useState({
    title:"",
    desc:"",
    price:null,
    cover:"",
  })

  const navigate=useNavigate()
  const location=useLocation()
  const book_id=location.pathname.split("/")[2]

  const handleChange=(e)=>{
    setBook((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  console.log(book)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/book/${book_id}`, book);
      console.log(response.data); // Log the response data for debugging
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className='form'>
      <h1>Update Book</h1>
      <input type="text" placeholder='title' onChange={handleChange} name='title' />
      <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
      <input type="number" placeholder='price' onChange={handleChange} name='price' />
      <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  )
}

export default Update