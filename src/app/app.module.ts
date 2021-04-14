import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { IndexComponent } from './adm/index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from './services/produto.service';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from "./adm/usuario/usuario.component";
import { ProdutoComponent } from './adm/produto/produto.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NavbarComponent,
    CartComponent,
    IndexComponent,
    LoginComponent,
    UsuarioComponent,
    ProdutoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    ProdutoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
