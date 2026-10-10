import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { gameSystems, gameSystemIds, id, user } from './helpers.js';

import Constants from '../constants.js';
import Starfinder1eConstants from '../common/gameSystems/starfinder1e/constants.js';

import Starfinder1eCharacterData from '../common/gameSystems/starfinder1e/data/character.js';
import Starfinder1eCharacterScenario from '../common/gameSystems/starfinder1e/data/characterScenario.js';

async function create() {
	const { services } = await gameSystems();
	return services[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E];
}

// A new character carries the initial scenario, order 0, with 1000 credits.
function character(...scenarios) {
	const value = new Starfinder1eCharacterData();
	value.init(gameSystemIds.starfinder1e, 'Obozaya', 1, user);
	for (const item of scenarios)
		value.scenarios.push(item);
	return value;
}

function scenario(order, overrides) {
	return Object.assign(new Starfinder1eCharacterScenario(), { order, currencyEarned: 0 }, overrides);
}

describe('Starfinder1eRules levels', () => {
	it('levels up every 3 experience points', async () => {
		const rules = await create();
		assert.equal(rules.calculateLevel('test', 0), 1);
		assert.equal(rules.calculateLevel('test', 2), 1);
		assert.equal(rules.calculateLevel('test', 3), 2);
		assert.equal(rules.calculateExperienceToNextLevel('test', 1), 2);
	});

	it('treats only scenarios as adventure scenarios', async () => {
		const rules = await create();
		assert.equal(rules.isAdventureScenario('test', { scenario: { type: Starfinder1eConstants.ScenarioAdventures.SCENARIO } }), true);
		assert.equal(rules.isAdventureScenario('test', { scenario: { type: Starfinder1eConstants.ScenarioAdventures.MODULE } }), false);
		assert.equal(rules.isAdventureScenario('test', null), false);
	});
});

describe('Starfinder1eRules.calculateCharacter', () => {
	it('starts a new character at level 1 with 1000 credits', async () => {
		const rules = await create();
		const value = character();
		await rules.calculateCharacter('test', value);
		assert.equal(value.level, 1);
		assert.equal(value.currencyTotal, 1000);
	});

	it('adds experience points and credits', async () => {
		const rules = await create();
		const value = character(scenario(1, { currencyEarned: 400.5 }), scenario(2, { currencyEarned: 300, currencySpent: 100 }), scenario(3));
		await rules.calculateCharacter('test', value);
		assert.equal(value.experiencePoints, 3);
		assert.equal(value.level, 2);
		assert.equal(value.currencyTotal, 1600.5);
	});

	it('counts a class level for every scenario that names a class', async () => {
		const rules = await create();
		const soldier = id('soldier');
		const mystic = id('mystic');
		const value = character(scenario(1, { classId: soldier }), scenario(2, { classId: soldier }), scenario(3, { classId: mystic }));
		await rules.calculateCharacter('test', value);
		assert.deepEqual(value.classes, [ { id: soldier, level: 2 }, { id: mystic, level: 1 } ]);
		assert.equal(value.class, undefined);
	});

	it('totals fame by faction and adds it to reputation', async () => {
		const rules = await create();
		const faction = id('faction');
		const value = character(scenario(1, { fameFactionId: faction, fameEarned: 2 }), scenario(2, { fameFactionId: faction, fameEarned: 2, fameSpent: 1 }));
		await rules.calculateCharacter('test', value);
		assert.deepEqual(value.fame, [
			{ id: faction, earned: 4, spent: 1, remaining: 3 },
			{ earned: 4, spent: 1, remaining: 3 }
		]);
		assert.equal(value.reputationEarned, 4);
	});

	// common/gameSystems/starfinder1e/data/character.js stamps the initial
	// scenario with the Pathfinder 2e id. The fix belongs in societySidekick-common.
	it('gives the initial scenario the Starfinder game system', { todo: 'starfinder1e initial scenario gameSystemId' }, () => {
		assert.equal(character().scenarios[0].gameSystemId, gameSystemIds.starfinder1e);
	});
});
