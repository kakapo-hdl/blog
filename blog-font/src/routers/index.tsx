import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
const HomePage = lazy(async () => import('../views/HomePage'));
const WriteArticlePage = lazy(async () => import('../views/WriteArticlePage'));
const ManagePage = lazy(async () => import('../views/ManagePage'));
const ArticleDisplay = lazy(async () => import('../views/ArticleDisplay'));

const App = () => {
  return (
    <Suspense fallback={'loadding'}>

      <Router>
        <Suspense fallback={'loadding'}>

          <Switch>
            <Route path="/Home" component={HomePage}>
            </Route>
            <Route path="/ManagePage" component={ManagePage}>
            </Route>
            <Route path="/WriteArticle/:key" component={WriteArticlePage}>
            </Route>
            <Route path="/ArticleDisplay/:key" component={ArticleDisplay}>
            </Route>
            <Redirect from="/" to="/Home" />
          </Switch>
        </Suspense>

      </Router>
    </Suspense>
  );
}

export default App;