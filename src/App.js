import './App.css';
import Header from "./components/header"
// import Footer from "./components/footer"
import MovieList from "./components/main"
import Footer from "./components/footer"



function App() {  
 
  return (
    <div className="App">
      <div className="App-header">
        <Header/>
      </div>
     <div className='App-layout'>
        < MovieList />
     </div>
     <div className="App-footer">
      <Footer/>
      </div>
     </div>
   
  );
}

export default App;
