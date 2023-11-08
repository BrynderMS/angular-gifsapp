import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html'
})
export class CardsComponent {

  get resultados() {
    return this.GifsService.resultados;
  }
  
  constructor( private GifsService: GifsService){

  }

}
