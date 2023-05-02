import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import { TipoIdentificacion } from '../Interfaces/tipo-identificacion';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  private endpoint: string = environment.endPoint;
  private apirUrl: string = this.endpoint + "tipoidentificacion/";

  constructor(private http: HttpClient) { }

  getList(): Observable<TipoIdentificacion[]> {
    return this.http.get<TipoIdentificacion[]>(`${this.apirUrl}lista`);
  }

}
