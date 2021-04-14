import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpCliente: HttpClient
  ) { }

  entrar(formulario: any){
    return this.httpCliente.post(`http://192.168.1.7/api/entrar`, formulario).toPromise();
  }

  registrar(formulario: any){
    return this.httpCliente.post(`http://192.168.1.7/api/usuario`, formulario).toPromise();
  }
}
