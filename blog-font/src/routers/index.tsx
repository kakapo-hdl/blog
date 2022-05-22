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
const PersonPage = lazy(async () => import('../views/PersonPage'));
const Management = lazy(async () => import('../views/Management'));

const App = () => {
  return (

    <Router>
      <Suspense fallback={'loadding'}>

        <Switch>
          <Route path="/Home" component={HomePage}>
          </Route>
          <Route path="/ManagePage" component={ManagePage}>
          </Route>
          <Route path="/PersonPage" component={PersonPage}>
          </Route>
          <Route path="/WriteArticle/:key" component={WriteArticlePage}>
          </Route>
          <Route path="/ArticleDisplay/:key" component={ArticleDisplay}>
          </Route>
          <Route path="/Management" render={() =>
            <Management>
              <Suspense fallback={'loadding'}>
                <Switch>
                  <Route path='/Management/ActicleType' component={() => <>sdfdsf</>} />
                  <Route path="/Management/ActicleManagement" component={PersonPage}>
                  </Route>
                  <Route path="/Management/Profile" component={PersonPage}>
                  </Route>
                  <Route path="/Management/Account" component={PersonPage}>
                  </Route>
                </Switch>
              </Suspense>
            </Management>
          }>
          </Route>

          {/* <Route path="/Management" component={Management}> */}

          {/* </Route> */}

          <Redirect from="/" to="/Home" />
        </Switch>
      </Suspense>

    </Router>
  );
}

export default App;