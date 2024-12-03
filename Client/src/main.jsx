import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import Context from './Context/Context.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Context>
        <App/>
      </Context>
    </BrowserRouter>
)
