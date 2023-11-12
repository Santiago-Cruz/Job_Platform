import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import RegistroForm from './components/RegistroForm';
import IngresoForm from './components/IngresoForm';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Link to="/api/users/users">
                  <button>Registro</button>
                </Link>
                <Link to="/api/users/ingreso-verificar">
                  <button>Ingreso</button>
                </Link>
              </div>
            }
          />
          <Route path="/api/users/users" element={<RegistroForm />} />
          <Route path="/api/users/ingreso-verificar" element={<IngresoForm />} />      
        </Routes>
    </BrowserRouter>
  );
}

export default App;
