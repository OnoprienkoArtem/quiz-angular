import { Component, inject, OnInit } from '@angular/core';
import { QuestionComponent } from './components/question/question.component';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'quiz',
  standalone: true,
  imports:[QuestionComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {

  quizService = inject(QuizService);

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(questions => {
      this.quizService.questions.set(questions);
    });
  }
}
