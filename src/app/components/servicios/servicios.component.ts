import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Esta funcion permite activar cualquier alerta que sea contenida por un elemento con el id
  activarAlerta(id:string) {
    let alerta:HTMLElement = document.querySelector(id + ' .alert');
    alerta.classList.add('active');

    setTimeout(() => {
      alerta.classList.remove('active');
    }, 2000);
  }

}
