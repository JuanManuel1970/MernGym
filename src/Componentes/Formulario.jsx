import { Form, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Formulario = () => {
  const URL = process.env.REACT_APP_URL;
  const navigate = useNavigate();

  console.log(URL);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (datos, e) => {
    e.preventDefault();
    try {
      console.log(datos);
      await axios.post(URL, datos);
      e.target.reset();
      console.log(URL);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Los datos han sido enviados exitosamente.',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar los datos. Inténtalo nuevamente.',
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center m-5">
        <h1>Formulario de Registro</h1>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label>Nombre:</label>
          <input
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            placeholder="Nombre"
            type="text"
            name="nombre"
            {...register('nombre', {
              required: true,
              maxLength: 50
            })}
          />
          {errors.nombre && <p className="invalid-feedback">El nombre es obligatorio y con un máximo de 50 caracteres</p>}
        </Form.Field>

        <Form.Field>
          <label>Apellido:</label>
          <input
            className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
            placeholder="Apellido"
            type="text"
            name="apellido"
            {...register('apellido', {
              required: true,
              maxLength: 80
            })}
          />
          {errors.apellido && <p className="invalid-feedback">El apellido es obligatorio y con un máximo de 80 caracteres</p>}
        </Form.Field>

        <Form.Field>
          <label>Email:</label>
          <input
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
            type="email"
            name="email"
            {...register('email', {
              required: true,
              pattern: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
          />
          {errors.email && <p className="invalid-feedback">El email es obligatorio</p>}
        </Form.Field>

        <Form.Field>
          <label>Password:</label>
          <input
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password de 6 a 10 caracteres"
            type="password"
            name="password"
            {...register('password', {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/
            })}
          />
          {errors.password && <p className="invalid-feedback">El password debe contener minúsculas, mayúsculas y entre 6 y 10 caracteres</p>}
        </Form.Field>

        <div className="text-center mt-4">
          <Button.Group vertical>
            <Button type="submit" className="btn btn-success" style={{marginTop: '0'}}>Enviar Datos</Button>
            <Button.Or text="" />
            <Button type="button" onClick={() => reset()} className="btn btn-warning" style={{marginTop: '10px'}}>Limpiar Formulario</Button>
          </Button.Group>
        </div>
      </Form>
    </div>
  );
};

export default Formulario;
