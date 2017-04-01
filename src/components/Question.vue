<template>
  <div class="question">
    <h2 v-html="game.questions[game.currentQuestion].question"></h2>
    <div>
      <button
        type="button"
        class="btn btn-default"
        v-for="answer in shuffleAnswers(game.questions[game.currentQuestion].answers)"
        v-on:click="game.handleAnswer(answer)">
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
