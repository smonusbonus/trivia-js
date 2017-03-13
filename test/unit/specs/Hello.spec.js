import Vue from 'vue';
import vueResource from 'vue-resource';
import Hello from '@/components/Hello';

Vue.use(vueResource);

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Welcome!');
  });

  describe('nextQuestion()', () => {
    it('should go to next question iff there are more', () => {
      const vm = new Vue(Hello).$mount();
      vm.game.currentQuestion = 0;
      vm.game.nextQuestion();
      expect(vm.game.currentQuestion).to.equal(1);
    });

    it('should stop game after 10 questions', () => {
      const vm = new Vue(Hello).$mount();
      vm.game.currentQuestion = 9;
      vm.game.nextQuestion();
      expect(vm.game.currentQuestion).to.equal(9);
      expect(vm.game.gameOver).to.equal(true);
    });
  });

  describe('restartCounter()', () => {
    it('should clear old interval', () => {
      const vm = new Vue(Hello).$mount();
      vm.game.currentInterval = 'bla';
      vm.game.restartCounter();
      expect(vm.game.currentInterval).to.not.equal('bla');
    });

    it('should treat answer as false when time is over', () => {
      const vm = new Vue(Hello).$mount();
      vm.game.restartCounter();
      vm.game.timeLeft = 0;
      window.setTimeout(() => {
        expect(vm.game.falseAnswers.length).to.equal(1);
      }, 1000);
    });
  });
});
