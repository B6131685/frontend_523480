import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ShowProductComponent } from './admin/show-product/show-product.component';
import { ModelProductsComponent } from './products/model-products/model-products.component';
import { LoginComponentsComponent } from './login-components/login-components.component';
import { SingupComponent } from './singup/singup.component';
const routes: Routes = [
  {path: 'addProduct', component: AddProductComponent},
  {path: 'showproduct', component: ShowProductComponent},
  {path: 'modelProduct', component: ModelProductsComponent},
  {path: 'login', component: LoginComponentsComponent},
  {path: 'singup', component: SingupComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
