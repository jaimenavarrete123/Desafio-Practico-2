import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  // url = 'https://lab-dps-jaimenavarrete.000webhostapp.com/DesafioPractico2/servicios/';
  url = 'http://localhost:8080/desafio-practico-2-dps/desafiopractico2/src/API/servicios/';

  constructor(private http: HttpClient) { }

  obtenerServicios() {
    return this.http.get(`${this.url}obtenerServicios.php`);
  }

  registrarServicio(servicio) {
    return this.http.post(`${this.url}registrarServicio.php`, JSON.stringify(servicio));
  }

  eliminarServicio(id:number) {
    return this.http.get(`${this.url}eliminarServicio.php?codigoServicio=${id}`);
  }

  seleccionarServicio(id:number) {
    return this.http.get(`${this.url}seleccionarServicio.php?codigoServicio=${id}`);
  }

  modificarServicio(servicio) {
    return this.http.post(`${this.url}modificarServicio.php`, JSON.stringify(servicio));
  }
}
