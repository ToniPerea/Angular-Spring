import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './cliente.json';
import { Observable, of, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import swal from 'sweetalert2';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);

    //return this.http.get<Cliente[]>(this.urlEndPoint);
    
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Cliente[])
    )
  }

  create(cliente: Cliente) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire("Error al crear cliente", e.error.mensaje, "error");
        return throwError(() => e);
      })
    )
  }

  // create(cliente: Cliente) : Observable<Cliente> {
  //   return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
  //     map((response: any) => response.cliente as Cliente),
  //     catchError(e => {
  //       console.log(e.error.mensaje);
  //       swal.fire("Error al crear cliente", e.error.mensaje, "error");
  //       return throwError(() => e);
  //     })
  //   )
  // }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire("Error al editar", e.error.mensaje, "error");
        return throwError(() => e);
      })
    )
  }

  update(cliente: Cliente) : Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire("Error al editar cliente", e.error.mensaje, "error");
        return throwError(() => e);
      })
    )
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire("Error al eliminar cliente", e.error.mensaje, "error");
        return throwError(() => e);
      })
    )
  }


}
