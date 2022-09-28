import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { QuestionModel } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class FormService {
  public questions$: BehaviorSubject<QuestionModel[]> = new BehaviorSubject<QuestionModel[]>([]);
}
