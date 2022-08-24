

export default class API{
    static updateMovie(props, body, token){
    return fetch(`http://localhost:8000/movies/${props}/`, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
    .then(resp => resp.json())
}

static createMovie(body, token){
    return fetch(`http://localhost:8000/movies/`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
    .then(resp => resp.json())
}
static deleteMovie(props, token){
    return fetch(`http://localhost:8000/movies/${props}/`, {
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
}
static async login(body){
    const resp = await fetch(`http://localhost:8000/auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  return await resp.json()
}

static register(body){
  return fetch(`http://localhost:8000/users/`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      // Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  })
  .then(resp => resp.json())
  .catch(error=> console.log(error))
}






}