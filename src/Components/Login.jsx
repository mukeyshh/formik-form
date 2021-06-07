import React, { useState } from 'react'
import axios from 'axios';
import './Login.css'
import { setUserSession } from './Common';
// import { useHistory } from "react-router-dom";

const Login = (props) => {

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const history = useHistory();
 

    const loginUser = () => { 
      setError(null);
      setLoading(true);
      axios.post("https://obscure-reef-33236.herokuapp.com/api/v1/account/login/", {
        email: email,
        password: password
      }).then(response => {
        setLoading(false)
        setUserSession(response.data.token,response.data.user)
        props.history.push('/dashboard')
      }).catch(error => {
        setLoading(false)
        if (error.response.status === 401 || error.response.status === 400) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong, please try again later")
        }
      });
    }
  
  //   async function signUser () {
  //   let item = { email, phone, password }
    
  //   let result= await fetch("https://obscure-reef-33236.herokuapp.com/api/v1/account/register/"
  //   , {
  //     method: 'POST',
  //     body: JSON.stringify(item),
  //     headers: {
  //       "Content-Type": 'application/json',
  //       "Accept":'application/json'
  //     }
  //     })
  //     result = await result.json();
  //     localStorage.setItem("user-info", JSON.stringify(result));
  //     history.push('/dashboard')
  // }

  return (
    
      <div className="login-form">
    <form  className="d-flex flex-column mb-auto justify-content-around" >
        <h2 className="text-center">Log in</h2>       
        <div className="form-group my-2">
            <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required="required" />
        </div>
         {/* <div className="form-group my-2">
            <input type="number" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone number"  />
        </div> */}
        <div className="form-group my-2">
            <input type="password" className="form-control" value={password} onChange ={(e)=>setPassword(e.target.value)} placeholder="Password" required="required" />
        </div>
        <div>
        {error && <p className="error">{error}</p>}
        </div>
          <div className="form-groupmy-2">
          <button type="submit" className="btn btn-primary btn-block" value={loading ? "loading..." : "Login"} disabled={loading} onClick={loginUser}>Log in</button>
          {/* <button type="submit" className="btn btn-secondary btn-block" value ={loading?"loading...":"Login"} disabled={loading} onClick={signUser}>Sign Up</button> */}
        </div>
      
             
    </form>
   

    </div>
  )
}

export default Login
