import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  getProduto(){
    return this.http.get('http://192.168.1.4/api/produto/').toPromise();
  }

  createProduto(form){
    console.log('service', form)
    return this.http.post('http://192.168.1.4/api/produto/add', form).toPromise();
  }

  updateProduto(form, id){
    return this.http.put(`http://192.168.1.4/api/produto/update/${id}`, JSON.stringify(form)).toPromise();
  }

  deleteProduto(id){
    console.log('service',id)
    return this.http.delete(`http://192.168.1.4/api/produto/delete/${id}`).toPromise();
  }

  // getDetails(id){
  //   return this.http.get(`http://192.168.1.4/api/produto/${id}`).toPromise();
  // }
}
