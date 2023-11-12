import { useState } from 'react';
import axios from 'axios';

function IngresoForm() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(false); 

  const handleIngreso = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/ingreso-verificar', {
        correo: correo,
        contrasena: contrasena,
      });
      if (response.data.mensaje === 'Usuario registrado') {
        setUsuarioRegistrado(true); // Establece el estado a verdadero si el usuario está registrado
      } else if (response.data.mensaje === 'Usuario no encontrado') {
        setUsuarioRegistrado(false); // Establece el estado a falso si el usuario no está registrado
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Usuario no encontrado');
    }

    // Limpia los campos después de enviar el formulario
    setCorreo('');
    setContrasena('');
  };

  return (
    <div>
      <h1>Ingreso usuarios</h1>
      <form onSubmit={handleIngreso}>
        <div>
          <label>
            Correo:
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Contraseña:
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Ingresar</button>
      </form>
      {usuarioRegistrado && <div>¡Bienvenido! Has ingresado exitosamente.</div>}
      {!usuarioRegistrado && <div>Usuario no encontrado. Por favor, regístrate.</div>}

    </div>
  );
}

export default IngresoForm;
