<template>
  <div class="hello">
    <header>
      <span class="score" v-if="game.hasStarted">Total score: {{ game.totalScore }}</span>
      <span class="logo">trivia.js</span>
      <span class="time" v-if="game.hasStarted">Time left: <strong>{{ game.timeLeft / 1000 }}</strong></span>
    </header>
    <div class="welcome-message" v-if="!game.hasStarted">
      <h1>Welcome to JS Trivia!</h1>
      <p>JS Trivia is a fun way to test you Javascript knowledge and become a better programmer.</p>
      <button type="button" v-on:click="game.startGame()">Try me!</button>
    </div>
    <div class="game" v-if="game.hasStarted && !game.gameOver">
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
        maxQuestions: 4,
        answerTime: 10000,
        timeLeft: 0,
        currentInterval: null,
        startGame() {
          this.hasStarted = true;
          this.currentQuestion = 0;
          this.restartCounter();
        },
        stopInterval() {
          clearInterval(this.currentInterval);
        },
        restartCounter() {
          this.timeLeft = this.answerTime;

          this.stopInterval();
          this.currentInterval = setInterval(() => {
            if (this.timeLeft !== 0) {
              this.timeLeft -= 1000;
            } else {
              this.stopInterval();
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
            this.stopInterval();
            this.gameOver = true;
          }
        },
      },
      questions: [
        {
          question: 'What will typeof null return?',
          answers: ['object', 'null', 'undefined', 'number'],
          solution: 0,
          explanation: 'In the first implementation of JavaScript, JavaScript values were represented as a type tag and a value. The type tag for objects was 0. null was represented as the NULL pointer (0x00 in most platforms). Consequently, null had 0 as type tag, hence the bogus typeof return value.',
          source: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#null',
        },
        {
          question: 'Which Array method changes the Array itself?',
          answers: ['Array.prototype.splice()', 'Array.prototype.slice()'],
          solution: 0,
          explanation: 'The splice() method changes the contents of an array by removing existing elements and/or adding new elements.',
          source: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice',
        },
        {
          question: 'Which operator is the only JavaScript operator that takes three operands?',
          answers: ['The conditional (ternary) operator', 'The assignment operator', 'Logical OR (||)'],
          solution: 0,
          explanation: 'The conditional (ternary) operator is the only JavaScript operator that takes three operands. This operator is frequently used as a shortcut for the if statement.',
          source: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator',
        },
        {
          question: 'What does ECMA in ECMAScript stand for?',
          answers: [
            'European Computer Manufacturers Association',
            'Electronic Computer Manufacturers Association',
            'Elitist Cheese Manufacturers Association',
          ],
          solution: 0,
          explanation: 'Ecma International is an international private (membership-based) non-profit standards organization for information and communication systems. It acquired its current name in 1994, when the European Computer Manufacturers Association (ECMA) changed its name to reflect the organization\'s global reach and activities.',
          source: 'https://en.wikipedia.org/wiki/Ecma_International',
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

.welcome-message {
  text-align: center;
}

header {
  background-color: #42b983;
  color: #fff;
  padding: 1rem;
  display: flex;
  margin-bottom: 5rem;
}

header span {
  flex-grow: 1;
  flex-basis: 33.33%;
}

.logo {
  font-size: 1.6rem;
  line-height: 1.3rem;
  text-shadow: 2px 2px 0 #3d725a;
  text-align: center;
}

.time {
  text-align: right;
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
