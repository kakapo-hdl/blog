import ReactDOM from 'react-dom';
import GlobalStyle from './global';
import Index from './views/IndexPage';

ReactDOM.render(
  <div>
 
    <GlobalStyle></GlobalStyle>

    <Index />
 

  </div>
  ,
  document.getElementById('root') as HTMLElement
);