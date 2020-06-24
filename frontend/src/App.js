import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import Login from './login';
import Home from './home';
import Profile from './main';
import PublicRoute from './routes/publicroute'
import ProtectedRoute from './routes/protectedroute';
class App extends React.Component{
  render()
  {
    return(
      <div className="main">
          <BrowserRouter>
              <div className="header">
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                <NavLink exact to="/login" activeClassName="active">Login</NavLink>
                <NavLink exact to="/Profile" activeClassName="active">Profile</NavLink>
              </div>
          <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute exact path="/login" component={Login} />
                <ProtectedRoute exact path="/Profile" component={Profile} />
              </Switch>
          </div>
          </BrowserRouter>
      </div>
    )
  }
}

export default App;
