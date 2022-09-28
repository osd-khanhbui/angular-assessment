import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { QuestionModel, QuestionType } from '../../models/question.model';
import { FormUtils } from '../../ultils/form.utils';

@Component({
  selector: 'assessment-form-question-builder-dialog',
  templateUrl: './form-question-builder-dialog.component.html',
  styleUrls: ['./form-question-builder-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormQuestionBuilderDialogComponent {
  public questionTypes: string[] = [QuestionType.Paragraph, QuestionType.Checkbox];
  public addQuestionForm: FormGroup = new FormGroup({
    questionType: new FormControl(QuestionType.Paragraph),
    isRequired: new FormControl(true),
    questionTitle: new FormControl('', Validators.required),
    questionOptions: new FormArray([])
  });

  public get questionOptions(): FormArray {
    return this.addQuestionForm.controls['questionOptions'] as FormArray;
  }

  public get questionType(): string {
    return this.addQuestionForm.controls['questionType'].value;
  }

  constructor(public dialogRef: MatDialogRef<FormQuestionBuilderDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: QuestionModel) {
    this.addQuestionForm.controls['questionType'].valueChanges.subscribe((type: QuestionType) => {
      if (type === QuestionType.Paragraph) {
        if (this.questionOptions.length > 0) {
          this.addQuestionForm.controls['questionOptions'] = new FormArray([]);
        }
      }
    });
  }

  public addOption() {
    this.questionOptions.push(new FormControl('', Validators.required));
  }

  public getControls(value: AbstractControl): FormControl {
    return value as FormControl;
  }

  public submit(): void {
    if (FormUtils.validateForm(this.addQuestionForm)) {
      const question: QuestionModel = {
        title: this.addQuestionForm.getRawValue().questionTitle,
        type: this.addQuestionForm.getRawValue().questionType,
        isRequired: this.addQuestionForm.getRawValue().isRequired,
        options: this.addQuestionForm.getRawValue().questionOptions.map((value: string) => ({ title: value }))
      };

      if (question.type === QuestionType.Checkbox && question.options.length <= 0) {
        return;
      }

      this.dialogRef.close(question);
    }
  }
}
