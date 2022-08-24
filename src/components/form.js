import React, { useState, useEffect } from 'react'
import API from '../api-services'
import {useCookies} from "react-cookie"



function Form(props) {
    const [FormTitle, setFormtitle] = useState()
    const [FormDescription, setFormdescriptions] = useState()
    const [token] = useCookies(["ps-cookies"]);

    useEffect(()=>{
        setFormtitle(props.movie.title)
        setFormdescriptions(props.movie.description)

    }, [props.movie])

    const updateMovie = ()=>{
       API.updateMovie(props.movie.id, {title:FormTitle, description:FormDescription}, token['ps-cookies'])
       .then(resp => props.updatedMovie(resp))
       .catch(error => console.log(error));
      
    }
    const createMovie = ()=>{
        API.createMovie({title:FormTitle, description:FormDescription}, token['ps-cookies'])
        .then(resp => props.newMovie(resp))
        .catch(error => console.log(error));
       
     }
    
 
    return (
        <React.Fragment>
            <div className="form-heading">
               
                <h3>{props.movie.title}</h3>
                <label htmlFor="title">Title:</label> <br />
                <input value={FormTitle || ""} id="title" placeholder='title' type="text" 
                    onChange={e => setFormtitle(e.target.value)}
                required/> 
                <br />
                <label htmlFor="title">Descriptions:</label> <br />
                <textarea className="" placeholder="descriptions" id="descriptions" value={FormDescription} 
                    onChange={e => setFormdescriptions(e.target.value)}
                required></textarea> <br />
                {
                props.movie.id ?
                 <input onClick={updateMovie} type="submit" value="update"/>:
                 <input onClick={createMovie} type="submit" value="Add new"/>
            }
               
               
            </div>

        </React.Fragment>
    )
}

export default Form
