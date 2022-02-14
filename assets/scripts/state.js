import {interrupts} from './interrupts';
import {characters} from './characters';

export const state = {
  state() {
    return {
      goons: 0,                         // start with zero goons
      phase: 1,                         // in the first phase of the turn
      interrupts: interrupts,           // using the default list of interrupts
      characters: characters.players    // and starting with just the players
    };
  },

  getters: {
    /**
     * character
     *
     * This returns a specific character from the array of characters based
     * on the index specified.
     *
     * @param state
     *
     * @returns Character
     */
    character: (state) => (index) => {
      return state.characters[index];
    }
  },

  mutations: {
    /**
     * sort
     *
     * Sorts the state-based character array based on score and name.
     *
     * @param state
     *
     * @return void
     */
    sort(state) {
      state.characters.sort((a, b) => {
        return a.roll !== b.roll

          // if the rolls aren't equal, return them in reverse order so the
          // higher rolls are at the top of the list.

          ? (a.roll > b.roll ? -1 : 1)

          // if the rolls are equal, for now we'll just return the names in
          // alpha order.  theoretically, we'll implement the edge, reaction,
          // intuition, chance order but that involves more data.

          : (a.name > b.name ? 1 : -1);
      });
    },

    /**
     * addCharacter
     *
     * Adds a grunt or a lieutenant based on whether or not the name parameter
     * is set when the method is called.
     *
     * @param state
     * @param name
     *
     * @return void
     */
    addCharacter(state, name) {

      // character code 64 is one letter before the capital A.  so when we add
      // our Goon count too it, the get named goon A, goon B, and so on.

      name = name || getMetatype() + ' ' + String.fromCharCode(64 + ++state.goons);
      state.characters.push(characters.addCharacter(name));
    },

    /**
     * removeCharacter
     *
     * If a character is removed from the field of play, this method removes
     * their record from the array.
     *
     * @param state
     * @param characterName
     *
     * @return void
     */
    removeCharacter(state, characterName) {
      state.characters = state.characters.filter((character) => character.name !== characterName);
    },

    /**
     * setCharacterProperty
     *
     * Sets a property of our Character object.  The data parameter contains
     * the index of the character, the property we're manipulating, and the
     * value to which we should set it.
     *
     * @param state
     * @param data
     *
     * @return void
     */
    setCharacterProperty(state, data) {
      const character = state.characters[data.index];
      character[data.property] = data.property !== 'notes'
        ? Number(data.value)
        : data.value;

      // if we just changed the characters initiative or dice properties, then
      // this should trigger a reroll of their base initiative score.

      if (data.property === 'initiative' || data.property === 'dice') {
        character.roll = roll(character);
      }

      // finally, when changing a variety of properties, their effective score
      // also needs to be recalculated.  for example, when a character is
      // damaged, it could impact their score.  if this wasn't a property that
      // would do so, then we use a bit of time to recalculate the same number,
      // but that's okay.

      character.score = calculateScore(character, state.phase);
    },

    /**
     * endPhase
     *
     * Ends a combat phase, recalculates scores, and if all scores are zero,
     * actually ends the combat turn.
     *
     * @param state
     *
     * @return void
     */
    endPhase(state) {
      recalculateScores(state.characters, ++state.phase, false);

      // we run a filter on our characters, keeping the ones that have a score
      // of zero.  then, the number that have a score of zero is the same as
      // the total number of characters, we end the tern.

      const zeros = state.characters.filter(character => character.score === 0);
      if (zeros.length === state.characters.length) {

        // because our assignment of the phase is in parenthesis, that happens
        // first.  then, the side-effect of that assignment is to return the
        // value of it, so we pass a 1 to the recalculate scores function.

        recalculateScores(state.characters, (state.phase = 1), true);
        alert('End of Turn');
      }
    }
  }
};

/**
 * getMetatype
 *
 * A function that returns a metatype for a goon added to a scene.  Based on
 * the metatype distributions in Seattle 2072.
 *
 * @return string
 */
function getMetatype() {
  const type = d(100);

  if (type <= 66) {
    return 'Human';
  } else if (type <= 79) {
    return 'Elf';
  } else if (type <= 81) {
    return 'Dwarf';
  } else if (type <= 97) {
    return 'Ork';
  } else if (type <= 99) {
    return 'Troll';
  } else {
    return 'Other';
  }
}

/**
 * d
 *
 * Rolls a dX where X is the number of sides passed as a paramenter, e.g. d100
 * or d6.
 *
 * @param sides
 *
 * @return number
 */
function d(sides) {
  return Math.floor(Math.random() * sides) + 1
}

/**
 * roll
 *
 * Rolls a character's initiative score based on the initiative and dice
 * properties.
 *
 * @param character
 *
 * @return number
 */
function roll(character) {
  let sum = Number(character.initiative);
  for (let i = 0; i < character.dice; i++) {
    sum += d(6);
  }

  return sum;
}

/**
 * recalculateScores
 *
 * Loops over the list of characters and re-calculates their scores.  If the
 * reroll flag is set, then interrupts are set to zero and NPCs' rools are
 * re-rolled, too.
 *
 * @param characters
 * @param phase
 * @param reroll
 *
 * @return void
 */
function recalculateScores(characters, phase, reroll) {
  characters.forEach((character) => {
    if (reroll) {
      character.interrupts = 0;
      if (character.type === 'npc') {
        character.roll = roll(character);
      }
    }

    character.score = calculateScore(character, phase);
  });
}

/**
 * calculateScore
 *
 * Given a character, calculates their effective initiative score starting
 * from their most recent roll and manipulating it based on the phase, their
 * damage, etc.
 *
 * @param character
 * @param phase
 *
 * @return number
 */
function calculateScore(character, phase) {

  // we start with their base roll minus ten for each combat phase after the
  // first.

  let score = character.roll - (10 * (phase - 1));

  // a character's damage factors into their score, too.  if they have the
  // low pain tolerance quality, then their score is reduced by one for every
  // two boxes of effective damage, otherwise it's one per three boxes.
  // effective damage is calculated based on their actual damage minus their
  // levels of high pain tolerance.  then, the floor of their effective damage
  // divided by the determined divisor is the initiative score modifier due to
  // damage.

  let divisor = character.lowPainTolerance ? 2 : 3;
  let effectiveDamage = character.damage - character.highPainTolerance;
  effectiveDamage = effectiveDamage < 0 ? 0 : effectiveDamage;
  score -= Math.floor(effectiveDamage / divisor);

  // finally, we subtract any spent score on interrupts during this turn.  as
  // characters perform interrupts, the sum of their cost is maintained in the
  // application state for us, so this is a simple subtraction.

  score -= character.interrupts;
  return score < 0 ? 0 : score;
}
