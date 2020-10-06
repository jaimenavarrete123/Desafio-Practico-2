import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios/servicios.service';

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
          this.agregarRegistrosPantalla();
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
      alert("Debe rellenar todos los campos");
    }
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
    const tablaServicios = document.querySelector('#tablaServicios tbody'),
          cantRegistros:number = this.registros.length;

    tablaServicios.innerHTML = '';

    for(let i = 0; i < cantRegistros; i++) {

      // Creamos el card que representara al registro de cliente agregado
      let registro = document.createElement('tr');

      //Lo rellenamos con los elementos que acabamos de agregar y lo insertamos en la pagina
      registro.innerHTML = `
        <th scope="row">${this.registros[i].codigoServicio}</th>
        <td>${this.registros[i].nombreServicio}</td>
        <td>$${this.registros[i].costoServicio}</td>
      `;

      tablaServicios.appendChild(registro);
    }
  }

}
