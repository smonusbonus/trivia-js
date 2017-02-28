<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <p>JS Trivia is a fun way to test you Javascript knowledge and become a better programmer!</p>
    <button type="button" v-on:click="showQuestions">Try me!</button>
    <div class="questions" v-if="tryMe">
      <question class="question" v-for="question in questions" v-bind:question="question"></question>
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
      message: 'Welcome to JS Trivia!',
      tryMe: false,
      showQuestions: () => {
        this.tryMe = true;
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
