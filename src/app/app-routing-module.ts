import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViagemForm } from './viagem-form/viagem-form';

const routes: Routes = [
  { path: '', redirectTo: '/viagemForm', pathMatch: 'full'}, 
  {path: 'viagemForm', component: ViagemForm} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
