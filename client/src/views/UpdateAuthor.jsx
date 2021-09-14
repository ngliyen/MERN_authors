import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useHistory, Link} from "react-router-dom";
import AuthorForm from '../components/AuthorForm';

const UpdateProduct = (props) => {
  const {id} = useParams();
  const [name, setName] = useState();
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [exist, setExist] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:8000/api/authors/" + id)
      .then(res => {
        console.log("Name:", res.data.name);
        setName(res.data.name);
        setLoaded(true);
        setExist(true);
      })
      .catch(err => {
        console.log("Id does not exists");
        setLoaded(true);
        console.log("Loaded", loaded, "Exist", exist)
      })
  }, [id])

  const updateAuthor = (author) => {
    console.log(id, author);
    axios.put("http://localhost:8000/api/authors/" + id, author)
      .then(res => {
        console.log("Update successful", res)
        history.push("/");
      })
      .catch(err => {
        console.log("Update Unsuccessful", err.response.data);
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message)
        }
        setErrors(errorArr);
      })
    
  }
  
  return(
    <div>
      {(loaded && !exist) ? 
      <div>
        <p>We're sorry, but we could not find the author you are looking for. Would you like to add this author to our database?</p>
        <Link to="/new">Add an author</Link>
      </div>: null}
      {loaded && exist && <AuthorForm initialName={name} onSubmitProp={updateAuthor} errors={errors} />}

    </div>
  )
}

export default UpdateProduct;