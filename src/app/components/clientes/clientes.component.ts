import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  registros = null;

  cliente = {
    dui: null,
    nombres: null,
    apellidos: null
  }

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
          this.agregarRegistrosPantalla();
          resolve();
        }
      )
    });

    return promise;
  }

  // Esta funcion permite activar cualquier alerta que sea contenida por un elemento con el id
  activarAlerta(id:string) {
    let alerta:HTMLElement = document.querySelector(id + ' .alert');
    alerta.classList.add('active');

    setTimeout(() => {
      alerta.classList.remove('active');
    }, 2000);
  }

  agregarRegistrosPantalla() {
    const tablaClientes = document.querySelector('#tablaClientes tbody'),
          cantRegistros:number = this.registros.length;

    tablaClientes.innerHTML = '';

    for(let i = 0; i < cantRegistros; i++) {

      // Creamos el card que representara al registro de cliente agregado
      let registro = document.createElement('tr');

      //Lo rellenamos con los elementos que acabamos de agregar y lo insertamos en la pagina
      registro.innerHTML = `
        <th scope="row">${this.registros[i].duiCliente}</th>
        <td>${this.registros[i].nombresCliente}</td>
        <td>${this.registros[i].apellidosCliente}</td>
      `;

      tablaClientes.appendChild(registro);
    }
  }

}
