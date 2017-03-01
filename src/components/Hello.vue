<template>
  <div class="hello">
    <div class="welcome-message" v-if="!game.hasStarted">
      <h1>Welcome to JS Trivia!</h1>
      <p>JS Trivia is a fun way to test you Javascript knowledge and become a better programmer.</p>
      <button type="button" v-on:click="game.startGame()">Try me!</button>
    </div>
    <div class="questions" v-if="game.hasStarted && !game.gameOver">
      <strong>Total score: {{ game.totalScore }}</strong>
      <p>Time left: {{ game.timeLeft / 1000 }}</p>
      <question
        class="question"
        :question="questions[game.currentQuestion]"
        :game="game"></question>
    </div>
    <div class="result" v-if="game.gameOver">
      <h1>Well done!</h1>
      <p>Thanks for participating. Here is your score.</p>
      <ul>
        <li>Total score: <strong>{{ game.totalScore }}</strong></li>
        <li>No. of correct answers: <strong>{{ game.correctAnswers }}</strong></li>
        <li>No. of false answers: <strong>{{ game.falseAnswers }}</strong></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Question from './Question';

export default {
  name: 'hello',
  components: {
    Question,
  },
  data() {
    return {
      game: {
        correctAnswers: 0,
        currentQuestion: 0,
        falseAnswers: 0,
        hasStarted: false,
        gameOver: false,
        totalScore: 0,
        maxQuestions: 2,
        answerTime: 10000,
        timeLeft: 0,
        startGame() {
          this.hasStarted = true;
          this.currentQuestion = 0;
          this.restartCounter();
        },
        restartCounter() {
          this.timeLeft = this.answerTime;
          const interval = setInterval(() => {
            if (this.timeLeft !== 0) {
              this.timeLeft -= 1000;
            } else {
              clearInterval(interval);
              this.falseAnswers += 1;
              this.nextQuestion();
            }
          }, 1000);
        },
        nextQuestion() {
          if ((this.maxQuestions - 1) > this.currentQuestion) {
            this.currentQuestion += 1;
            this.restartCounter();
          } else {
            this.gameOver = true;
          }
        },
      },
      questions: [
        {
          question: 'What will typeof null return?',
          answers: ['object', 'null', 'undefined', 'number'],
          solution: 0,
        },
        {
          question: 'Which Array method changes the Array itself?',
          answers: ['Array.prototype.splice()', 'Array.prototype.slice()'],
          solution: 0,
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 3rem;
}

h1, h2 {
  font-weight: 600;
}

button {
  background-color: #42b983;
  color: #fff;
  padding: 1rem;
  font-size: 1rem;
  border: 0;
  outline: 0;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
  text-transform: uppercase;
}

button:hover {
  opacity: 0.7;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
