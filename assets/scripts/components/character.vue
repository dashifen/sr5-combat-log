<script>
export default {
  name: 'character',
  props: ['dataCharacter', 'dataIndex'],
  computed: {
    character() {
      return this.$store.getters.character(this.dataIndex);
    },

    isPlayer() {
      return this.character.type === 'pc';
    }
  },

  methods: {
    setInitiative(event) {
      this.commitChange('initiative', event.target.value);
    },

    commitChange(property, value) {
      this.$store.commit('setCharacterProperty', {
        index: this.dataIndex,
        property: property,
        value: value,
      });
    },

    setDice(event) {
      this.commitChange('dice', event.target.value);
    },

    setRoll(event) {
      this.commitChange('roll', event.target.value);
    },

    interrupt(event) {
      setTimeout(() => event.target.selectedIndex = 0, 1500);
      const cost = Number(event.target.options[event.target.selectedIndex].value);
      const current = this.$store.state.characters[this.dataIndex].interrupts;
      this.commitChange('interrupts', current + cost);
    },

    setDamage(event) {
      this.commitChange('damage', event.target.value);
    },

    setNotes(event) {
      this.commitChange('notes', event.target.value);
    },

    removeCharacter(characterName) {
      if (confirm('Remove ' + characterName + '?')) {
        this.$store.commit('removeCharacter', characterName);
      }
    }
  }
};
</script>

<template>
  <tr :data-type="isPlayer ? 'pc' : 'npc'">
    <td headers="character" v-text="dataCharacter.name"></td>
    <td headers="init">
      <input type="number" :value="this.character.initiative"
        @change="setInitiative" min="2" max="25" step="1" :disabled="isPlayer">
    </td>
    <td headers="dice">
      <input type="number" :value="this.character.dice"
        @change="setDice" min="1" max="5" step="1" :disabled="isPlayer">
    </td>
    <td headers="roll">
      <input type="text" :value="this.character.roll"
        @change="setRoll" :disabled="!isPlayer"></td>
    <td headers="acted">
      <input type="checkbox" tabindex="-1">
    </td>
    <td headers="interrupts">
      <select @change="interrupt" tabindex="-1">
        <option value="0"></option>
        <option v-for="(cost, action) in this.$store.state.interrupts"
            :value="cost" tabindex="-1">
          {{ action }} ({{ cost }})
        </option>
      </select>
    </td>
    <td headers="damage">
      <input type="number" :value="this.character.damage"
        @change="setDamage" min="0" max="20" tabindex="-1">
    </td>
    <td headers="initiative" v-text="this.character.score"></td>
    <td headers="notes">
      <input type="text" :value="this.character.notes" @change="setNotes">
    </td>
    <td headers="remover">
      <span class="remover" @click="removeCharacter(dataCharacter.name)">&times;</span>
    </td>
  </tr>
</template>

<style lang="scss">
.remover {
  cursor: pointer;
  display: inline-block;
  grid-area: remover;
  text-align: right;
  text-decoration: underline;
  width: 100%;

  &:hover {
    color: red;
  }
}

input[type=number][disabled] {
  display: none;
}

</style>
