import React, { useState, useEffect } from "react";
import API from "../api-services";
import { useCookies } from "react-cookie";

function Auth() {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [errMessage, setMessage] = useState(false);
  const [token, setToken] = useCookies(["ps-cookies"]);
  // const userfield= document.querySelector(".username")
  // const Passfield= document.querySelector(".pass")

  
  const Login = () => {
    API.login({ username, password })
      .then((resp) => setToken("ps-cookies", resp.token))
      .catch(() => setMessage(true))
     
  };
  const register = () => {
    // if ({username}.length>0){
      API.register({ username, password })
      .then(() => Login())
      .catch(() => setMessage(false));
     
    // }
    // errorAlert()
    // setMessage(true)

 };

  useEffect(() => {
    if (token["ps-cookies"] === "undefined") {
      setMessage(true)
      // errorAlert()
    }
    else if (token["ps-cookies"] !== "" && token["ps-cookies"]) 
     window.location.href = "/movies" 


  }, [token]);

  // function errorAlert(){
  //   userfield.style.border="1px solid red"
  //   Passfield.style.border="1px solid red"
  // }


  return (
    <React.Fragment>
      <div className="auth-form">

        {isLoggedIn ? <h1>Login</h1> : <h1>Register</h1>}
        {errMessage ? <small className={errMessage}>invalid username or Password</small> : ""}
        <input
          id="username"
          className="username"
          placeholder="USERNAME"
          type="text"
          onChange={(e) =>{
            setUsername(e.target.value)
            setMessage(false)
          } }
        />
        <br />
       
        <input
          className="pass"
          placeholder="PASSWORD"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />{" "}
        <br />
        {isLoggedIn ? (
          <input onClick={Login} type="submit" value="LOGIN" minLength={"5"}/>
        ) : (
          <input onClick={register} type="submit" value="REGISTER" />
        )}
        {isLoggedIn ? (
          <p onClick={() => setisLoggedIn(false)}>
            you don't have an account ? REGISTER HERE
          </p>
        ) : (
          <p onClick={() => setisLoggedIn(true)}>
            already have an account ? LOGIN HERE
          </p>
        )}
        <br />
      </div>
    </React.Fragment>
  );
}

export default Auth;
