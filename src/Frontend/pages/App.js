import '../CSS/App.css';
//React-Router-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import IngresarDatos from './IngresarDatos';
import Formulario from '../components/Formulario';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin/*' element={<IngresarDatos />}>
            <Route path='agregar' element={<Formulario opcion="1"/>}/>
            <Route path='editar' element={<Formulario opcion="2"/>}/>
          </Route>
          <Route path='*' element={<h1>ERROR 404: NOT FOUND PAGE</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
