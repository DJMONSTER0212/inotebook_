import React,{useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  let location = useLocation();
  useEffect(()=>{
    // console.log(location.pathname)
  },[location])
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">iNOTEBOOK☁</Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<div>
            <Link className="btn btn-primary mx-1" to="/login"  role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
            </div>:<button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
