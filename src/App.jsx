import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import RegistroForm from './components/RegistroForm';
import IngresoForm from './components/IngresoForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="api/users/users" element={<RegistroForm />} />
        <Route path="/ingreso/verificar" element={<IngresoForm />} />
        <Route
          exact path="/"
          element={
            <div>
              <Link to="api/users/users">
                <button>Registro</button>
              </Link>
              <Link to="/ingreso/verificar">
                <button>Ingreso</button>
              </Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
