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
});
