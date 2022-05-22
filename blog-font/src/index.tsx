import ReactDOM from 'react-dom';
import GlobalStyle from './global';
import {IndexPage} from './views/IndexPage';
import { store } from './store/Store';
import { Provider } from 'react-redux'
ReactDOM.render(
  <>
  
    <GlobalStyle></GlobalStyle>
    <Provider store={store}>
    <IndexPage />
    </Provider>

  </>
  ,
  document.getElementById('root') as HTMLElement
);