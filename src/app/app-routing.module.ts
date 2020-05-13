import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForexHomeComponent } from './forex-home/forex-home.component';


const routes: Routes = [

  { path: '', redirectTo: '/index', pathMatch: 'full' }, // for fast boot?
  { path: 'index', component: ForexHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
