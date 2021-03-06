import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './adm/index/index.component';
import { ProdutoComponent } from './adm/produto/produto.component';
import { UsuarioComponent } from './adm/usuario/usuario.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'produto', component:ProductsComponent},
  {path: 'carrinho', component:CartComponent},
  {path: 'admin', component:IndexComponent, children:[
    {path: 'usuario', component: UsuarioComponent},
    {path: 'produto', component: ProdutoComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
