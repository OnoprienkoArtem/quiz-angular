import { Component } from '@angular/core';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'quiz-question',
  standalone: true,
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  imports: [AnswerComponent]
})
export class QuestionComponent {}
