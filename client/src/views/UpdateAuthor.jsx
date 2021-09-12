import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useHistory} from "react-router-dom";
import AuthorForm from '../components/AuthorForm';

const UpdateProduct = (props) => {
  const {id} = useParams();
  const [name, setName] = useState();
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:8000/api/authors/" + id)
      .then(res => {
        console.log("Name:", res.data.name);
        setName(res.data.name);
        setLoaded(true);
      })
  }, [id])

  const updateAuthor = (author) => {
    console.log(id, author);
    axios.put("http://localhost:8000/api/authors/" + id, author)
      .then(res => {
        console.log(res)
        if(res.data.errors){
          const errorResponse = res.data.errors;
          const errorArr = [];
          for (const key of Object.keys(errorResponse)) {
            errorArr.push(errorResponse[key].message)
            setErrors(errorArr);
          }
        } else{
        history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      })
    
  }
  
  return(
    <div>
      {loaded && <AuthorForm initialName={name} onSubmitProp={updateAuthor} errors={errors} />}
    </div>
  )
}

export default UpdateProduct;