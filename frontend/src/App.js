import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import { NavBar, ProtectedRoute } from "./components";
import { Container } from "reactstrap";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Switch>
          <ProtectedRoute path="/" component={Home} exact />
          </Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
        </Container>
      </div>
    );
  }
}
export default App;