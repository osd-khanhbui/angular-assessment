import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FormService } from '../../services/form-builder.service';

@Component({
  selector: 'assessment-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormAnswersComponent {
  constructor(public readonly formService: FormService) {}

  public selectedQuestionIndex: number = 0;
}
