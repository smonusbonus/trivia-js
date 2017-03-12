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
          Time: <strong>{{ game.timeLeft / 1000 }}s</strong>
        </span>
      </span>
    </header>
    <div class="welcome-message" v-if="!game.hasStarted && !game.gameOver">
      <div class="welcome-text">
        <h1>Welcome!</h1>
        <p class="lead">trivia.js is a fun way to test you Javascript knowledge and become a better programmer.</p>
        <strong>How does it work?</strong>
        <p>We'll ask 10 random questions and you've got 10 seconds to answer each one. The quicker you answer, the more points you get. Ready?</p>
      </div>
      <div>
        <button type="button" v-on:click="game.startGame()" class="btn btn-primary">
          Got it, let's go!
        </button>
      </div>
    </div>
    <div class="game" v-if="game.hasStarted && !game.gameOver">
      <question
        class="question"
        :question="game.questions[game.currentQuestion]"
        :game="game"></question>
    </div>
    <results :questions="game.questions" :game="game"></results>
    <div class="github" v-if="!game.hasStarted">
      <a href="https://github.com/smonusbonus/js-trivia" target="_blank">
        <i class="fa fa-github" aria-hidden="true"></i>
        Github
      </a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import fisherYatesShuffle from 'fisher-yates';
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
        maxQuestions: 10,
        maxPoints: () => this.game.maxQuestions * 100,
        answerTime: 10000,
        timeLeft: 0,
        currentInterval: null,
        startGame() {
          this.getQuestions(this.maxQuestions)
            .then((result) => {
              this.questions = result;
              this.hasStarted = true;
              this.gameOver = false;
              this.correctAnswers = [];
              this.answers = [];
              this.falseAnswers = [];
              this.totalScore = 0;
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
            this.hasStarted = false;
            this.gameOver = true;
            this.rating = this.getRating(this.correctAnswers.length, this.maxQuestions);
            this.percentageCorrect = this.getPercentageCorrect(this.correctAnswers.length,
                                                               this.maxQuestions);
          }
        },
        getPercentageCorrect(correct, total) {
          // magic number, 100 is the max. which can be reached per question
          // this should be made explicit somewhere
          return (correct / total) * 100;
        },
        getRating(correct, total) {
          if (correct === 0) { return 0; }
          const percentage = this.getPercentageCorrect(correct, total);
          return 5 * (percentage / 100);
        },
        getQuestions(limit) {
          return Vue.http.get('/api/questions').then((response) => {
            const randomizedQuestions = fisherYatesShuffle(response.body);
            return randomizedQuestions.slice(0, limit);
          });
        },
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 2.8rem;
  margin-bottom: 0;
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

.lead {
  font-size: 1.4rem;
  font-weight: 300;
  margin-top: 0.5rem;
}

header {
  background-color: #42b983;
  box-sizing: border-box;
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

header span,
header span strong {
  color: #fff;
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

.github {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.github a {
  color: #ccc;
  text-decoration: none;
  font-size: 1.2rem;
}

.github a:hover {
  color: #aaa;
}
</style>
