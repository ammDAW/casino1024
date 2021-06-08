import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BingoComponent } from './bingo/bingo.component';
import { HomeComponent } from './home/home.component';
import { UserGuardGuard } from './user-guard.guard';

const routes: Routes = [
  { path: 'home',
   component: HomeComponent
  },
  { 
    path: 'bingo', 
    component: BingoComponent,
    canActivate: [UserGuardGuard]
   },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
