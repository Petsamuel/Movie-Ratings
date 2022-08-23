const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Token 3dca8f95a03d20532dd21f44bb4eed734dc137ac",
  });

export default class API{
    static updateMovie(props, body){
    return fetch(`http://localhost:8000/movies/${props}/`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    })
    .then(resp => resp.json())
}

static createMovie(body){
    return fetch(`http://localhost:8000/movies/`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
    .then(resp => resp.json())
}
static deleteMovie(props){
    return fetch(`http://localhost:8000/movies/${props}/`, {
      method: "DELETE",
      headers,
    })
}
}