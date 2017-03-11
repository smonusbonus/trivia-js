<template>
  <div v-if="game.gameOver">
    <div class="results">
      <div>
        <h1>Well done!</h1>
        <p>Thanks for participating. Here is your score.</p>
        <ul>
          <li>Score: <strong>{{ game.totalScore }}</strong></li>
          <li>No. of correct answers: <strong>{{ game.correctAnswers.length }}</strong></li>
          <li>No. of false answers: <strong>{{ game.falseAnswers.length }}</strong></li>
        </ul>
      </div>
      <div>
        <a href="#solutions" class="btn btn-primary">
          <i class="fa fa-check-square-o"></i>
          Check solutions
        </a>
      </div>
    </div>
    <div id="solutions" class="summary">
      <div class="summary-block" v-for="(question, index) in questions">
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
  props: ['questions', 'game'],
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

ul {
  list-style-type: none;
  padding: 0;
}

.results {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
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
