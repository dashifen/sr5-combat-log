export const characters = {
  players: [
    {
      type: 'pc',
      name: 'Doc',
      initiative: 0,
      dice: 0,
      roll: 0,
      interrupts: 0,
      damage: 0,
      highPainTolerance: 0,
      lowPainTolerance: false,
      score: 0,
    },
    {
      type: 'pc',
      name: 'Donut',
      initiative: 0,
      dice: 0,
      roll: 0,
      interrupts: 0,
      damage: 0,
      highPainTolerance: 0,
      lowPainTolerance: false,
      score: 0,
    },
    {
      type: 'pc',
      name: 'Dylan',
      initiative: 0,
      dice: 0,
      roll: 0,
      interrupts: 0,
      damage: 0,
      highPainTolerance: 0,
      lowPainTolerance: false,
      score: 0,
    },
    {
      type: 'pc',
      name: 'Loki',
      initiative: 0,
      dice: 0,
      roll: 0,
      interrupts: 0,
      damage: 0,
      highPainTolerance: 0,
      lowPainTolerance: false,
      score: 0,
    },
    {
      type: 'pc',
      name: 'Sylvie',
      initiative: 0,
      dice: 0,
      roll: 0,
      interrupts: 0,
      damage: 0,
      highPainTolerance: 0,
      lowPainTolerance: false,
      score: 0,
    },
    {
      type: 'pc',
      name: 'Zee',
      initiative: 0,
      dice: 0,
      roll: 0,
      interrupts: 0,
      damage: 0,
      highPainTolerance: 0,
      lowPainTolerance: false,
      score: 0,
    }
  ],

  addCharacter(name) {
    const baseInitiative = 2;
    const roll = baseInitiative + Math.floor(Math.random() * 6) + 1;

    return {
      type: 'npc',
      name: name,
      initiative: baseInitiative,
      dice: 1,
      roll: roll,
      interrupts: 0,
      damage: 0,
      highPainTolerance: 0,
      lowPainTolerance: false,
      score: roll,
    };
  }
};
