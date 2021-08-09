<script>
export default {
  name: 'character',

  props: ['character', 'player'],

  data() {
    return {
      init: "2",
      dice: "1",
      spent: new Array(6).fill(false),
      interrupts: 0,
      damage: 0,
    };
  },

  computed: {
    roll() {
      let sum = Number(this.init);
      for (let i = 0; i < this.dice; i++) {
        sum += Math.floor(Math.random() * 6) + 1;
      }

      return sum;
    },

    actions() {
      return Math.ceil(this.roll / 10);
    },

    initiative() {
      let initiative = this.roll;
      initiative -= 10 * this.spent.filter(spent => spent).length;
      initiative -= Math.floor(this.damage / 3);
      initiative -= this.interrupts;
      return initiative;
    }
  }
};
</script>

<template>
  <tr :type="player ? 'pc' : 'npc'">
    <td headers="character">{{ character }}</td>
    <td headers="init"><input type="number" v-model="init" min="2" max="25" step="1"></td>
    <td headers="dice"><input type="number" v-model="dice" min="1" max="5" step="1"></td>
    <td headers="roll"><input type="text" :value="roll" min="0" max="55" step="1"></td>
    <td headers="actions">
      <input v-for="i in actions" type="checkbox" v-model="spent[(i-1)]">
    </td>
    <td headers="interrupts"></td>
    <td headers="damage"><input type="number" v-model="damage" min="0" max="20"></td>
    <td headers="initiative" v-text="initiative"></td>
    <td headers="notes"></td>
  </tr>
</template>
