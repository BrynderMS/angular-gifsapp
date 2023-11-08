import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private GifsService: GifsService) {

  }
  
  buscar() :void {
    const valor: string = this.txtBuscar.nativeElement.value.trim().toLowerCase();
    if (valor.length > 0) {
      this.GifsService.buscarGifs(valor);
    }
    this.txtBuscar.nativeElement.value = '';
  }

}
