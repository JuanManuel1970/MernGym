import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EdicionFormulario = () => {
  const navigate = useNavigate();

  const DATOS = process.env.REACT_APP_DATOS;

  console.log(DATOS);

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios.get(DATOS).then((res) => {
      console.log(res.data);
      setApiData(res.data.personas);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pasar los datos para update mediante el localstorage
  const setData = (data) => {
    let { _id, nombre, apellido, email, password } = data;
    localStorage.setItem('ID', _id);
    localStorage.setItem('Nombre', nombre);
    localStorage.setItem('Apellido', apellido);
    localStorage.setItem('Email', email);
    localStorage.setItem('Password', password);
  };

  const getData = () => {
    axios.get(DATOS).then((res) => {
      console.log(res.data);
      setApiData(res.data.personas);
    });
  };

  const onDelete = (id) => {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('1. Estamos en el onDelete');

        axios.delete(`${DATOS}/${id}`).then(() => {
          getData();
          console.log('2. Respondemos Promesa');
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El registro ha sido eliminado exitosamente.',
          }).then(() => {
            navigate('/');
          });
        });

        console.log(`La ruta es: ${DATOS}/${id}`);
        //console.log(`${id} - Eliminado`)
        console.log('3. Salimos del deletes');
      }
    });
  };

  console.log(apiData);

  return (
    <div className="container m-5">
      <div className="text-center m-5">
        <h1>Listado de Clientes registrados</h1>
      </div>

      {/* tabla para mostrar a los clientes */}

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Apellido</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {apiData.map((data) => {
            return (
              <Table.Row key={data._id}>
                <Table.Cell>{data.nombre}</Table.Cell>
                <Table.Cell>{data.apellido}</Table.Cell>
                <Table.Cell>{data.email}</Table.Cell>
                <Table.Cell>
                  <Link to="/update">
                    <Button
                      className="btn btn-success"
                      onClick={() => {
                        setData(data);
                        console.log('Dato actualizado');
                      }}
                    >
                      Update
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className="btn btn-danger"
                    onClick={() => onDelete(data._id)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default EdicionFormulario;
