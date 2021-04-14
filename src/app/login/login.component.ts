import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome_usuario: this.fb.control(''),
      email_usuario: this.fb.control('', Validators.required),
      senha_usuario: this.fb.control('', [Validators.required, Validators.min(6)]),
      repetir_senha: this.fb.control('')
    });
  }


  registrar(){
    this.form.get('nome_usuario').setValidators(Validators.required);
    this.form.get('repetir_senha').setValidators(Validators.required)
    if(this.form.invalid){
      console.log('Dados invalidos');
      return;
    }
    if(this.form.value.senha_usuario !== this.form.value.repetir_senha){
      Swal.fire({
        title: 'Senhas não compativeis',
        width: 600,
        padding: '3em',
        background: 'white',
        backdrop: `rgba(0,0,123,0.4)
        url("/assets/img/gif.gif")
        top center
        no-repeat`
      })
      return
    }
    this.auth.registrar(this.form.value).then((resposta: any) => { 
      if(resposta.data.tipo_usuario === 'admin'){
        return this.router.navigate(['/admin/usuario'])
      }
      return this.router.navigate([''])
    })
    .catch(error => {
      console.log(error)
    })
  }

  entrar(){
    if(this.form.invalid){
      console.log('Dados invalidos');
      return;
    }

    this.auth.entrar(this.form.value).then((resposta:any) => {
      if(resposta.Resultado.tipo_usuario === 'admin'){
        return  this.router.navigate(['/admin/usuario'])
      }
      return this.router.navigate([''])
    }).catch(error => {
      console.log(error)
    })
  }

}
