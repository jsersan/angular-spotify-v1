import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artistas: any[] = [];

  urlSpotify ='https://api.spotify.com/v1/';

  constructor(public http: HttpClient) {
    console.log('Servicio Spotify listo');
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'authorization':'Bearer BQDwydsPB3iIAMzZ4XdWOL1VbzSCwZ4qaa_uplo6DiUQNPyyUtcYHV3EMVoksOWgDLfbUt-QNeumtkz3Qu0'
    });

    return headers;
  }

  getTop(id:string) {
    const url = `${ this.urlSpotify }artists/${ id }/top-tracks?country=US`;

    const headers = this.getHeaders();

    return this.http.get(url, {headers})
  }

  getArtista(id:string) {

    const url = `${ this.urlSpotify }artists/${ id }`;

    const headers = this.getHeaders();

    return this.http.get(url, {headers})
          // .map((resp:any) =>{
          //     this.artistas = resp.artists.items;
          //     return this.artistas;
          // });
  }

  getArtistas(termino: string) {

      const url = `${this.urlSpotify}search?query=${termino}&type=artist&limit=20`;

      // Debemos modificar los headers para evitar el error 501

      const headers = this.getHeaders();

      return this.http.get(url, {headers})
            .map((resp:any) =>{
              this.artistas = resp.artists.items;
              return this.artistas;
            });
      }
}
