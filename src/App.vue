<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello';

export default {
  name: 'app',
  components: {
    Hello,
  },
};
</script>

<style src="../node_modules/normalize.css/normalize.css"></style>
<style>
html {
  /* Use font-size as reference point for rem units */
  font-size: 18px;
}

body {
  font-family: Helvetica, Arial, monospace;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.8em;
  padding: 0.3em;
  background-color: #f8f8f8;
}

h1, h2, li {
  text-align: center;
}

p {
  font-size: 1rem;
  text-align: center;
}
</style>
