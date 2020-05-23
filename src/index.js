import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import { BrowserRouter as Router, Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Provider, connect } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { createStore, applyMiddleware  } from 'redux'
import thunk from "redux-thunk";
import rootReducer from './reducers'
import AddTask from './components/addTask/addTask'
import MyIdeas from './components/MyIdeas/myIdeas'

// const store = createStore(rootReducer, applyMiddleware(thunk))

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)


class Root extends React.Component {
  render() {
    return (
      <Switch>
        {console.log('user loggedin?',this.props.loggedInUser,this.props.isLoggedIn)}
        {/* <Route exact path="/" render={() => (
          (this.props.isLoggedIn) ? (<Route component={App}/>) : (<Route component={Login}/>) 
        )} /> */}
        <Redirect exact from="/" to="/home"/>
        <Route exact path="/home" component={App} />
        <Route path="/add" component={AddTask} />
        <Route path="/my_ideas" component={MyIdeas} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  isLoggedIn: state.user.isLoggedIn
})

const RootWithAuth = withRouter(
  connect(mapStateToProps)(Root)
)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingSpinner/>} persistor={persistor}>
      <Router>
        <RootWithAuth/>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
