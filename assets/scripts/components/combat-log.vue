<script>
export default {
  name: "combat-log",
  props: ['pcs','actions'],
  data() {
    return {
      'characters': this.pcs,
    };
  }
};
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>Character</th>
      <th>Init</th>
      <th>Dice</th>
      <th>Initiative</th>
      <th>Actions</th>
      <th>Interrupts</th>
      <th>Damage</th>
      <th>Score</th>
      <th>Notes</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="character in characters">
      <td>{{ character }}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    </tbody>
  </table>


</template>

<style scoped>
  table {
    width: 100%;
  }

  td, th {
    padding: .25rem;
    text-align: left;
  }

  thead th {
    vertical-align: bottom;
  }

  tbody td, tbody th {
    vertical-align: top;
  }

</style>
