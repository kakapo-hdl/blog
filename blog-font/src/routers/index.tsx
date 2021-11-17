import React from "react";
import { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from  "react-router-dom";
const HomePage = lazy(async () => import('../views/HomePage'));
const WriteArticlePage = lazy(async () => import('../views/WriteArticlePage'));
const ManagePage = lazy(async () => import('../views/ManagePage'));
const ArticleDispaly = lazy(async () => import('../views/ArticleDispaly'));

const App = () => {
  return (
    <Router>
        <Switch>
          <Route path="/Home" component={HomePage}>
          </Route>
          <Route path="/ManagePage" component={ManagePage}>
          </Route>
          <Route path="/WriteArticle/:key" component={WriteArticlePage}>
          </Route>
          <Route path="/ArticleDispaly/:key" component={ArticleDispaly}>
          </Route>
          <Redirect from="/" to="/Home" />

        </Switch>
    </Router>
  );
}

export default App