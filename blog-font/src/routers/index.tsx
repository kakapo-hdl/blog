import React from "react";
import { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from  "react-router-dom";
const HomePage = lazy(async () => import('../views/HomePage'));
const WriteArticlePage = lazy(async () => import('../views/WriteArticlePage'));

const App = () => {
  return (
    <Router>
        <Switch>
          <Route path="/Home" component={HomePage}>
          </Route>
          <Route path="/WriteArticle" component={WriteArticlePage}>
          </Route>
          <Redirect from="/" to="/Home" />

        </Switch>
    </Router>
  );
}

export default App