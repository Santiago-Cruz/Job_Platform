import { useState } from 'react';


function IngresoForm() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleIngreso = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/ingreso/verificar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo: correo,
          contrasena: contrasena
        })
      });

      const data = await response.json();

      if (data.mensaje === 'Usuario registrado') {
        alert('Usuario registrado');
      } else {
        alert('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error:', error);
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
    </div>
  );
}

export default IngresoForm;
