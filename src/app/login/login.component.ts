import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any;
  modelid:any
  form:FormGroup


  constructor(
    private service: UsuarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome_usuario: this.fb.control('', Validators.required),
      email_usuario: this.fb.control('', Validators.required),
      senha_usuario: this.fb.control('', Validators.required),
    });
    this.listar()
  }

  listar(){
    this.service.getUsuario()
    .then(response => this.model = response)
    .catch(error => console.log(error))
  }

  salvar(){
    if(this.form.valid){
      console.log(this.form.value)
      return;
    }
    this.service.createUsuario(this.form.value)
    .then(() => {
      this.listar();
      this.form.reset();
    })
    .catch(error => console.log(error))
  }

  update(){
    this.service.updateUsuario(this.modelid, this.form.value)
    .then(() => {
      this.listar();
      this.form.reset();
    })
    .catch(error => console.log(error))
  }

  delete(id){
    this.service.deleteUsuario(id)
    .then(() => this.listar())
    .catch(error => console.log(error))
  }
  
  


}
