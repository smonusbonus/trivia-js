class Game {
  constructor(questions) {
    Object.assign(this, {
      questions,
      answers: [],
      correctAnswers: [],
      currentQuestion: 0,
      falseAnswers: [],
      hasStarted: false,
      gameOver: false,
      totalScore: 0,
      maxQuestions: 10,
      answerTime: 10000,
      timeLeft: 0,
      currentInterval: null,
    });
  }

  get maxPoints() {
    return this.maxQuestions * 100;
  }

  get rating() {
    if (this.correctAnswers.length === 0) { return 0; }
    const percentage = this.getPercentageCorrect(this.correctAnswers.length, this.totalScore);
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
    this.timeLeft = this.answerTime;

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
    this.percentageCorrect = this.getPercentageCorrect(this.correctAnswers.length,
                                                        this.maxQuestions);
    // this.trackResult()
    //   .catch(() => {
    //     // What to do here?
    //   });
  }

  nextQuestion() {
    if ((this.maxQuestions - 1) > this.currentQuestion) {
      this.currentQuestion += 1;
      this.restartCounter();
    } else {
      this.closeGame();
    }
  }

  getPercentageCorrect() {
    return (this.correctAnswers.length / this.maxQuestions) * 100;
  }
}
export default Game;

