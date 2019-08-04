import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { NavBar } from "./components";
import { Container } from "reactstrap";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Register} exact />
        </Container>
      </div>
    );
  }
}
export default App;
