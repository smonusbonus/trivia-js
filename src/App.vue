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

<style>
@import url('https://fonts.googleapis.com/css?family=Overpass+Mono:400,600');

html {
  /* Use font-size as reference point for rem units */
  font-size: 18px;
}

body {
  margin: 0;
}

#app {
  font-family: 'Overpass Mono', Helvetica, Arial, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, li {
  text-align: center;
}

p {
  font-size: 1rem;
  text-align: center;
}
</style>
