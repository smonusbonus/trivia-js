import Vue from 'vue';
import Results from '@/components/Results';

describe('Results.vue', () => {
  it('should expose game instance to view model', () => {
    const Constructor = Vue.extend(Results);
    const vm = new Constructor().$mount();
    vm.game = { gameOver: true };
    expect(vm.game).to.not.equal(undefined);
  });
});
