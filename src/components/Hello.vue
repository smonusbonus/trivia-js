<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <p>JS Trivia is a fun way to test you Javascript knowledge and become a better programmer!</p>
    <button type="button" v-on:click="showQuestions">Try me!</button>
    <div class="questions" v-if="tryMe">
      <div class="question" v-for="question in questions">
        <h2>{{ question.question }}</h2>
        <div>
          <p>Answers:</p>
          <button type="button" v-for="answer in question.answers">{{ answer }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      message: 'Welcome to JS Trivia!',
      tryMe: false,
      showQuestions: () => {
        this.tryMe = true;
      },
      questions: [{
        question: 'What will typeof null return?',
        answers: ['object', 'null', 'undefined', 'number'],
        solution: 0,
      }],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
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
