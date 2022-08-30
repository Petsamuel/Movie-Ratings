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

    const isDisabled = FormDescription==="" || FormTitle === "";
    
 
    return (
        <React.Fragment>
            
            <div className="form-heading">
                <h3>{props.movie.title}</h3>
                <label htmlFor="title">Title:</label> <br />
                <input value={FormTitle || ""} id="title" placeholder='title' type="text" 
                name="title"    onChange={e => setFormtitle(e.target.value)}
                /> 
                <br />
                <label htmlFor="title">Descriptions:</label> <br />
                <textarea className="" placeholder="descriptions" id="descriptions" value={FormDescription} 
                name="descriptions"    onChange={e => setFormdescriptions(e.target.value)}
                ></textarea> <br />
                {
                props.movie.id ?
                 <input onClick={updateMovie} type="submit" value="update" disabled={isDisabled}/>:
                 <input onClick={createMovie} type="submit" value="Add new" disabled={isDisabled}/>
            }
               
               
            </div>

        </React.Fragment>
    )
}

export default Form
