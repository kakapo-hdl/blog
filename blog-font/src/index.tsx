import ReactDOM from 'react-dom';
import GlobalStyle from './global';
import Index from './views/IndexPage';

ReactDOM.render(
  <>
    <GlobalStyle></GlobalStyle>
    <Index />
  </>
  ,
  document.getElementById('root') as HTMLElement
);