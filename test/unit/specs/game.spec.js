import Game from '../../../src/game';

describe('Game', () => {
  let questionsFixture;

  beforeEach(() => {
    /* eslint-disable no-underscore-dangle */
    questionsFixture = window.__json__['fixtures/questions'];
    /* eslint-enable no-underscore-dangle */
  });

  it('should return rating', () => {
    const game = new Game([]);
    expect(game.rating).to.equal(0);
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

    it('should treat answer as false when time is over', () => {
      const game = new Game(questionsFixture);
      game.restartCounter();
      game.timeLeft = 0;
      window.setTimeout(() => {
        expect(game.falseAnswers.length).to.equal(1);
      }, 1000);
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
});
