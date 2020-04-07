import React from "react";
import {
  Route,
  Switch,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import { Container, Menu, Dropdown } from "semantic-ui-react";
import VictimData from "./components/VictimData";
import VictimForm from "./components/AddData";
import Tick from "./components/Tick";
import VisualCharts from "./components/VisualCharts";
import MapData from "./components/MapData";

const activeStyle = {
  fontWeight: "bold",
  borderBottom: "2px solid currentcolor",
};

function App() {
  return (
    <Router>
      <Container>
        <Menu
          borderless
          size="massive"
          secondary
          color="black"
          style={{ marginBottom: "0" }}
        >
          <Menu.Item>
            <NavLink to="/" activeStyle={activeStyle} exact>
              Statistics
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/add" activeStyle={activeStyle}>
              Add Data
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/map" activeStyle={activeStyle}>
              Covid-19 Map
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <Dropdown item text="Visualization" basic>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <NavLink to="/date">Datewise new cases</NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  <NavLink to="/datecumulative">Datewise total cases</NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  <NavLink to="/state">Statewise new cases</NavLink>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route
            path="/data/:id"
            render={(props) => (
              <VictimData
                id={props.match.params.id}
                key={"data-" + props.match.params.id}
              />
            )}
          ></Route>
          <Route
            path="/update/:id"
            render={(props) => (
              <VictimData
                id={props.match.params.id}
                update
                key={"update-" + props.match.params.id}
              />
            )}
          ></Route>
          <Route path="/add">
            <VictimForm />
          </Route>
          <Route path="/date">
            <VisualCharts key="datewise" />
          </Route>
          <Route path="/datecumulative">
            <VisualCharts cumulative key="datewisecumulative" />
          </Route>
          <Route path="/state">
            <VisualCharts state key="statewise" />
          </Route>
          <Route path="/map">
            <MapData />
          </Route>
          <Route path="/" exact>
            <Tick />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
