import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import { Paciente } from '../Interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private endpoint: string = environment.endPoint;
  private apirUrl: string = this.endpoint + "paciente/";

  constructor(private http: HttpClient) { }

  getList(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apirUrl}lista`);
  }

  add(modelo: Paciente): Observable<Paciente>{
    return this.http.post<Paciente>(`${this.apirUrl}guardar`, modelo);
  }

  update(idPaciente: number, modelo: Paciente): Observable<Paciente>{
    return this.http.put<Paciente>(`${this.apirUrl}actualizar/${idPaciente}`, modelo);
  }

  delete(idPaciente: number): Observable<void>{
    return this.http.delete<void>(`${this.apirUrl}eliminar/${idPaciente}`);
  }

}
