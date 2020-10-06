import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registros = null;

  ticket = {
    dui: null,
    vehiculo: null,
    servicio: null
  }

  constructor(private ticketServicio: TicketService) { }

  ngOnInit() {
    this.obtenerTickets();
  }

  obtenerTickets() {
    let promise = new Promise((resolve, reject) => {
      this.ticketServicio.obtenerTickets().toPromise().then(
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

  registrarTicket() {
    let dui = document.getElementById('dui') as HTMLInputElement,
        vehiculo = document.getElementById('vehiculo') as HTMLInputElement,
        servicio = document.getElementById('servicio') as HTMLInputElement;

    if(dui.value != '' && vehiculo.value != '' && servicio.value != '0') {
      this.ticket.dui = dui.value;
      this.ticket.vehiculo = vehiculo.value;
      this.ticket.servicio = servicio.value;

      this.ticketServicio.registrarTicket(this.ticket).subscribe(datos => {
        if(datos['resultado'] == 'OK') {
          this.agregarRegistrosPantalla();
          alert(datos['mensaje']);
          this.ticket = {dui: null, vehiculo: null, servicio: null};
        }
      });
    }
    else {
      alert("Debe rellenar todos los campos");
    }
  }

  modificarTicket() {
    let dui = document.getElementById('dui') as HTMLInputElement,
        vehiculo = document.getElementById('vehiculo') as HTMLInputElement,
        servicio = document.getElementById('servicio') as HTMLInputElement;

    if(dui.value != '' && vehiculo.value != '' && servicio.value != '') {
      this.ticket.dui = dui.value;
      this.ticket.vehiculo = vehiculo.value;
      this.ticket.servicio = servicio.value;

      this.ticketServicio.registrarTicket(this.ticket).subscribe(datos => {
        if(datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
          this.ticket = {dui: null, vehiculo: null, servicio: null};
        }
      });
    }
  }

  title = 'Desafio Practico 2 - Jaime Navarrete';

  // Esta funcion permite activar cualquier alerta que sea contenida por un elemento con el id
  activarAlerta(id:string) {
    let alerta:HTMLElement = document.querySelector(id + ' .alert');
    alerta.classList.add('active');

    setTimeout(() => {
      alerta.classList.remove('active');
    }, 2000);
  }

  // Mostrar los tickets en pantalla
  agregarRegistrosPantalla() {
    const listaRegistros:HTMLElement = document.getElementById('listaRegistros'),
          cantRegistros:number = this.registros.length;

    for(let i = 0; i < cantRegistros; i++) {
      // Comprobamos la cantidad de visitas que ha realizado el cliente
      let comprobarVisitas:Array<Object> = this.registros.filter(cliente => cliente.dui == this.registros[i].dui),
          cantVisitas:number = comprobarVisitas.length,
          porcDescuento:number,
          descuento:number,
          costoTotal:number;

      // En caso que aplique para un descuento, lo agregamos
      if(cantVisitas < 3) {
        porcDescuento = 0;
      }
      else if(cantVisitas <= 5) {
        porcDescuento = 0.05;
      }
      else {
        porcDescuento = 0.08;
      }

      descuento = parseFloat((parseFloat(this.registros[i].costoServicio.toString()) * porcDescuento).toFixed(2));
      costoTotal = parseFloat((parseFloat(this.registros[i].costoServicio.toString()) - descuento).toFixed(2));

      // Creamos el card que representara al registro de cliente agregado
      let registro = document.createElement('div');
      registro.classList.add('card', 'mb-4');

      //Lo rellenamos con los elementos que acabamos de agregar y lo insertamos en la pagina
      registro.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">Registro de visita ${cantRegistros}</h5>
          <h6 class="card-subtitle text-muted pb-3 mb-4">Reparación de vehículo</h6>

          <p class="card-text"><span><strong>Cliente</strong>: ${this.registros[i].nombresCliente} ${this.registros[i].apellidosCliente}</span><span><strong>DUI</strong>: ${this.registros[i].dui}</span></p>
          <p class="card-text"><span><strong>Vehículo</strong>: ${this.registros[i].vehiculo}</span></p>
          <p class="card-text"><span><strong>Costo de reparación</strong>: $${this.registros[i].costoServicio}</span><span><strong>N° de visitas</strong>: ${cantVisitas}</span><span><strong>Descuento (${porcDescuento*100}%)</strong>: $${descuento}</span></p>
          <p class="card-text costoTotal"><strong>COSTO TOTAL: <span>$${costoTotal}</span></strong></p>
        </div>
      `;

      listaRegistros.appendChild(registro);
    }
  }
}
