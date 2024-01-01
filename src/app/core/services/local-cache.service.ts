import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  AnswerModel,
  QuestionAnswerArrayModel,
  QuestionAnswerModel,
  QuestionModel,
} from '../model/questionAnswer.model';

@Injectable({
  providedIn: 'root',
})
export class LocalCacheService {
  private questionAnswer: QuestionAnswerArrayModel = [];
  private questionAnswerSubject: BehaviorSubject<QuestionAnswerArrayModel> =
    new BehaviorSubject([] as QuestionAnswerArrayModel);

  constructor() {}

  pushQuestion(question: QuestionModel): void {
    this.questionAnswer.push({ ...question, answer: '' });
    this.questionAnswerSubject.next(this.questionAnswer);
  }

  pushAnswer(answer: AnswerModel): void {
    this.questionAnswer = this.questionAnswer.map(
      (questionAnswer: QuestionAnswerModel) =>
        questionAnswer.id === answer.id
          ? { ...questionAnswer, ...answer }
          : questionAnswer
    );
    this.questionAnswerSubject.next(this.questionAnswer);
  }

  getQuestionAnswer(): QuestionAnswerArrayModel {
    return this.questionAnswer;
  }

  subscribeToQuestionAnswer(): BehaviorSubject<QuestionAnswerArrayModel> {
    return this.questionAnswerSubject;
  }
}
