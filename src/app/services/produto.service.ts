import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  getProduto(){
    return this.http.get('http://192.168.1.7/api/produto/').toPromise();
  }

  createProduto(form){
    return this.http.post('http://192.168.1.7/api/produto/add', form).toPromise();
  }

  updateProduto(id, form){
    return this.http.put(`http://192.168.1.7/api/produto/update/${id}`, form).toPromise();
  }

  deleteProduto(id){
    return this.http.delete(`http://192.168.1.7/api/produto/delete/${id}`).toPromise();
  }

}
