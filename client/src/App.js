import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import Signup from './containers/Users/Signup/Signup';
import Login from './containers/Users/Login/Login';
import FullTask from './containers/Tasks/FullTask/FullTask';
import AddTask from './containers/Tasks/AddTask/AddTask';
import EditTask from './containers/Tasks/EditTask/EditTask';
import NavigationBar from './containers/NavigationBar/NavigationBar';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <NavigationBar />
        <Switch>
          <Route exact path="/task/add" component={AddTask} />
          <Route path="/task/edit/:id" component={EditTask} />
          <Route path="/tasks/:id" component={FullTask} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
