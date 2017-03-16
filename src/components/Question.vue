<template>
  <div class="question">
    <h2 v-html="game.questions[game.currentQuestion].question"></h2>
    <div>
      <button
        type="button"
        class="btn btn-default"
        v-for="answer in shuffleAnswers(game.questions[game.currentQuestion].answers)"
        v-on:click="checkCorrect(answer)">
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script>

import fisherYatesShuffle from 'fisher-yates';

export default {
  name: 'question',
  props: ['game'],
  data() {
    return {
      checkCorrect: (answer) => {
        const question = this.game.questions[this.game.currentQuestion];
        const indexSolution = question.solution;
        const indexGivenAnswer = question.answers.indexOf(answer);
        this.game.answers.push(answer);

        if (indexSolution === indexGivenAnswer) {
          this.game.totalScore += 10 * (this.game.timeLeft / 1000);
          this.game.correctAnswers.push(this.game.currentQuestion);
          this.game.nextQuestion();
        } else {
          this.game.falseAnswers.push(this.game.currentQuestion);
          this.game.nextQuestion();
        }
      },
      shuffleAnswers(answers) {
        return fisherYatesShuffle(answers);
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  text-align: center;
}

button {
  text-transform: none;
}
</style>
