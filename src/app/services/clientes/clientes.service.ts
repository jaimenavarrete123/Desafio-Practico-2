import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // url = 'https://lab-dps-jaimenavarrete.000webhostapp.com/DesafioPractico2/clientes/';
  url = 'http://localhost:8080/desafio-practico-2-dps/desafiopractico2/src/API/clientes/';

  constructor(private http: HttpClient) { }

  obtenerClientes() {
    return this.http.get(`${this.url}obtenerClientes.php`);
  }

  registrarCliente(cliente) {
    return this.http.post(`${this.url}registrarCliente.php`, JSON.stringify(cliente));
  }

  eliminarCliente(id:string) {
    return this.http.get(`${this.url}eliminarCliente.php?duiCliente=${id}`);
  }

  seleccionarCliente(id:string) {
    return this.http.get(`${this.url}seleccionarCliente.php?duiCliente=${id}`);
  }

  modificarCliente(cliente) {
    return this.http.post(`${this.url}modificarCliente.php`, JSON.stringify(cliente));
  }
}
