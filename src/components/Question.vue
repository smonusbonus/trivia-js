<template>
  <div class="question">
    <h2 v-html="question.question"></h2>
    <div>
      <button type="button" class="btn btn-default" v-for="answer in question.answers" v-on:click="checkCorrect(answer)">
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
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  text-align: center;
}
</style>
