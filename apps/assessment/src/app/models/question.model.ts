export interface QuestionModel {
  title: string;
  options: QuestionOption[];
  type: QuestionType;
  isRequired?: boolean;
  answer?: string | string[];
}

export interface QuestionOption {
  title: string;
}

export enum QuestionType {
  Paragraph = 'Paragraph',
  Checkbox = 'Checkbox'
}
