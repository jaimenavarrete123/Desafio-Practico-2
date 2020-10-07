import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  registros = null;

  servicio = {
    codigoServicio: null,
    nombre: null,
    costo: null
  }

  registrosBusqueda = null;
  busqueda = false;

  constructor(private servicioServicio: ServiciosService) { }

  ngOnInit() {
    this.obtenerServicios();
  }

  obtenerServicios() {
    let promise = new Promise((resolve, reject) => {
      this.servicioServicio.obtenerServicios().toPromise().then(
        datos => {
          this.registros = null;
          this.registros = datos;

          resolve();
        }
      )
    });

    return promise;
  }

  registrarServicio() {
    let nombre = document.getElementById('nombre') as HTMLInputElement,
        costo = document.getElementById('costo') as HTMLInputElement;

    if(nombre.value != '' && costo.value != '' && costo.value != '0') {
      this.servicio.nombre = nombre.value;
      this.servicio.costo = costo.value;

      this.servicioServicio.registrarServicio(this.servicio).subscribe(datos => {
        if(datos['resultado'] == 'OK') {

          this.obtenerServicios();

          Swal.fire(
            'Resultado de la consulta',
            datos['mensaje'],
            'success'
          )

          this.servicio = { codigoServicio:null, nombre: null, costo: null };
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

  modificarServicio() {
    let nombre = document.getElementById('nombre') as HTMLInputElement,
        costo = document.getElementById('costo') as HTMLInputElement;

    if(nombre.value != '' && costo.value != '0' && costo.value != '') {
      this.servicio.nombre = nombre.value;
      this.servicio.costo = costo.value;

      this.servicioServicio.modificarServicio(this.servicio).subscribe(datos => {
        if(datos['resultado'] == 'OK') {

          this.obtenerServicios();

          Swal.fire(
            'Resultado de la consulta',
            datos['mensaje'],
            'success'
          )

          this.servicio = { codigoServicio:null , nombre: null, costo: null };

          nombre.value = '';
          costo.value = '0';
        }
        else {
          Swal.fire(
            'Error!',
            'Hubo problemas al modificar el servicio.',
            'error'
          )
        }
      });
    }
  }

  eliminarServicio(codigoServicio) {
    Swal.fire({
      title: 'Está seguro de eliminar el servicio?',
      text: "Perderá todos los tickets con este servicio. No podrá revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioServicio.eliminarServicio(codigoServicio).subscribe(datos => {
          if(datos['resultado'] == 'OK') {

            this.obtenerServicios();

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

  seleccionarServicio(codigoServicio) {
    let nombre = document.getElementById('nombre') as HTMLInputElement,
        costo = document.getElementById('costo') as HTMLInputElement;

    let promise = new Promise((resolve, reject) => {
      this.servicioServicio.seleccionarServicio(codigoServicio).toPromise().then(
        datos => {
          this.servicio.codigoServicio = datos[0].codigoServicio;
          this.servicio.nombre = datos[0].nombreServicio;
          this.servicio.costo = datos[0].costoServicio;

          nombre.value = this.servicio.nombre;
          costo.value = this.servicio.costo;

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
          registrosValidos = this.registros.filter(ticket => ticket.codigoServicio == texto.value);
          break;
        case 2:
          registrosValidos = this.registros.filter(ticket => ticket.nombreServicio.toLowerCase().includes(textoMin));
          break;
        case 3:
          registrosValidos = this.registros.filter(ticket => ticket.costoServicio == texto.value);
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
