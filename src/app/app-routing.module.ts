import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeComponent } from './Pages/data-enrich/de.component';
import { ProjectsComponent } from './Pages/projects/projects.component';

const routes: Routes = [
  {
    path:'projects',
    component:ProjectsComponent
  },
  {
    path:'de',
    component:DeComponent
  },
  {
    path:'**',
    redirectTo:'projects'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
