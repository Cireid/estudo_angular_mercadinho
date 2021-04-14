import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  model:any;
  modelid:any;
  form:FormGroup;

  constructor(
    private service: ProdutoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome_produto: this.fb.control('', [Validators.required]),
      descricao_produto: this.fb.control('', [Validators.required]),
      valor_produto: this.fb.control('', [Validators.required]),
      quantidade_produto: this.fb.control('', [Validators.required],)
    });
    this.listar()
  }


  listar(){
    this.service.getProduto()
    .then(response => this.model = response)
    .catch(error => console.log(error))
  }


  salvar(){
    if(this.form.invalid){
      Swal.fire({
        icon:'error',
        title:'Ops...',
        width:1500,
        text:'Dados inseridos são invalidos',
        showConfirmButton:false,
        timer:1500
      });
      this.form.reset()
      return;
    }
    this.service.createProduto(this.form.value)
    .then(() => {
      Swal.fire({
        icon:'success',
        title:'Item salvo com sucesso',
        width:600,
        background:'white',
        backdrop:`rgba(0,0,123,0.4)
        url("/assets/img/gif.gif")
        top center
        no-repeat`
      })
      this.listar()
      this.form.reset()
    })
    .catch(error => Swal.fire({
      icon:'error',
      title:error.error.status,
      text:error.error.error
    }))
  }

  update(){
      this.service.updateProduto(this.modelid, this.form.value)
      .then(() => {
        Swal.fire({
          icon:'success',
          title:'Item alterado com sucesso',
        })
        this.listar()
        this.form.reset()
      })
      .catch(error => Swal.fire({
        icon:'error',
        title:error.error.status,
        text:error.error.error,
      }))
    }

  delete(id){
    Swal.fire({
      icon:'question',
      title:'Quer mesmo apagar isso?',
      text:'Você não sera capaz de reverter isso!!',
      showCancelButton:true,
      confirmButtonColor:'red',
      cancelButtonColor:'green',
      confirmButtonText:'Apagar',
      cancelButtonText:'Voltar'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this.service.deleteProduto(id)
        .then(() => {
          Swal.fire({
            icon:'success',
            title:'Sucesso',
            text:'Usuario apagado com sucesso',
            timer:1200,
            showConfirmButton:false,
          })
          this.listar()
        })
        .catch(error => Swal.fire({
          icon:'error',
          title:error.error.status,
          text:error.error.error,
        }))
        return;
      }
      this.listar()
    })
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

  filtro(params){
      const arr = []
      if(!params){
        this.listar()
        return
      }
      this.model.filter((nome) => {
        if(nome.nome_produto.includes(params)){
          arr.push(nome)
        }
      })
      this.model = arr;
    }

  }


