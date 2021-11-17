import ReactDOM from 'react-dom';
import GlobalStyle from './global';
import {IndexPage} from './views/IndexPage';

ReactDOM.render(
  <>
    <GlobalStyle></GlobalStyle>
    <IndexPage />
  </>
  ,
  document.getElementById('root') as HTMLElement
);