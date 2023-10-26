
import { useState } from 'react';
import Axios from 'axios';


const RegistroForm = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmContrasena, setConfirmContrasena] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await Axios.post('http://localhost:3001/api/users/users', {
      nombre,
      correo,
      contrasena,
      confirmContrasena,
    });

     // Limpiar los campos después del registro exitoso
     setNombre('');
     setCorreo('');
     setContrasena('');
     setConfirmContrasena('');

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Correo:</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
      </div>
      <div>
        <label>Confirmar Contraseña:</label>
        <input type="password" value={confirmContrasena} onChange={(e) => setConfirmContrasena(e.target.value)} />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroForm;
