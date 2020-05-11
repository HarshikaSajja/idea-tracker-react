import React from 'react';
import './App.css';
import AddTask from './components/addTask/addTask'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <div>
        <NavBar/>
        <AddTask /> 
        <Footer/>
    </div>
  );
}

export default App;
