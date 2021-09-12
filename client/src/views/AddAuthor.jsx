import React, {useState} from 'react';
import axios from 'axios';
import AuthorForm from '../components/AuthorForm';
import {useHistory, Link} from 'react-router-dom'

const AddAuthor = (props) => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const createAuthor = (author) => {
    axios.post("http://localhost:8000/api/authors", author)
      .then(res => {
        console.log(res.data)
        history.push("/");
      }) // later redirect to the new page
      .catch(err => {
        console.log(err);
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message)
          setErrors(errorArr);
        }
      }, [])
  }

  return(
    <div>
      <Link to="/">Home</Link>
      <p>Add a new author: </p>
      <AuthorForm initialName={name} onSubmitProp={createAuthor} errors={errors} />
    </div>
  )


}

export default AddAuthor;