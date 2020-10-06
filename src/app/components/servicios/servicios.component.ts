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
    nombre: null,
    costo: null
  }

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

    if(nombre.value != '' && costo.value != '') {
      this.servicio.nombre = nombre.value;
      this.servicio.costo = costo.value;

      this.servicioServicio.registrarServicio(this.servicio).subscribe(datos => {
        if(datos['resultado'] == 'OK') {
          this.obtenerServicios();
          alert(datos['mensaje']);
          this.servicio = {nombre: null, costo: null};
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
}
