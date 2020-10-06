import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // url = 'https://lab-dps-jaimenavarrete.000webhostapp.com/DesafioPractico2/tickets/';
  url = 'http://localhost:8080/desafio-practico-2-dps/desafiopractico2/src/API/tickets/';

  constructor(private http: HttpClient) { }
}
