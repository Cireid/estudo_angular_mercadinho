import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


  getUsuario(){
    return this.http.get('http://192.168.1.4/api/usuario').toPromise();
  }

  createUsuario(form){
    return  this.http.post(`http://192.168.1.4/api/usuario`, form).toPromise();
  }

  updateUsuario(id, form){
    return this.http.put(`http://192.168.1.4/api/usuario/${id}`, JSON.stringify(form)).toPromise();
  }

  deleteUsuario(id){
    return this.http.delete(`http://192.168.1.4/api/usuario/${id}`).toPromise();
  }

}



