import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { AuthGuard } from '../guards/auth.guard';





const routes: Routes = [
{ path: '', component: StudentComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class StudentRoutingModule {}