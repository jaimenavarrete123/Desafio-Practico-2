import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  // url = 'https://lab-dps-jaimenavarrete.000webhostapp.com/DesafioPractico2/tickets/';
  url = 'http://localhost:8080/desafio-practico-2-dps/desafiopractico2/src/API/tickets/';

  constructor(private http: HttpClient) { }

  obtenerTickets() {
    return this.http.get(`${this.url}obtenerTickets.php`);
  }

  registrarTicket(ticket) {
    return this.http.post(`${this.url}registrarTicket.php`, JSON.stringify(ticket));
  }

  eliminarTicket(id:number) {
    return this.http.get(`${this.url}eliminarTicket.php?codigoTicket=${id}`);
  }

  seleccionarTicket(id:number) {
    return this.http.get(`${this.url}seleccionarTicket.php?codigoTicket=${id}`);
  }

  modificarTicket(ticket) {
    return this.http.post(`${this.url}modificarTicket.php`, JSON.stringify(ticket));
  }
}
