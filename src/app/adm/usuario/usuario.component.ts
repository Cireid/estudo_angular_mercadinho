import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  model:any;
  modelid:any;
  form:FormGroup;

  constructor(
    private service: UsuarioService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome_usuario: this.fb.control('', [Validators.required]),
      email_usuario: this.fb.control('', [Validators.required]),
      senha_usuario: this.fb.control('',),
      tipo_usuario: this.fb.control('',)
    })
    this.listar();
  }

  listar(){
    this.service.getUsuario()
    .then(response => this.model = response)
    .catch(error => console.log(error))
  }

  salvar(){
    this.form.get("senha_usuario").setValidators([Validators.required]);
    if(this.form.invalid){
      Swal.fire({
        icon:'error',
        title:'Algo deu errado',
        text:'Dados inseridos invalidos'
      })
      return;
    }
    this.service.createUsuario(this.form.value)
    .then(() => {
      Swal.fire({
        icon:'success',
        title:'Sucesso',
        text:'Usuario criado com sucesso',
        showConfirmButton:false,
        timer:1500,
      })
      this.listar()
      this.form.reset()
    })
    .catch(error => Swal.fire({
      icon:'error',
      title:error.error.message,
      text:error.error.error,
      showConfirmButton:false,
      timer:1500,
    }))
  }

  update(){
    this.form.get('tipo_usuario').setValidators([Validators.required])
    this.service.updateUsuario(this.modelid, this.form.value)
    .then(() => {
      Swal.fire({
        icon:'success',
        title:'Sucesso',
        text:'Dados atualizados com sucesso',
        showConfirmButton:false,
        timer:1500
      })
      this.listar()
      this.form.reset()
    })
    .catch(error => Swal.fire({
      icon:'error',
      title:error.error.message,
      text:error.error.error,
    }))
  }

  delete(id){
    Swal.fire({
      icon:'question',
      title:'Você tem certeza?',
      text:'Você não será capaz de desfazer esta ação',
      showCancelButton:true,
      cancelButtonText:'Voltar',
      cancelButtonColor:'green',
      confirmButtonText:'Apagar',
      confirmButtonColor:'red'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this.service.deleteUsuario(id)    
        .then(() => {
          Swal.fire({
            icon:'success',
            title:'Sucesso',
            text:'Usuario apagado com sucesso',
            timer:1000,
            showConfirmButton:false
          })
          this.listar()
        })
        .catch(error => Swal.fire({
          icon:'error',
          title:error.error.messsage,
          text:error.error.error
        }))
      }
    })


  }

  preencherForm(data){
    this.modelid = data.id
    this.form.patchValue({
      nome_usuario: data.nome_usuario,
      email_usuario: data.email_usuario,
      tipo_usuario: data.tipo_usuario,
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
        arr.push(nome);
      }
    })
    this.model = arr
  }
}
