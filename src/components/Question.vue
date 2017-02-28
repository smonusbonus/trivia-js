<template>
  <div class="question">
    <h2>{{ question.question }}</h2>
    <div>
      <p>Answers:</p>
      <button type="button" v-for="answer in question.answers" v-on:click="checkCorrect(answer)">
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question',
  props: ['question', 'game'],
  data() {
    return {
      checkCorrect: (answer) => {
        const indexSolution = this.question.solution;
        const indexGivenAnswer = this.question.answers.indexOf(answer);
        if (indexSolution === indexGivenAnswer) {
          this.game.totalScore += 1;
          this.game.correctAnswers += 1;
        } else {
          this.game.totalScore -= 1;
          this.game.falseAnswers += 1;
        }
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: #42b983;
  color: #fff;
  padding: 1rem;
  font-size: 1rem;
  border: 0;
  outline: 0;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
}

button:hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>
