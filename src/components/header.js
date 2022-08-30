import React, { useState, useEffect } from 'react'

import {useCookies} from "react-cookie"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faPhotoFilm} from "@fortawesome/free-solid-svg-icons"

function Header(props) {
  const [token, setToken, DeleteToken] = useCookies(["ps-cookies"]);
  const [username, setUsername] = useState([]);

  function Dusername(props){
    setUsername(props.username)
    return Dusername
  }
  const LogoutUser =()=>{
    DeleteToken(["ps-cookies"])
  }

  return (
   <React.Fragment>
   <header>
   <div className="brand"> &#10100; SP &#10101; </div>
     <div className="App-header">
    <div className="add-movie ">
    <h2>
    <FontAwesomeIcon icon={faPhotoFilm} />
      <span>Movie-Ratings</span>
    </h2>
    </div>
    </div>
    <div className='Logout' onClick={LogoutUser}>
    <FontAwesomeIcon icon={faSignOutAlt} />
     &nbsp; Logout {username}
    </div>

   </header>
   </React.Fragment>
  )
}

export default Header
