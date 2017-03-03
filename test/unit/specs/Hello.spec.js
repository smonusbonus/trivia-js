import Vue from 'vue';
import Hello from '@/components/Hello';

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to JS Trivia!');
  });

  it('should determine whether index is part of correct answers', () => {
    const vm = new Vue(Hello).$mount();
    const correctAnswers = [1, 2, 3];
    const result1 = vm.game.wasCorrectlyAnswered(correctAnswers, 1);
    expect(result1).to.equal(true);
    const result2 = vm.game.wasCorrectlyAnswered(correctAnswers, 5);
    expect(result2).to.equal(false);
  });
});
