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
          Time:
          <strong v-bind:class="{ 'text-danger': game.timeLeft <= 3000 }">
            {{ game.timeLeft / 1000 }}s
          </strong>
        </span>
      </span>
    </header>
    <div class="welcome-message" v-if="!game.hasStarted && !game.gameOver">
      <div class="welcome-text">
        <h1>Welcome!</h1>
        <p class="lead">trivia.js is a fun way to test your Javascript knowledge and become a better programmer.</p>
        <strong>How does it work?</strong>
        <p>We'll ask 10 random questions and you've got 10 seconds to answer each one. The quicker you answer, the more points you get. Ready?</p>
      </div>
      <div>
        <button type="button" v-on:click="startGame()" class="btn btn-primary">
          Got it, let's go!
        </button>
      </div>
    </div>
    <div class="game" v-if="game.hasStarted && !game.gameOver">
      <question class="question" :game="game"></question>
    </div>
    <results :game="game" v-on:restart="startGame()"></results>
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
import Game from '../game';
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
      game: {},
      questionSet: [],
      startGame() {
        this.getQuestions(10)
          .then((questions) => {
            this.game = new Game(questions, this.trackResult);
            this.game.start();
          });
      },
      getQuestionSet() {
        return new Promise((resolve, reject) => {
          if (this.questionSet.length > 0) {
            resolve(this.questionSet);
          } else {
            Vue.http.get('/api/questions')
              .then((response) => {
                resolve(this.questionSet = response.body);
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
      },
      getQuestions(limit) {
        return this.getQuestionSet()
          .then((questionSet) => {
            const randomizedQuestions = fisherYatesShuffle(questionSet);
            return randomizedQuestions.slice(0, limit);
          });
      },
      trackResult(resultData) {
        const data = JSON.stringify({
          timestamp: Date.now(),
          eventType: 'quiz-finished',
          questionIds: resultData.questionIds,
          questions: resultData.questions,
          answers: resultData.answers,
          percentageCorrect: resultData.percentageCorrect,
          totalScore: resultData.totalScore,
        });
        return Vue.http.post('/api/track-quiz-finished', data, { emulateJSON: true });
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

.text-danger {
  color: #FF6630;
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
