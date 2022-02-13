import {createApp} from 'vue';
import {createStore} from 'vuex';
import {state} from './state';
import CombatLog from './components/combat-log.vue';

document.addEventListener('DOMContentLoaded', () => {
  const log = document.getElementsByTagName('combat-log')[0];
  createApp(CombatLog).use(createStore(state)).mount(log);
});
