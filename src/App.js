import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';





function App() {
  const[count, setCount] = useState(4)

  function decrementCount(){
    setCount(prevCount => prevCount-1)
  }
  function incrementCount(){
    setCount(prevCount => prevCount+1)
  }

  return (
    <div className="App">
    <Sidebar />
    <Map />
  </div>
  );
}

export default App;
