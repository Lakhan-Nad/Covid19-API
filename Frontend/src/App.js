import React from "react";
import {
  Route,
  Switch,
  NavLink,
  BrowserRouter as Router
} from "react-router-dom";
import NotFound from "./components/NotFound";
import { Container, Menu } from "semantic-ui-react";
import VictimData from "./components/VictimData";
import DisplayData from "./components/DisplayData";
import VictimForm from "./components/AddData";

const activeStyle = {
  fontWeight: "bold",
  borderBottom: "2px solid currentcolor"
};

function App() {
  return (
    <Container>
      <Router>
        <Container>
          <Menu borderless size="massive" secondary color="black">
            <Menu.Item>
              <NavLink to="/stats" activeStyle={activeStyle}>
                Statistics
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/add" activeStyle={activeStyle}>
                Add Data
              </NavLink>
            </Menu.Item>
          </Menu>
        </Container>
        <Switch>
          <Route
            path="/data/:id"
            render={props => <VictimData {...props} />}
          ></Route>
          <Route path="/stats">
            <DisplayData />
          </Route>
          <Route path="/add">
            <VictimForm />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
