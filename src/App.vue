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
  background-color: #f6f6f6;
}

h1, h2, li {
  text-align: center;
}

p {
  font-size: 1rem;
  text-align: center;
}

h1, h2, h3, h4, h5, h6, p, li, strong, em {
  color: #444;
}

.btn {
  display: inline-block;
  padding: 0.77rem 1rem 0.8rem 1rem; /* 0.77 is needed to reach optical center */
  border: 0;
  outline: 0;
  border-radius: 0.3rem;
  margin: 0 0.5rem 1rem 0.5rem;
  text-decoration: none;
  box-sizing: border-box;
}

.btn:hover {
  opacity: 0.7;
  cursor: pointer;
}

.btn-default {
  font-size: 0.9rem;
  background-color: #eee;
  color: #333;
}

.btn-primary {
  font-size: 0.8rem;
  background-color: #42b983;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
}
</style>
