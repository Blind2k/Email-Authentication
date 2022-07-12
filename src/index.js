import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from "./store/Auth-context"

ReactDOM.render(
  <AuthContextProvider>
    <HashRouter>
      <App />
    </HashRouter>,
  </AuthContextProvider>,
  document.getElementById('root')
);
