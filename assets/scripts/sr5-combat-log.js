import {createApp} from 'vue';
import CombatLog from './components/combat-log.vue';

document.addEventListener('DOMContentLoaded', () => {
  for (let log of document.getElementsByTagName('combat-log')) {

    // there should only ever be a single combat log in the DOM.  but, looping
    // is a handy way to confirm that we both found a log and then to actually
    // mount of CombatLog component onto it.

    createApp(CombatLog).mount(log);
  }
});
