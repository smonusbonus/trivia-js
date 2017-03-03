import Vue from 'vue';
import Results from '@/components/Results';

describe('Results.vue', () => {
  it('should determine whether index is part of correct answers', () => {
    const vm = new Vue(Results).$mount();
    const correctAnswers = [1, 2, 3];
    const result1 = vm.wasCorrectlyAnswered(correctAnswers, 1);
    expect(result1).to.equal(true);
    const result2 = vm.wasCorrectlyAnswered(correctAnswers, 5);
    expect(result2).to.equal(false);
  });
});
