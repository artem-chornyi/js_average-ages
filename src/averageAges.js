'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century = 0) {
  let men = people.filter(person => person.sex === 'm');

  const averageAge = century === 0
    ? men.map(person => person.died - person.born)
    : (men = men.filter(person => Math.ceil(person.died / 100) === century),
    men.map(person => person.died - person.born));

  return averageAge.reduce((count, person) => count + person)
    / averageAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  const woman = people.filter(person => person.sex === 'f');
  const womanMother = people.filter(person =>
    people.find(child => child.mother === person.name));

  const averageAge = !withChildren
    ? woman.map(person => person.died - person.born)
    : womanMother.map(person => person.died - person.born);

  return averageAge.reduce((count, person) => count + person)
    / averageAge.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(human => !onlyWithSon
    ? people.find(person => person.name === human.mother)
    : people.find(person => person.name === human.mother)
    && human.sex === 'm');

  const difference = children.map(
    age => age.born - people.find(person => person.name === age.mother).born);

  return difference.reduce(
    (count, person) => count + person) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
