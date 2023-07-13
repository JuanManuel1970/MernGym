import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Update = () => {
  const navigate = useNavigate();

  const DATOS = process.env.REACT_APP_DATOS;

  console.log(DATOS);

  const [id, setID] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setID(localStorage.getItem('ID'));
    setNombre(localStorage.getItem('Nombre'));
    setApellido(localStorage.getItem('Apellido'));
    setEmail(localStorage.getItem('Email'));
    setPassword(localStorage.getItem('Password'));
  }, []);

  const updateApiData = () => {
    console.log(`${DATOS}/${id}`);

    axios
      .put(`${DATOS}/${id}`, {
        nombre,
        apellido,
        email,
        password,
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Los datos han sido modificados exitosamente.',
        }).then(() => {
          navigate('/');
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al modificar los datos. Inténtalo nuevamente.',
        });
      });
  };

  return (
    <div className="container mt-5">
      <div className="text-center m-5">
        <h1>Formulario de Update</h1>
      </div>
      <Form className="create-form">
        <Form.Field>
          <label>Nombre: </label>
          <input
            className="form-control"
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Apellido: </label>
          <input
            className="form-control"
            type="text"
            name="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email: </label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password: </label>
          <input
            className="form-control"
            placeholder="Password de 6 a 10 caracteres"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <div className="text-center mt-4">
          <Button type="submit" className="btn btn-success" onClick={updateApiData}>
            Actualizar Datos
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Update;
