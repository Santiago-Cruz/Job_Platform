import axios from 'axios';
import  { useState } from 'react';


function RegistroForm() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    confirmacion: '',
  });

  console.log(usuario);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si la contraseña y la confirmación coinciden
    if (usuario.contrasena !== usuario.confirmacion) {
      alert('La contraseña y la confirmación de contraseña no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });
    
      
      const data = await response.json();
    
      if (data.mensaje === 'Usuario registrado exitosamente') {
        alert('Usuario registrado correctamente');
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    

    // Limpia los campos después de enviar el formulario
    setUsuario({
      nombre: '',
      correo: '',
      contrasena: '',
      confirmacion: '',
    });
  };

  return (
    <div>
      <h1>Formulario de registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={usuario.correo}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Contraseña:
            <input
              type="password"
              name="contrasena"
              value={usuario.contrasena}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Confirmar contraseña:
            <input
              type="password"
              name="confirmacion" 
              value={usuario.confirmacion}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegistroForm;
