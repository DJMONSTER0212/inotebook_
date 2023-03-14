import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
// const navigate = useNavigate()
// navigate('/')
const Login = (props) => {
    const [credentials,setCredentials] = useState({email:"",password:""})
    const navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value }) // jo bhi value is note object k ander hai woh rahe lekin jo properties yaha aage likhi jaa rhi hai inko add ya overwrite kar de
      }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // const navigate = useNavigate()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password}),// body data type must match "Content-Type" header
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authToken)
            // history.push("/")
            // {<Navigate to="/"  />}
            props.showAlert("Logged in Successfully","success")
            navigate('/')
        }
        else {
            props.showAlert("Invalid Credentials","danger")
        }
    }
    return (
        <div className='mt-3'>
            <h2>Login to continue to iNOTEBOOK☁</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email"  name="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
