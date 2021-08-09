import {createApp} from 'vue';
import CombatLog from './components/combat-log.vue';

document.addEventListener('DOMContentLoaded', () => {
  for (let log of document.getElementsByTagName('combat-log')) {

    // there should only ever be a single combat log in the DOM.  but, looping
    // is a handy way to confirm that we both found a log and then to actually
    // mount of CombatLog component onto it.

    let app = createApp(CombatLog, {
      "pcs": [
        'Doc',
        'Donut',
        'Dylan',
        'Sylvie',
        'Zee'
      ],
      "actions": {
        "Block": 5,
        "Counterstrike": 7,
        "Dive for Cover": 5,
        "Dive on the Grenade": 5,
        "Dodge": 5,
        "Full Defense": 10,
        "Hit the Dirt": 5,
        "I Am the Firewall": 5,
        "Intercept": 5,
        "Intervene": 5,
        "Parry": 5,
        "Protecting the Principle": 5,
        "Push (Intercept)": 5,
        "Reversal (Clinch)": 7,
        "Reversal (Subduing)": 7,
        "Right Back aat Ya!": 10,
        "Riposte": 7,
        "Run for Your Life": 5,
        "Sacrifice Throw": 10,
        "Shadow Block v. Dodge": 5,
        "Shadow Block v. Evade": 5,
        "Throw Person": 10,
      }
    });

    app.mount(log);
  }
});
