<script>
import character from './character.vue';

export default {
  name: 'combat-log',
  components: {character},
  methods: {
    addGoon() {

      // adding a goon doesn't require a prompt; they just get a name like
      // Human A or Ork B.

      this.$store.commit('addCharacter');
    },

    addLieutenant() {

      // lieutenants get some sort of name, so that might be a proper name or
      // an archetype, so maybe Auggie or Hacker.

      this.$store.commit('addCharacter', prompt('Enter Lieutenant'));
    },

    sort() {
      this.$store.commit('sort');
    },

    endPhase() {
      this.$store.commit('endPhase');
    }
  },
};
</script>

<template>
  <table>
    <caption>Phase {{ this.$store.state.phase }}</caption>
    <thead>
    <tr>
      <th scope="col" id="character">Character</th>
      <th scope="col" id="init">Init</th>
      <th scope="col" id="dice">Dice</th>
      <th scope="col" id="roll">Roll</th>
      <th scope="col" id="acted">Acted</th>
      <th scope="col" id="interrupts">Interrupts</th>
      <th scope="col" id="damage">Damage</th>
      <th scope="col" id="initiative">Initiative</th>
      <th scope="col" id="notes">Notes</th>
      <th scope="col" id="remover"></th>
    </tr>
    </thead>
    <tbody>
    <tr is="vue:character" v-for="(character, index) in this.$store.state.characters"
        :data-character="character"
        :data-index="index">
    </tr>
    </tbody>
  </table>

  <button type="button" @click="addGoon">Add Grunt</button>
  <button type="button" @click="addLieutenant">Add Lieutenant</button>
  <button type="button" @click="sort">Sort</button>
  <button type="button" @click="endPhase">End Phase</button>
</template>

<style lang="scss">
table {
  border: 1px solid black;
  border-collapse: collapse;
  margin-bottom: .5rem;
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

th#acted,
th#initiative,
[headers=acted],
[headers=initiative] {
  text-align: center;
}

[headers=roll] input,
input[type=number] {
  width: 50px;
}

th#interrupts,
[headers=interrupts] {
  width: 200px;
}

th#acted,
th#damage,
th#initiative,
[headers=acted],
[headers=damage],
[headers=initiative] {
  width: 100px;
}

[headers=notes] input {
  width: 100%;
}

button {
  font-size: .75rem;
  margin-right: .25rem;
  padding: .15rem .25rem;
}

button + button {
  margin-left: .25rem;
}
</style>
