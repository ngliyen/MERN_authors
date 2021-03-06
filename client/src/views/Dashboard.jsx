import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const Dashboard = () => {
  const [authors, setAuthors] = useState([]);
  const [loaded,setLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/authors")
      .then(res => {
        setAuthors(res.data);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, [])

  // create a product
  // const createProduct = (product) => {
  //   axios.post("http://localhost:8000/api/products", product)
  //     .then(res=> {
  //       setProducts([...products, res.data]);
  //     })
  //     .catch(err=>console.log(err))
  // }

  const deleteAuthor = (authorId) => {
    axios.delete("http://localhost:8000/api/authors/" + authorId)
      .then(res => {
        console.log(authorId, " deleted");
        setAuthors(authors.filter(author => author._id !== authorId));
      })
      .catch(err => console.log(err));
  }

  // const addProduct = (productObj) => {
  //   setProducts([...products,productObj]);
  // }

  return(
    <div className="container w-50">
      <Link to="/new">Add an author</Link>
      {loaded ? 
        <div>
          <p>We have quotes by: </p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Authors</th>
                <th>Actions available</th>
              </tr>
            </thead>
            <tbody>
            {authors.map((author, idx) => {
              return(
                <tr key={idx}>
                  <td>{author.name}</td>
                  <td className="d-flex gap-2 justify-content-center">
                    <Link className="btn btn-outline-secondary" to={"/edit/"+author._id}>Edit</Link>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => {deleteAuthor(author._id)}}>Delete</button>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>: ""}
    </div>
  );
}

export default Dashboard;