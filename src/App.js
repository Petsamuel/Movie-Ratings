import './App.css';
import Header from "./components/header"
// import Footer from "./components/footer"
import {Movie_List, Movie_Details} from "./components/main"



function App() {  
 
  return (
    <div className="App">
      <div className="App-header">
        <Header/>
      </div>
     <div className='App-main'>
        < Movie_List />
        < Movie_Details />
     </div>
     <div className="App-footer">
      
      </div>
     </div>
   
  );
}

export default App;
