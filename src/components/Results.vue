<template>
  <div class="result" v-if="game.gameOver">
    <h1>Well done!</h1>
    <p>Thanks for participating. Here is your score.</p>
    <ul>
      <li>Total score: <strong>{{ game.totalScore }}</strong></li>
      <li>No. of correct answers: <strong>{{ game.correctAnswers.length }}</strong></li>
      <li>No. of false answers: <strong>{{ game.falseAnswers.length }}</strong></li>
    </ul>
    <div class="summary">
      <div class="summary-block" v-for="(question, index) in questions">
        <p class="question-number">{{ index + 1 }}. Question</p>
        <h2>{{ question.question }}</h2>
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
          <a class="source" :href="question.source">More information</a>
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

.summary {
  border-top: 1px solid #ddd;
  margin-top: 2rem;
  padding-top: 2rem;
}

.summary-block {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px #eee;
  margin: 2rem auto;
  width: 70%;
}

.question-number {
  color: #666;
  font-weight: 300;
  font-size: 0.9rem;
  text-align: center;
  margin: 0 0 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
  background-color: #eee;
  border-radius: 0.5rem 0.5rem 0 0;
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

.source {
  color: #42b983;
  display: block;
  font-size: 0.8rem;
  margin: 1.5rem 0;
  text-align: center;
}
</style>
