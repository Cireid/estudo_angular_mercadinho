import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  model:any;
  modelid:any;
  form:FormGroup;

  constructor(
    private service: ProdutoService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome_produto: this.fb.control('', [Validators.required]),
      descricao_produto: this.fb.control('', [Validators.required]),
      valor_produto: this.fb.control('', [Validators.required]),
      quantidade_produto: this.fb.control('', [Validators.required]),
    });
    this.listar();
  }

  listar(){
    this.service.getProduto()
    .then(response => this.model = response)
    .catch(error => console.log(error));
  }

  salvar(){
    if(this.form.invalid){
      console.log(this.form.value)
      return;
    }
    this.service.createProduto(this.form.value)
    .then(() => {
      this.listar();
      this.form.reset();
    })
    .catch(error => console.log(this.form.value));
  }

  update(){
    this.service.updateProduto(this.modelid, this.form.value)
    .then(() => {
      this.listar();
      this.form.reset();
    })
    .catch(error => console.log(error))
  }

  delete(id){
    this.service.deleteProduto(id)
    .then(() => this.listar())
    .catch(error => console.log(error))
  }

  preencherForm(data){
    this.modelid = data.id
    this.form.setValue({
      nome_produto: data.nome_produto,
      descricao_produto: data.descricao_produto,
      valor_produto: data.valor_produto,
      quantidade_produto: data.quantidade_produto,
    })
  }
}


