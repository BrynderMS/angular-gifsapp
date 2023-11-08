import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = '1mHgBDyhNWCJ4pCpNizYT3Ym9BrSWGZ5';
  private urlGiphy: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];
  public resultados: Gif[]= [];

  get historial() {
    return [...this._historial];
  }

  constructor (private http: HttpClient){
    this.loadLocalStorage();
  }

  buscarGifs( query: string): void{
    if(!this.historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this.historial.splice(0,10);

      this.saveLocalStorage();

    }
    this.llamadaApi(query);
  }

  private saveLocalStorage(): void{
    localStorage.setItem('history',JSON.stringify(this._historial))
  }
  private loadLocalStorage(): void{
    if(!localStorage.getItem('history'))return;
    this._historial = JSON.parse(localStorage.getItem('history')!);
  }


  private llamadaApi(query: string): void{

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', query);

    const a = this.http.get<SearchGifsResponse>(`${this.urlGiphy}/search`, {params: params})
    .subscribe(resp => 
    {
      // console.log(resp.data);
      this.resultados = resp.data;
    });
    // console.log(a);
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=1mHgBDyhNWCJ4pCpNizYT3Ym9BrSWGZ5&q=dragon ball z&limit=20')
    // .then()
  }

}
