import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }) // jo bhi value is note object k ander hai woh rahe lekin jo properties yaha aage likhi jaa rhi hai inko add ya overwrite kar de
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    // const navigate = useNavigate()
    const {name,email,password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOTRiMmM1NTNiN2M1ODUzZTIxMjhiIn0sImlhdCI6MTY3ODM1MjM0N30.L0NZawE5gMO-wMQQNxX1gagEzvoz1Bp3ExtA7qQctq8"
        },
        body: JSON.stringify({name,email,password}),// body data type must match "Content-Type" header
    });
    const json = await response.json()
    console.log(json)
    if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token',json.authToken)
        // history.push("/")
        // {<Navigate to="/"  />}
        navigate('/')
        props.showAlert("Account Created Successfully","success")
    }
    else {
        props.showAlert("Invalid Credentials","danger")
    }
}

  return (
    <div className='container mt-3'>
       
            <h2>Create an Account to use iNOTEBOOK☁</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="Password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cPassword" name='cpassword' onChange={onChange} minLength={5} required />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
