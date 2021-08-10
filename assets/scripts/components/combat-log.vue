<script>
import character from './character.vue';

export default {
  name: 'combat-log',
  props: ['pcs','interrupts'],
  components: { character },
  data() {
    return {
      'pcs': this.pcs,
    };
  }
};
</script>

<template>
  <table>
    <thead>
    <tr>
      <th scope="col" id="character">Character</th>
      <th scope="col" id="init">Init</th>
      <th scope="col" id="dice">Dice</th>
      <th scope="col" id="roll">Roll</th>
      <th scope="col" id="actions">Actions</th>
      <th scope="col" id="interrupts">Interrupts</th>
      <th scope="col" id="damage">Damage</th>
      <th scope="col" id="initiative">Initiative</th>
      <th scope="col" id="notes">Notes</th>
    </tr>
    </thead>
    <tbody>
      <tr is="vue:character" v-for="character in pcs"
          :interrupts="interrupts"
          :character="character"
          :player="true">
      </tr>
    </tbody>
  </table>


</template>

<style lang="scss">
  table {
    border: 1px solid black;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    padding: .25rem;
    text-align: left;
  }

  thead th {
    vertical-align: bottom;
  }

  tbody tr {
    &:hover {
      background: antiquewhite;
    }

    td, th {
      border-top: 1px solid black;
      vertical-align: top;
    }
  }

  [headers=roll] input,
  input[type=number] {
    width: 50px;
  }

</style>
