import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FormQuestionBuilderDialogComponent } from '../../components/form-question-builder-dialog/form-question-builder-dialog.component';
import { QuestionModel } from '../../models/question.model';
import { FormService } from '../../services/form-builder.service';
import { FormUtils } from '../../ultils/form.utils';

@Component({
  selector: 'assessment-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderComponent implements OnInit {
  public questionForm: FormGroup = new FormGroup({
    questionAnswers: new FormArray([])
  });

  public get questionAnswer(): FormArray {
    return this.questionForm.controls['questionAnswers'] as FormArray;
  }

  constructor(public dialog: MatDialog, public formService: FormService, public route: Router) {}

  public ngOnInit(): void {
    const currentQuestions: QuestionModel[] = this.formService.questions$.getValue();
    if (currentQuestions && currentQuestions.length) {
      currentQuestions.forEach((q: QuestionModel) => {
        (this.questionForm.controls['questionAnswers'] as FormArray).push(
          new FormControl(q.answer ?? '', q.isRequired ? Validators.required : null)
        );
      });
    }
  }

  public openDialog(): void {
    const dialogRef: MatDialogRef<FormQuestionBuilderDialogComponent, QuestionModel> = this.dialog.open(
      FormQuestionBuilderDialogComponent,
      {
        width: '450px'
      }
    );

    dialogRef.afterClosed().subscribe((result: QuestionModel | undefined) => {
      if (result) {
        const currentQ: QuestionModel[] = this.formService.questions$.getValue();
        currentQ.push(result);
        this.formService.questions$.next(currentQ);

        (this.questionForm.controls['questionAnswers'] as FormArray).push(
          new FormControl('', result.isRequired ? Validators.required : null)
        );
      }
    });
  }

  public getControls(value: AbstractControl): FormControl {
    return value as FormControl;
  }

  public checkboxOptionChange(value: MatCheckboxChange, data: string, questionIndex: number): void {
    let currentValue: string[] = (this.questionForm.controls['questionAnswers'] as FormArray).controls[questionIndex].getRawValue();

    if (value.checked) {
      if (!currentValue) {
        currentValue = [];
        currentValue.push(data);
      } else {
        currentValue = [...currentValue, data];
      }

      currentValue = [...new Set(currentValue)];
    } else {
      currentValue = currentValue.filter((v: string) => v != data);
    }

    (this.questionForm.controls['questionAnswers'] as FormArray).controls[questionIndex].patchValue(currentValue);
  }

  public isOptionChecked(data: string, questionIndex: number): boolean {
    const currentValue: string[] = (this.questionForm.controls['questionAnswers'] as FormArray).controls[questionIndex].getRawValue();
    return currentValue.includes(data);
  }

  public submitAnswer(): void {
    if (FormUtils.validateForm(this.questionForm)) {
      const answer: string[] = this.questionForm.getRawValue().questionAnswers;
      let currentQuestions: QuestionModel[] = this.formService.questions$.getValue();
      currentQuestions = currentQuestions.map((q: QuestionModel, index: number) => {
        q.answer = answer[index];
        return q;
      });

      this.formService.questions$.next(currentQuestions);
      this.route.navigateByUrl('/form/answers');
    }
  }
}
