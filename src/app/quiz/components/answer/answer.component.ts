import { Component, inject, input } from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'quiz-answer',
  standalone: true,
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent {
  answerText = input.required<string>();
  answerIndex = input.required<number>();

  quizService = inject(QuizService);

  letterMapping = ['A', 'B', 'C', 'D'];
}
