import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const ProductForm = (props) => {

  const {initialName, onSubmitProp, errors} = props;
  const [name, setName] = useState(initialName);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Name submitted: ", name);
    onSubmitProp({name:name});
  }

  return(
    <div className="container w-50 mt-5 d-flex flex-column align-items-center">
      <form onSubmit={submitHandler}>
        {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
        <label htmlFor="name" className="form-label">Name: </label>
        <p>
          <input className="form-control w-100" type="text" onChange={(e) => setName(e.target.value)} name="name" value={name}/>
        </p>
        <div>
          <Link to="/" className="btn btn-dark">Cancel</Link>
          <button className="btn btn-dark" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}



export default ProductForm;