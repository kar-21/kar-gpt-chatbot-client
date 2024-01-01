import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PostQuestionApiModel } from '../model/questionAnswer.model';

@Injectable({
  providedIn: 'root',
})
export class AskService {
  constructor(private http: HttpClient) {}

  postQuestion(question: string): Observable<PostQuestionApiModel> {
    return this.http.post<PostQuestionApiModel>(`${environment.backendUrl}/ask`, {
      question,
    });
  }
  ping(): Observable<void> {
    return this.http.get<void>(`${environment.backendUrl}`);
  }
}
