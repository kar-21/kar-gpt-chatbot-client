export interface QuestionAnswerModel {
  id: string;
  question: string;
  answer: string;
}

export type QuestionAnswerArrayModel = QuestionAnswerModel[];

export interface QuestionModel {
  id: string;
  question: string;
}

export interface AnswerModel {
  id: string;
  answer: string;
}

export interface PostQuestionApiModel {
  answer: string;
}
