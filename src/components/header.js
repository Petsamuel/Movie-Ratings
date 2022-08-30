import React, { useState } from 'react'

import {useCookies} from "react-cookie"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons"

function Header() {
  const [token, setToken, DeleteToken] = useCookies(["ps-cookies"]);
  const [username, setUsername] = useState([]);

  const LogoutUser =()=>{
    
    DeleteToken(["ps-cookies"])

  }

  return (
   <React.Fragment>
    <div className="brand"> &#10100; SP &#10101; </div>
     <div className="App-header">
    <div className="add-movie ">
    <h2>
      <span>Movie-Ratings</span>
    </h2>
    </div>
    </div>
    <div className='Logout' onClick={LogoutUser}>
    <FontAwesomeIcon icon={faSignOutAlt} />
     &nbsp; Logout {username}
    </div>

   </React.Fragment>
  )
}

export default Header
