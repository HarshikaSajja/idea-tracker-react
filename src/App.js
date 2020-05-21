import React from 'react';
import './App.css';
import AddTask from './components/addTask/addTask'
import ShowTasks from './components/showTasks/showTasks'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import Home from './components/home/home'
import { getAllTasks } from './actions'
import { connect } from 'react-redux';

const getDateTime = () => {
  let today = new Date();
  let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes()
  let dateTime = date+'  '+time;
  return dateTime
}

class App extends React.Component {

  componentDidMount() {
    this.props.getAllTasks();
  }

render(){
  return (
    <div>
        <NavBar/>
        {/* <AddTask/> */}
        <ShowTasks editDeleteDisable={true}
                    hideRange={false}
                    from={'home'}/>
        {/* <Footer/> */}
    </div>
  );
}
}

export default connect(null, { getAllTasks })(App);
