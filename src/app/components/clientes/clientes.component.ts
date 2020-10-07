import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  registros = null;

  cliente = {
    duiCliente: null,
    nombres: null,
    apellidos: null
  }

  registrosBusqueda = null;
  busqueda = false;

  constructor(private clienteServicio: ClientesService) { }

  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes() {
    let promise = new Promise((resolve, reject) => {
      this.clienteServicio.obtenerClientes().toPromise().then(
        datos => {
          this.registros = null;
          this.registros = datos;

          resolve();
        }
      )
    });

    return promise;
  }

  registrarCliente() {
    let dui = document.getElementById('dui') as HTMLInputElement,
        nombres = document.getElementById('nombres') as HTMLInputElement,
        apellidos = document.getElementById('apellidos') as HTMLInputElement;

    if(dui.value != '' && nombres.value != '' && apellidos.value != '') {
      this.cliente.duiCliente = dui.value;
      this.cliente.nombres = nombres.value;
      this.cliente.apellidos = apellidos.value;

      this.clienteServicio.registrarCliente(this.cliente).subscribe(datos => {
        if(datos['resultado'] == 'OK') {

          this.obtenerClientes();

          Swal.fire(
            'Resultado de la consulta',
            datos['mensaje'],
            'success'
          )

          this.cliente = { duiCliente:null, nombres: null, apellidos: null };
        }
      });
    }
    else {
      Swal.fire(
        "Error",
        "Debe rellenar todos los campos",
        'error'
      )
    }
  }

  modificarCliente() {
    let dui = document.getElementById('dui') as HTMLInputElement,
        nombres = document.getElementById('nombres') as HTMLInputElement,
        apellidos = document.getElementById('apellidos') as HTMLInputElement;

    if(nombres.value != '' && apellidos.value != '') {
      this.cliente.nombres = nombres.value;
      this.cliente.apellidos = apellidos.value;

      this.clienteServicio.modificarCliente(this.cliente).subscribe(datos => {
        if(datos['resultado'] == 'OK') {

          this.obtenerClientes();

          Swal.fire(
            'Resultado de la consulta',
            datos['mensaje'],
            'success'
          )

          this.cliente = { duiCliente:null, nombres: null, apellidos: null };

          dui.disabled = false;
          dui.value = '';
          nombres.value = '';
          apellidos.value = '';
        }
        else {
          Swal.fire(
            'Error!',
            'Hubo problemas al modificar el cliente.',
            'error'
          )
        }
      });
    }
  }

  eliminarCliente(duiCliente) {
    Swal.fire({
      title: 'Está seguro de eliminar al cliente?',
      text: "Perderá todos los tickets que haya tenido este cliente. No podrá revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServicio.eliminarCliente(duiCliente).subscribe(datos => {
          if(datos['resultado'] == 'OK') {

            this.obtenerClientes();

            Swal.fire(
              'Resultado de la consulta',
              datos['mensaje'],
              'success'
            )
          }
        });
      }
    })
  }

  seleccionarCliente(duiCliente) {
    let dui = document.getElementById('dui') as HTMLInputElement,
        nombres = document.getElementById('nombres') as HTMLInputElement,
        apellidos = document.getElementById('apellidos') as HTMLInputElement;

    let promise = new Promise((resolve, reject) => {
      this.clienteServicio.seleccionarCliente(duiCliente).toPromise().then(
        datos => {
          this.cliente.duiCliente = datos[0].duiCliente;
          this.cliente.nombres = datos[0].nombresCliente;
          this.cliente.apellidos = datos[0].apellidosCliente;

          dui.disabled = true;
          dui.value = this.cliente.duiCliente;
          nombres.value = this.cliente.nombres;
          apellidos.value = this.cliente.apellidos;

          resolve();
        }
      )
    });

    return promise;
  }

  realizarBusqueda() {
    let texto = document.getElementById('textoBusqueda') as HTMLInputElement,
        tipo = document.getElementById('tipoBusqueda') as HTMLInputElement;

    if(texto.value != '' && parseInt(tipo.value, 10) != 0 && tipo.value != '') {
      let registrosValidos = null,
          textoMin = texto.value.toLowerCase();

      switch(parseInt(tipo.value, 10)) {
        case 1:
          registrosValidos = this.registros.filter(ticket => ticket.duiCliente == texto.value);
          break;
        case 2:
          registrosValidos = this.registros.filter(ticket => ticket.nombresCliente.toLowerCase().includes(textoMin));
          break;
        case 3:
          registrosValidos = this.registros.filter(ticket => ticket.apellidosCliente.toLowerCase().includes(textoMin));
          break;
      }

      this.registrosBusqueda = null;
      this.registrosBusqueda = registrosValidos;

      this.busqueda = true;
    }
    else {
      this.registrosBusqueda = null;
      this.busqueda = false;
    }
  }

  limpiarBusqueda() {
    let texto = document.getElementById('textoBusqueda') as HTMLInputElement,
        tipo = document.getElementById('tipoBusqueda') as HTMLInputElement;

    this.registrosBusqueda = null;
    this.busqueda = false;

    texto.value = '';
    tipo.value = '0';
  }
}
