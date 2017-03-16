<template>
  <div v-if="game.gameOver">
    <div class="results">
      <div>
        <h1 v-if="game.rating >= 3">Well done!</h1>
        <h1 v-if="game.rating < 3 && game.rating >= 2">Not bad!</h1>
        <h1 v-if="game.rating < 2">Better luck next time!</h1>
        <div class="rating">
          <i class="fa" v-for="(star, index) in [1, 2, 3, 4, 5]" v-bind:class="{
            'fa-star-o': game.rating < (index + 0.5),
            'fa-star': game.rating > (index + 0.5),
            'fa-star-half-o': game.rating > index && game.rating <= (index + 0.5)
          }"></i>
        </div>
        <p>
          You answered {{ game.percentageCorrect }}% correctly
        </p>
        <small class="text-muted">
          ({{ game.totalScore }} of {{ game.maxPoints }} max. points)
        </small>
      </div>
      <div class="actions">
        <a href="#solutions" class="btn btn-primary">
          <i class="fa fa-check-square-o"></i>
          Check solutions
        </a>
        <button type="button" class="btn btn-default" v-on:click="game.startGame()">
          Try again
        </button>
      </div>
    </div>
    <div id="solutions" class="summary">
      <div class="summary-block" v-for="(question, index) in game.questions">
        <div class="summary-block-header">
          <p class="question-number">{{ index + 1 }}. Question</p>
          <a class="source" target="_blank" :href="question.source">Source</a>
        </div>
        <h2 v-html="question.question"></h2>
        <p>
          <strong>Your Answer:</strong>
          {{ game.answers[index] }}
          <div class="correct" v-if="wasCorrectlyAnswered(game.correctAnswers, index)">
            Correct!
          </div>
          <div class="false" v-if="!wasCorrectlyAnswered(game.correctAnswers, index)">
            False!
          </div>
        </p>
        <div v-if="!wasCorrectlyAnswered(game.correctAnswers, index)">
          <p>Solution: {{ question.answers[question.solution] }}</p>
          <p class="explanation">{{ question.explanation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'results',
  props: ['game'],
  data() {
    return {
      wasCorrectlyAnswered(correctAnswers, idx) {
        return correctAnswers.indexOf(idx) >= 0;
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  margin: 0 2rem;
}

.results {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.rating .fa {
  font-size: 3rem;
  margin-right: 0.3rem;
}

.fa-star,
.fa-star-half-o {
  color: #FFC402;
}

.fa-star-o {
  color: #ddd;
}

.actions {
  margin-top: 2rem;
}

.actions .btn {
  width: 200px;
  display: block;
  margin: 0 auto 1rem auto;
}

.summary {
  border-top: 1px solid #ddd;
  padding-top: 3rem;
}

.summary-block {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px #eee;
  margin: 2rem auto;
  padding-bottom: 1rem;
  width: 90%;
  max-width: 800px;
}

.summary-block-header {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
  background-color: #f6f6f6;
  border-radius: 0.5rem 0.5rem 0 0;
  position: relative;
  margin-bottom: 1rem;
  z-index: 10;
}

.question-number {
  color: #666;
  font-weight: 300;
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
}

.source {
  color: #ccc;
  font-size: 0.8rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  text-decoration: none;
}

.source:hover {
  color: #aaa;
  text-decoration: underline;
}

.correct,
.false {
  text-align: center;
}

.correct {
  color: #42b983;
}

.false {
  color: #FF0000;
}

.explanation {
  font-size: 0.8rem;
  margin: 0 2rem;
}
</style>
