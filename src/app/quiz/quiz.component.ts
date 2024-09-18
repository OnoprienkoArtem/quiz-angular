import { Component } from '@angular/core';
import { QuestionComponent } from './components/question/question.component';

@Component({
  selector: 'quiz',
  standalone: true,
  imports:[QuestionComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {}
