import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket/ticket.service';
import { ServiciosService } from '../../services/servicios/servicios.service';
import Swal from 'sweetalert2';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registros = null;
  servicios = null;

  ticket = {
    codigoTicket: null,
    dui: null,
    vehiculo: null,
    servicio: null
  }

  constructor(private ticketServicio: TicketService, private servicioServicio: ServiciosService) { }

  ngOnInit() {
    this.obtenerTickets();

    this.obtenerServicios();
  }

  obtenerTickets() {
    let promise = new Promise((resolve, reject) => {
      this.ticketServicio.obtenerTickets().toPromise().then(
        datos => {
          this.registros = null;
          this.registros = datos;

          for(let i = 0; i < this.registros.length; i++) {

            let comprobarVisitas:Array<Object> = this.registros.filter((cliente, index) => cliente.dui == this.registros[i].dui && index <= i),
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

            // Asignar valores

            this.registros[i].cantVisitas = cantVisitas;
            this.registros[i].porcDescuento = porcDescuento;
            this.registros[i].descuento = descuento;
            this.registros[i].costoTotal = costoTotal;
          }

          resolve();
        }
      )
    });

    return promise;
  }

  obtenerServicios() {
    let promise = new Promise((resolve, reject) => {
      this.servicioServicio.obtenerServicios().toPromise().then(
        datos => {
          this.servicios = null;
          this.servicios = datos;

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
          this.obtenerTickets();

          Swal.fire(
            'Resultado de la consulta',
            datos['mensaje'],
            'success'
          )
        }
        else {
          Swal.fire(
            'Error!',
            'Hubo problemas al crear el ticket, posiblemente el dui del cliente no esta registrado.',
            'error'
          )
        }

        this.ticket = {codigoTicket:null , dui: null, vehiculo: null, servicio: null};
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

  modificarTicket() {
    let dui = document.getElementById('dui') as HTMLInputElement,
        vehiculo = document.getElementById('vehiculo') as HTMLInputElement,
        servicio = document.getElementById('servicio') as HTMLInputElement;

    if(dui.value != '' && vehiculo.value != '' && servicio.value != '0') {
      this.ticket.dui = dui.value;
      this.ticket.vehiculo = vehiculo.value;
      this.ticket.servicio = servicio.value;

      this.ticketServicio.modificarTicket(this.ticket).subscribe(datos => {
        if(datos['resultado'] == 'OK') {

          this.obtenerTickets();

          Swal.fire(
            'Resultado de la consulta',
            datos['mensaje'],
            'success'
          )

          this.ticket = { codigoTicket:null , dui: null, vehiculo: null, servicio: null };

          dui.value = '';
          vehiculo.value = '';
          servicio.value = '0';
        }
        else {
          Swal.fire(
            'Error!',
            'Hubo problemas al modificar el ticket, posiblemente el dui del cliente no esta registrado.',
            'error'
          )
        }
      });
    }
  }

  eliminarTicket(codigoTicket) {
    Swal.fire({
      title: 'Está seguro de eliminar el ticket?',
      text: "No podrá revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketServicio.eliminarTicket(codigoTicket).subscribe(datos => {
          if(datos['resultado'] == 'OK') {
            this.obtenerTickets();

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

  seleccionarTicket(codigoTicket) {
    let dui = document.getElementById('dui') as HTMLInputElement,
        vehiculo = document.getElementById('vehiculo') as HTMLInputElement,
        servicio = document.getElementById('servicio') as HTMLInputElement;

    let promise = new Promise((resolve, reject) => {
      this.ticketServicio.seleccionarTicket(codigoTicket).toPromise().then(
        datos => {
          this.ticket.codigoTicket = datos[0].codigoTicket;
          this.ticket.dui = datos[0].dui;
          this.ticket.vehiculo = datos[0].vehiculo;
          this.ticket.servicio = datos[0].servicio;

          dui.value = this.ticket.dui;
          vehiculo.value = this.ticket.vehiculo;
          servicio.value = this.ticket.servicio;

          resolve();
        }
      )
    });

    return promise;
  }

  descargarTicket(codigoTicket) {
    Swal.fire({
      title: '¿Desea descargar este ticket de servicio?',
      text: 'Elija el tipo de archivo en el que desea descargar su ticket',
      icon: 'question',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Descargar PDF`,
      denyButtonText: `Descargar TXT`,
      cancelButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.descargarTicketPDF(codigoTicket);
      } else if (result.isDenied) {
        this.descargarTicketTXT(codigoTicket);
      }
    })
  }

  descargarTicketPDF(codigoTicket) {
    const elemento = document.getElementById(codigoTicket);

    html2pdf().set({
      filename: 'ticket ' + codigoTicket,
      html2canvas: {
        scale: 3,
        letterRendering: true,
      },
      jsPDF: {
        orientation: 'landscape'
      }
    })
      .from(elemento)
      .save()
      .catch(err => {
        Swal.fire(
          'Resultado de la descarga',
          'Hubo problemas al descargar el ticket: ' + err,
          'error'
        )
      })
  }

  descargarTicketTXT(codigoTicket:string) {
    let indice,
        registro = this.registros.filter((ticket, index) => {
          if(ticket.codigoTicket == codigoTicket) {
            indice = index + 1;

            return ticket;
          }
        });

    console.log(registro);

    var blob = new Blob([`
    REGISTRO DE VISITA ${indice}
    Servicio: ${registro[0].nombreServicio}

    DUI: ${registro[0].dui}
    Cliente: ${registro[0].nombresCliente} ${registro[0].apellidosCliente}

    Vehiculo: ${registro[0].vehiculo}
    Costo del servicio: $${registro[0].costoServicio}

    Numero de visitas: ${registro[0].cantVisitas}
    Porcentaje de descuento: ${registro[0].porcDescuento*100}%
    Descuento: $${registro[0].descuento}

    COSTO TOTAL: $${registro[0].costoTotal}
    `],
    {type: "text/plain; charset=utf8"});

    saveAs(blob, `ticket_${indice}_${registro[0].nombresCliente}${registro[0].apellidosCliente}.txt`);
  }

  title = 'Desafio Practico 2 - Jaime Navarrete';
}
