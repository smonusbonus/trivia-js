class Game {
  constructor(questions, finishedCallback) {
    Object.assign(this, {
      questions,
      finishedCallback,
      answers: [],
      correctAnswers: [],
      currentQuestion: 0,
      falseAnswers: [],
      hasStarted: false,
      gameOver: false,
      totalScore: 0,
      timeLeft: 0,
      currentInterval: null,
      ANSWER_TIME: 20 * 1000,
      MAX_QUESTIONS: 10,
      POINTS_PER_QUESTION: 100,
    });
  }

  get maxPoints() {
    return this.MAX_QUESTIONS * this.POINTS_PER_QUESTION;
  }

  get rating() {
    if (this.correctAnswers.length === 0) { return 0; }
    const percentage = this.getPercentageCorrect();
    return 5 * (percentage / 100);
  }

  start() {
    this.restartCounter();
    this.hasStarted = true;
  }

  stopInterval() {
    clearInterval(this.currentInterval);
  }

  restartCounter() {
    this.timeLeft = this.ANSWER_TIME;

    this.stopInterval();
    this.currentInterval = setInterval(() => {
      if (this.timeLeft !== 0) {
        this.timeLeft -= 1000;
      } else {
        this.stopInterval();
        this.falseAnswers.push(this.currentQuestion);
        this.answers.push(null);
        this.nextQuestion();
      }
    }, 1000);
  }

  closeGame() {
    this.stopInterval();
    this.hasStarted = false;
    this.gameOver = true;
    this.percentageCorrect = this.getPercentageCorrect();

    const resultData = {
      questionIds: this.questions.map(question => question.id),
      questions: this.questions.map(question => question.question),
      answers: this.answers,
      percentageCorrect: this.percentageCorrect,
      totalScore: this.totalScore,
    };
    this.finishedCallback(resultData);
  }

  nextQuestion() {
    if ((this.MAX_QUESTIONS - 1) > this.currentQuestion) {
      this.currentQuestion += 1;
      this.restartCounter();
    } else {
      this.closeGame();
    }
  }

  isCorrect(answer) {
    const question = this.questions[this.currentQuestion];
    const indexSolution = question.solution;
    const indexGivenAnswer = question.answers.indexOf(answer);
    return indexSolution === indexGivenAnswer;
  }

  recordAnswerAndProceed(answer) {
    this.answers.push(answer);

    if (this.isCorrect(answer)) {
      this.totalScore += 10 * (this.timeLeft / 1000);
      this.correctAnswers.push(this.currentQuestion);
      this.nextQuestion();
    } else {
      this.falseAnswers.push(this.currentQuestion);
      this.nextQuestion();
    }
  }

  getPercentageCorrect() {
    return (this.correctAnswers.length / this.MAX_QUESTIONS) * 100;
  }

  wasCorrectlyAnswered(idx) {
    return this.correctAnswers.indexOf(idx) !== -1;
  }
}
export default Game;
