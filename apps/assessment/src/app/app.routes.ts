import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormAnswersComponent } from './routes/form-answers/form-answers.component';
import { FormBuilderComponent } from './routes/form-builder/form-builder.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'form/builder',
        component: FormBuilderComponent
      },
      {
        path: 'form/answers',
        component: FormAnswersComponent
      },
      {
        path: '**',
        redirectTo: 'form/builder',
        pathMatch: 'full'
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
