<template>
  <div class="hello">
    <header>
      <span class="score">
        <span v-if="game.hasStarted">
          Score: <strong>{{ game.totalScore }}</strong>
        </span>
      </span>
      <span class="logo">
        <a href="/"><img src="../assets/logo.png" alt="trivia.js logo"></a>
      </span>
      <span class="time">
        <span v-if="game.hasStarted && !game.gameOver">
          Time left: <strong>{{ game.timeLeft / 1000 }}s</strong>
        </span>
      </span>
    </header>
    <div class="welcome-message" v-if="!game.hasStarted">
      <div class="welcome-text">
        <h1>Welcome to trivia.js!</h1>
        <p>trivia.js is a fun way to test you Javascript knowledge and become a better programmer.</p>
      </div>
      <div>
        <button type="button" v-on:click="game.startGame()">Try me!</button>
      </div>
    </div>
    <div class="game" v-if="game.hasStarted && !game.gameOver">
      <question
        class="question"
        :question="game.questions[game.currentQuestion]"
        :game="game"></question>
    </div>
    <results :questions="game.questions" :game="game"></results>
  </div>
</template>

<script>
import Vue from 'vue';
import Question from './Question';
import Results from './Results';

export default {
  name: 'hello',
  components: {
    Question,
    Results,
  },
  data() {
    return {
      game: {
        answers: [],
        questions: [],
        correctAnswers: [],
        currentQuestion: 0,
        falseAnswers: [],
        hasStarted: false,
        gameOver: false,
        totalScore: 0,
        maxQuestions: 6,
        answerTime: 10000,
        timeLeft: 0,
        currentInterval: null,
        startGame() {
          this.getQuestions()
            .then((result) => {
              this.questions = result;
              this.hasStarted = true;
              this.currentQuestion = 0;
              this.restartCounter();
            })
            .catch((error) => {
              throw new Error(error.message);
            });
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
              this.falseAnswers.push(this.currentQuestion);
              this.answers.push(null);
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
        getQuestions() {
          return Vue.http.get('/api/questions').then(response => response.body);
        },
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 3rem;
  margin-bottom: 0;
}

h1, h2 {
  font-weight: 600;
}

.welcome-message,
.game {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}

.welcome-text {
  margin-bottom: 2rem;
}

header {
  background-color: #42b983;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  padding: 1rem;
  position: fixed;
  z-index: 100;
  width: 100%;
}

header > span {
  flex-grow: 1;
  flex-basis: 33.33%;
  padding-top: 0.5rem;
}

.logo {
  padding-top: 0;
  text-align: center;
}

.logo img {
  width: auto;
  height: 2rem;
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
</style>
