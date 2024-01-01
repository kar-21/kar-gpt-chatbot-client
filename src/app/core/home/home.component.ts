import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

import { LocalCacheService } from '../services/local-cache.service';
import { AskService } from '../services/ask.service';
import {
  PostQuestionApiModel,
  QuestionAnswerArrayModel,
  QuestionModel,
} from '../model/questionAnswer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public questionAnswers: QuestionAnswerArrayModel = [];
  public formGroup = new FormGroup({
    question: new FormControl('', [Validators.required]),
  });

  constructor(
    private localCacheService: LocalCacheService,
    private askService: AskService
  ) {}

  ngOnInit() {
    this.localCacheService
      .subscribeToQuestionAnswer()
      .subscribe(
        (questionAnswer: QuestionAnswerArrayModel) =>
          (this.questionAnswers = questionAnswer)
      );
  }

  promptQuestion() {
    if (this.formGroup.controls.question.value) {
      const question: QuestionModel = {
        id: uuid().slice(0, 4),
        question: this.formGroup.controls.question.value,
      };
      this.localCacheService.pushQuestion(question);
      this.askService
        .postQuestion(this.formGroup.controls.question.value)
        .subscribe((answer: PostQuestionApiModel) => {
          this.localCacheService.pushAnswer({
            id: question.id,
            answer: answer.answer,
          });
          this.formGroup.reset();
        });
    }
  }
}
