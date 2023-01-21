import './App.css';
import Home from './Home';
//React-Router-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<h1>SOLO EL ADMINISTRADOR PUEDE ACCEDER</h1>} />
          <Route path='*' element={<h1>ERROR 404: NOT FOUND PAGE</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
