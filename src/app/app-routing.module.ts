import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForexUnitComponent } from './forex-unit/forex-unit.component';


const routes: Routes = [

  { path: '', redirectTo: '/index', pathMatch: 'full' }, // for fast boot?
  { path: 'index', component: ForexUnitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
