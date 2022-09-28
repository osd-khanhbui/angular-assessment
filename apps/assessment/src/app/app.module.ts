import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { FormQuestionBuilderDialogComponent } from './components/form-question-builder-dialog/form-question-builder-dialog.component';
import { FormAnswersComponent } from './routes/form-answers/form-answers.component';
import { FormBuilderComponent } from './routes/form-builder/form-builder.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, FormBuilderComponent, FormAnswersComponent, FormQuestionBuilderDialogComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
