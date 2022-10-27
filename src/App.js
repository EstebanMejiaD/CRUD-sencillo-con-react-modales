import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, nombre: "Esteban", apellido: "Mejia" },
  { id: 2, nombre: "David", apellido: "Robles" },
  { id: 3, nombre: "Kevin", apellido: "Ramos" },
  { id: 4, nombre: "Cristiano", apellido: "Ronaldo" },
];

class App extends React.Component {
  state = {
    data: data,
    form:{
      id:'',
      nombre:'',
      apellido:''
    },
    modalInsertar: false,
    modalEditar: false,
  };

handleChange=e=> {
  this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value,

    }
  })
}

mostrarModalInsertar=()=> {
  this.setState({modalInsertar: true})
}
ocultarModalInsertar=()=> {
  this.setState({modalInsertar: false})
}

mostrarModalEditar=(registro)=> {
  this.setState({modalEditar: true, form: registro})
}
ocultarModalEditar=()=> {
  this.setState({modalEditar: false})
}

insertar=()=> {
  let valorNuevo={...this.state.form}
  valorNuevo.id=this.state.data.length+1
  let lista=this.state.data
  lista.push(valorNuevo)
  this.setState({data: lista, modalInsertar:false})
}


editar = (dato) => {
  var contador = 0;
  var arreglo = this.state.data;
  arreglo.map((registro) => {
    if (dato.id == registro.id) {
      arreglo[contador].nombre = dato.nombre;
      arreglo[contador].apellido = dato.apellido;
    }
    contador++;
  });
  this.setState({ data: arreglo, modalEditar: false });
};

eliminar=(dato)=> {
  let opcion=window.confirm('Realmente quiere eliminar el registro: '+ dato.id)
  if (opcion) {
    let contador=0
    let arreglo = this.state.data
    arreglo.map((registro)=> {
      if (registro.id==dato.id) {
        arreglo.splice(contador, 1)
      }
      contador++
    })
    this.setState({data:arreglo})
  }

}


  render() {
    return (
      <>
        <Container className="App-crud">
          <br />
          <h1>CRUD sencillo con modales de bootstrap</h1>
          <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo usuario</Button>
          <br /> <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((elemento)=> (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.apellido}</td>
                  <td>
                    <Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{'  '}
                  <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}

            </tbody>

          </Table>
        </Container>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
           <div><h3>Editar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellido}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>

            <Button
              color="danger"
              onClick={()=>this.ocultarModalEditar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
             onClick={()=>this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={()=>this.ocultarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

      </>
    );
  }
}

export default App;
