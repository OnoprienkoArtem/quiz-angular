import { computed, inject, Injectable, signal } from "@angular/core";
import { QuestionInterface } from "../type/question.interface";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { BackendQuestionInterface } from "../type/backendQuestion.interface";

@Injectable({ providedIn: 'root' })
export class QuizService {
  http = inject(HttpClient);

  questions = signal<QuestionInterface[]>([]);
  currentQuestionIndex = signal<number>(0);
  currentAnswer = signal<string | null>(null);
  correctAnswersCount = signal<number>(0);
  currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);
  showResult = computed(() => this.currentQuestionIndex() === this.questions().length);
  currentQuestionAnswers = computed(() => this.shuffleAnswers(this.currentQuestion()));

  shuffleAnswers(question: QuestionInterface): string[] {
    const unshuffleAnswers = [question.correctAnswer, ...question.incorrectAnswers];

    return unshuffleAnswers
      .map(a => ({ sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);
  }

  selectAnswer(answerText: string): void {
    this.currentAnswer.set(answerText);
    const correctAnswersCount = answerText === this.currentQuestion().correctAnswer
      ? this.correctAnswersCount() + 1
      : this.correctAnswersCount();
    this.correctAnswersCount.set(correctAnswersCount);
  }

  goToNextQuestion(): void {
    const currentQuestionIndex = this.showResult()
      ? this.currentQuestionIndex()
      : this.currentQuestionIndex() + 1;
    this.currentQuestionIndex.set(currentQuestionIndex);
    this.currentAnswer.set(null);
  }

  restart(): void {
    this.currentQuestionIndex.set(0);
    this.correctAnswersCount.set(0);
  }

  getQuestions(): Observable<QuestionInterface[]> {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';

    return this.http.get<{results: BackendQuestionInterface[]}>(apiUrl).pipe(
      map(response => this.normalizeQuestions(response.results)),
    );
  }

  normalizeQuestions(beckendQuestions: BackendQuestionInterface[]): QuestionInterface[]  {
    return beckendQuestions.map(beckendQuestion => {
      const incorrectAnswers = beckendQuestion.incorrect_answers.map(incorrectAnswer => decodeURIComponent(incorrectAnswer));
      return {
        question: decodeURIComponent(beckendQuestion.question),
        correctAnswer: decodeURIComponent(beckendQuestion.correct_answer),
        incorrectAnswers,
      }
    });
  }
}
