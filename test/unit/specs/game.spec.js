import Game from '../../../src/game';

describe('Game', () => {
  let questionsFixture;

  beforeEach(() => {
    /* eslint-disable no-underscore-dangle */
    questionsFixture = window.__json__['fixtures/questions'];
    /* eslint-enable no-underscore-dangle */
  });

  describe('maxPoints()', () => {
    it('should calculate maximum points based on number of questions and points per question', () => {
      const game = new Game(questionsFixture);
      expect(game.maxPoints).to.equal(1000);
    });
  });

  describe('rating()', () => {
    it('should return 0 if no questions were answered yet', () => {
      const game = new Game(questionsFixture);
      expect(game.rating).to.equal(0);
    });

    it('should return a 2.5 rating if half the questions were answered correctly', () => {
      const game = new Game(questionsFixture);
      game.correctAnswers = [0, 1, 2, 3, 4];
      expect(game.rating).to.equal(2.5);
    });

    it('should return a 5 rating if all questions were answered correctly', () => {
      const game = new Game(questionsFixture);
      game.correctAnswers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(game.rating).to.equal(5);
    });
  });

  describe('start()', () => {
    it('should reset time left', () => {
      const game = new Game(questionsFixture);
      game.timeLeft = 5000;
      game.start();
      expect(game.timeLeft).to.not.equal(5000);
      expect(game.hasStarted).to.equal(true);
    });
  });

  describe('nextQuestion()', () => {
    it('should go to next question iff there are more', () => {
      const game = new Game(questionsFixture);
      game.currentQuestion = 0;
      game.nextQuestion();
      expect(game.currentQuestion).to.equal(1);
    });

    it('should stop game after 10 questions', () => {
      const finishStub = sinon.stub();
      const game = new Game(questionsFixture, finishStub);
      game.currentQuestion = 9;
      game.nextQuestion();
      expect(game.currentQuestion).to.equal(9);
      expect(game.gameOver).to.equal(true);
      expect(finishStub).to.have.callCount(1);
    });
  });

  describe('restartCounter()', () => {
    it('should clear old interval', () => {
      const game = new Game(questionsFixture);
      game.currentInterval = 'bla';
      game.restartCounter();
      expect(game.currentInterval).to.not.equal('bla');
    });

    it('should treat answer as false when time is over', (done) => {
      const game = new Game(questionsFixture);
      game.restartCounter();
      game.timeLeft = 0;
      expect(game.falseAnswers.length).to.equal(0);
      window.setTimeout(() => {
        expect(game.falseAnswers.length).to.equal(1);
        done();
      }, 1100);
    });
  });

  describe('isCorrect(answer)', () => {
    it('should determine whether index is part of correct answers', () => {
      const game = new Game(questionsFixture);
      game.currentQuestion = 0;
      const result1 = game.isCorrect('"object"');
      expect(result1).to.equal(true);
      const result2 = game.isCorrect('wrong');
      expect(result2).to.equal(false);
    });
  });

  describe('recordAnswerAndProceed(answer)', () => {
    it('should store answer', () => {
      const game = new Game(questionsFixture);
      game.start();
      expect(game.answers.length).to.equal(0);
      game.recordAnswerAndProceed('lorem');
      expect(game.answers.length).to.equal(1);
    });

    it('should increase score if answer is correct', () => {
      const game = new Game(questionsFixture);
      game.start();
      game.currentQuestion = 4;
      const oldScore = game.totalScore;
      expect(game.isCorrect('Brendan Eich')).to.equal(true);
      game.recordAnswerAndProceed('Brendan Eich');
      expect(game.totalScore).to.be.above(oldScore);
    });

    it('should proceed to next question either way', () => {
      const game = new Game(questionsFixture);
      game.start();
      game.currentQuestion = 4;
      game.recordAnswerAndProceed('Brendan Eich'); // correct answer
      expect(game.currentQuestion).to.equal(5);
      game.recordAnswerAndProceed('wrong answer');
      expect(game.currentQuestion).to.equal(6);
    });
  });

  describe('wasCorrectlyAnswered(idx)', () => {
    it('should check if index is associated with correctly answered question', () => {
      const game = new Game(questionsFixture);
      game.start();
      game.correctAnswers.push(0);
      expect(game.wasCorrectlyAnswered(1)).to.equal(false);
      game.correctAnswers.push(1);
      expect(game.wasCorrectlyAnswered(1)).to.equal(true);
    });
  });
});
