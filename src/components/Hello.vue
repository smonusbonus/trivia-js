<template>
  <div class="hello">
    <div class="welcome-message" v-if="!game.hasStarted">
      <h1>Welcome to JS Trivia!</h1>
      <p>JS Trivia is a fun way to test you Javascript knowledge and become a better programmer!</p>
      <button type="button" v-on:click="game.hasStarted = true">Try me!</button>
    </div>  
    <div class="questions" v-if="game.hasStarted">
      <strong>Total score: {{ game.totalScore }}</strong>
      <question 
        class="question" 
        :question="questions[game.currentQuestion]" 
        :game="game"></question>
    </div>
  </div>
</template>

<script>
import Question from './Question';

export default {
  name: 'hello',
  components: {
    Question,
  },
  data() {
    return {
      game: {
        totalScore: 0,
        correctAnswers: 0,
        falseAnswers: 0,
        hasStarted: false,
        currentQuestion: 0,
      },
      questions: [
        {
          question: 'What will typeof null return?',
          answers: ['object', 'null', 'undefined', 'number'],
          solution: 0,
        },
        {
          question: 'Which Array method changes the Array itself?',
          answers: ['Array.prototype.splice()', 'Array.prototype.slice()'],
          solution: 0,
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
}

button:hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>
