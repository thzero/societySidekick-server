import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { fake, gameSystems, gameSystemIds, id, success, user } from './helpers.js';

import Constants from '../constants.js';
import SharedConstants from '../common/constants.js';
import Pathfinder2eConstants from '../common/gameSystems/pathfinder2e/constants.js';

import Pathfinder2eCharacterData from '../common/gameSystems/pathfinder2e/data/character.js';
import Pathfinder2eCharacterInventory from '../common/gameSystems/pathfinder2e/data/characterInventory.js';
import Pathfinder2eCharacterScenario from '../common/gameSystems/pathfinder2e/data/characterScenario.js';

const Adventures = Pathfinder2eConstants.ScenarioAdventures;
const Events = Pathfinder2eConstants.ScenarioEvents;
const Participants = SharedConstants.ScenarioParticipants;

async function create(services) {
	const { services: map } = await gameSystems(services);
	return map[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E];
}

// A new character carries the initial scenario, order 0, with 15 gold.
function character(...scenarios) {
	const value = new Pathfinder2eCharacterData();
	value.id = id('character');
	value.init(gameSystemIds.pathfinder2e, 'Valeros', 1, user);
	for (const item of scenarios)
		value.scenarios.push(item);
	return value;
}

function scenario(order, overrides) {
	return Object.assign(new Pathfinder2eCharacterScenario(), { order, experiencePointsEarned: 4, currencyEarned: 0 }, overrides);
}

function inventory(overrides) {
	return Object.assign(new Pathfinder2eCharacterInventory(), overrides);
}

describe('Pathfinder2eRules levels', () => {
	it('levels up every 12 experience points', async () => {
		const rules = await create();
		assert.equal(rules.calculateLevel('test', 0), 1);
		assert.equal(rules.calculateLevel('test', 11), 1);
		assert.equal(rules.calculateLevel('test', 12), 2);
		assert.equal(rules.calculateLevel('test', 48), 5);
	});

	it('counts the experience points left to the next level', async () => {
		const rules = await create();
		assert.equal(rules.calculateExperienceToNextLevel('test', 0), 12);
		assert.equal(rules.calculateExperienceToNextLevel('test', 4), 8);
		assert.equal(rules.calculateExperienceToNextLevel('test', 12), 12);
	});
});

describe('Pathfinder2eRules scenario awards', () => {
	const played = (type, overrides) => ({ scenario: { type }, scenarioParticipant: Participants.PLAYER, scenarioEvent: Events.STANDARD, ...overrides });

	it('awards experience points by adventure type', async () => {
		const rules = await create();
		assert.equal(rules.calculateScenarioExperiencePointsEarned('test', played(Adventures.SCENARIO)), 4);
		assert.equal(rules.calculateScenarioExperiencePointsEarned('test', played(Adventures.BOUNTY)), 1);
		assert.equal(rules.calculateScenarioExperiencePointsEarned('test', played(Adventures.QUEST)), 1);
		assert.equal(rules.calculateScenarioExperiencePointsEarned('test', played(Adventures.ADVENTURE_PATH)), 12);
		assert.equal(rules.calculateScenarioExperiencePointsEarned('test', played(Adventures.ADVENTURE)), 0);
	});

	it('keeps the entered experience points for a module', async () => {
		const rules = await create();
		assert.equal(rules.calculateScenarioExperiencePointsEarned('test', played(Adventures.MODULE, { experiencePointsEarned: 7 })), 7);
	});

	it('halves downtime at slow advancement', async () => {
		const rules = await create();
		assert.equal(rules.calculateScenarioDowntimePointsEarned('test', played(Adventures.SCENARIO)), 8);
		assert.equal(rules.calculateScenarioDowntimePointsEarned('test', played(Adventures.SCENARIO, { scenarioAdvancementSpeed: Pathfinder2eConstants.ScenarioAdvancementSpeeds.SLOW })), 4);
	});

	it('looks up achievement points by type, participant and event', async () => {
		const rules = await create();
		assert.equal(rules.calculateScenarioAchievementPointsEarned('test', played(Adventures.SCENARIO)), 4);
		assert.equal(rules.calculateScenarioAchievementPointsEarned('test', played(Adventures.SCENARIO, { scenarioParticipant: Participants.GAMEMASTER, scenarioEvent: Events.PREMIER_PLUS })), 12);
		assert.equal(rules.calculateScenarioAchievementPointsEarned('test', played(Adventures.BOUNTY, { scenarioEvent: Events.PREMIER_PLUS })), 1.5);
	});

	it('awards nothing for an unknown or missing scenario', async () => {
		const rules = await create();
		assert.equal(rules.calculateScenarioAchievementPointsEarned('test', played('unknown')), 0);
		assert.equal(rules.calculateScenarioExperiencePointsEarned('test', null), 0);
		assert.equal(rules.calculateScenarioDowntimePointsEarned('test', null), 0);
	});

	it('fills in every award with calculateScenario', async () => {
		const rules = await create();
		const value = played(Adventures.SCENARIO);
		rules.calculateScenario('test', value);
		assert.equal(value.achievementPointsEarned, 4);
		assert.equal(value.downtimePointsEarned, 8);
		assert.equal(value.experiencePointsEarned, 4);
		assert.equal(value.fameEarned, 4);
	});

	it('treats only adventures and modules as not adventure scenarios', async () => {
		const rules = await create();
		assert.equal(rules.isAdventureScenario('test', played(Adventures.SCENARIO)), true);
		assert.equal(rules.isAdventureScenario('test', played(Adventures.ADVENTURE)), false);
		assert.equal(rules.isAdventureScenario('test', played(Adventures.MODULE)), false);
	});
});

describe('Pathfinder2eRules.calculateCharacter', () => {
	it('fails without a character', async () => {
		const rules = await create();
		assert.equal((await rules.calculateCharacter('test', null)).success, false);
	});

	it('starts a new character at level 1 with 15 gold', async () => {
		const rules = await create();
		const value = character();
		const response = await rules.calculateCharacter('test', value);
		assert.equal(response.success, true);
		assert.equal(value.level, 1);
		assert.equal(value.experiencePoints, 0);
		assert.equal(value.experiencePointsToNextLevel, 12);
		assert.equal(value.currencyTotal, 15);
		assert.deepEqual(value.fame, [ { earned: 0, spent: 0, remaining: 0 } ]);
	});

	it('adds up experience points in scenario order', async () => {
		const rules = await create();
		const value = character(scenario(3), scenario(1), scenario(2));
		await rules.calculateCharacter('test', value);
		assert.equal(value.experiencePoints, 12);
		assert.equal(value.level, 2);
		const levels = value.scenarios.filter(l => l.order > 0).sort((a, b) => a.order - b.order).map(l => l.experiencePoints);
		assert.deepEqual(levels, [ 4, 8, 12 ]);
	});

	it('skips ignored and repeated scenarios', async () => {
		const rules = await create();
		const value = character(
			scenario(1),
			scenario(2, { scenarioStatus: SharedConstants.ScenarioStatus.IGNORE, currencyEarned: 100 }),
			scenario(3, { scenarioStatus: SharedConstants.ScenarioStatus.REPEATED, currencyEarned: 100 }));
		await rules.calculateCharacter('test', value);
		assert.equal(value.experiencePoints, 4);
		assert.equal(value.currencyTotal, 15);
	});

	it('takes the status of a scenario that ended the character', async () => {
		const rules = await create();
		const value = character(scenario(1), scenario(2, { status: SharedConstants.CharactersStatus.DEAD }));
		await rules.calculateCharacter('test', value);
		assert.equal(value.status, SharedConstants.CharactersStatus.DEAD);
		assert.equal(value.experiencePoints, 4);
	});

	it('tracks earned, income and spent gold', async () => {
		const rules = await create();
		const played = scenario(1, { currencyEarned: 20.5, currencyIncomeEarned: 1.25, currencySpent: 5 });
		const value = character(played);
		await rules.calculateCharacter('test', value);
		assert.equal(value.currencyEarned, 35.5);
		assert.equal(value.currencyIncomeEarned, 1.25);
		assert.equal(value.currencyGained, 36.75);
		assert.equal(value.currencySpent, 5);
		assert.equal(value.currencyTotal, 31.75);
		assert.equal(played.currencySpendable, 31.75);
	});

	it('charges bought inventory to the scenario it was bought in', async () => {
		const rules = await create();
		const played = scenario(1, { currencyEarned: 20 });
		const value = character(played);
		value.inventory.push(inventory({ boughtScenarioId: played.id, quantity: 3, value: 2.5 }));
		await rules.calculateCharacter('test', value);
		assert.equal(value.inventory[0].total, 7.5);
		assert.equal(played.currencyBought, 7.5);
		assert.equal(value.currencyBought, 7.5);
		assert.equal(value.currencyTotal, 27.5);
	});

	it('leaves out the inventory being edited', async () => {
		const rules = await create();
		const played = scenario(1, { currencyEarned: 20 });
		const value = character(played);
		const item = inventory({ boughtScenarioId: played.id, quantity: 1, value: 10 });
		value.inventory.push(item);
		await rules.calculateCharacter('test', value, null, item.id);
		assert.equal(value.currencyTotal, 35);
	});

	it('returns half the value of sold inventory to the character', async () => {
		const rules = await create();
		const bought = scenario(1, { currencyEarned: 20 });
		const sold = scenario(2);
		const value = character(bought, sold);
		value.inventory.push(inventory({ boughtScenarioId: bought.id, soldScenarioId: sold.id, quantity: 1, value: 10 }));
		await rules.calculateCharacter('test', value);
		assert.equal(value.currencySold, 5);
		assert.equal(value.currencyTotal, 30);
	});

	it('records the sold half value on the scenario it was sold in', async () => {
		const rules = await create();
		const bought = scenario(1, { currencyEarned: 20 });
		const sold = scenario(2);
		const value = character(bought, sold);
		value.inventory.push(inventory({ boughtScenarioId: bought.id, soldScenarioId: sold.id, quantity: 1, value: 10 }));
		await rules.calculateCharacter('test', value);
		assert.equal(sold.currencySold, 5);
		assert.equal(sold.currencyGained, 5);
		assert.equal(sold.currencySpendable, 30);
	});

	it('sells inventory that has no stored total', async () => {
		const rules = await create();
		const sold = scenario(1);
		const value = character(sold);
		value.inventory.push(inventory({ boughtScenarioId: id('elsewhere'), soldScenarioId: sold.id, quantity: 2, value: 3 }));
		await rules.calculateCharacter('test', value);
		assert.equal(sold.currencySold, 3);
		assert.equal(value.currencyTotal, 18);
	});

	it('totals fame by faction', async () => {
		const rules = await create();
		const factionA = id('factionA');
		const factionB = id('factionB');
		const value = character(
			scenario(1, { fameFactionId: factionA, fameEarned: 4 }),
			scenario(2, { fameFactionId: factionA, fameEarned: 4, fameSpent: 3 }),
			scenario(3, { fameFactionId: factionB, fameEarned: 2 }));
		await rules.calculateCharacter('test', value);
		assert.deepEqual(value.fame, [
			{ id: factionA, earned: 8, spent: 3, remaining: 5 },
			{ id: factionB, earned: 2, spent: 0, remaining: 2 },
			{ earned: 10, spent: 3, remaining: 7 }
		]);
		assert.equal(value.factionF, undefined);
	});

	it('totals reputation including the additional faction', async () => {
		const rules = await create();
		const factionA = id('factionA');
		const factionB = id('factionB');
		const value = character(
			scenario(1, { reputationFactionId: factionA, reputationEarned: 4, reputationAdditionalFactionId: factionB, reputationAdditionalEarned: 2 }),
			scenario(2, { reputationFactionId: factionB, reputationEarned: 1 }));
		await rules.calculateCharacter('test', value);
		assert.deepEqual(value.reputation, [ { id: factionA, earned: 4 }, { id: factionB, earned: 3 } ]);
		assert.equal(value.factionR, undefined);
	});

	it('adds up achievement points', async () => {
		const rules = await create();
		const value = character(scenario(1, { achievementPointsEarned: 4 }), scenario(2, { achievementPointsEarned: 12 }));
		await rules.calculateCharacter('test', value);
		assert.equal(value.achievementPoints, 16);
	});

	it("adds the user's other characters into the achievement points setting", async () => {
		const value = character(scenario(1, { achievementPointsEarned: 4 }));
		const characters = fake({
			listing: () => success({ data: [ { id: id('other'), achievementPoints: 10 }, { id: value.id, achievementPoints: 99 }, { id: id('none') } ] })
		});
		const rules = await create({ [Constants.InjectorKeys.SERVICE_CHARACTERS]: characters });
		const settings = { id: gameSystemIds.pathfinder2e };
		await rules.calculateCharacter('test', value, { ...user, settings: { gameSystems: [ settings ] } });
		assert.equal(settings.achievementPoints, 14);
		assert.equal(characters.calls.listing.length, 1);
	});

	it('adds the game system settings when the user has none yet', async () => {
		const value = character(scenario(1, { achievementPointsEarned: 4 }));
		const characters = fake({ listing: () => success({ data: [ { id: id('other'), achievementPoints: 10 } ] }) });
		const rules = await create({ [Constants.InjectorKeys.SERVICE_CHARACTERS]: characters });
		const owner = { ...user, settings: { gameSystems: [] } };
		await rules.calculateCharacter('test', value, owner);
		assert.equal(owner.settings.gameSystems.length, 1);
		assert.equal(owner.settings.gameSystems[0].id, gameSystemIds.pathfinder2e);
		assert.equal(owner.settings.gameSystems[0].achievementPoints, 14);
	});
});

describe('Pathfinder2eRules.calculateScenarioLevel', () => {
	it('levels from the scenarios played before it plus its own', async () => {
		const rules = await create();
		const third = scenario(3);
		const value = character(scenario(1), scenario(2), third, scenario(4));
		assert.equal(rules.calculateScenarioLevel('test', value, third), 2);
		assert.equal(rules.calculateScenarioLevel('test', value, scenario(2)), 1);
	});

	it('leaves out ignored scenarios', async () => {
		const rules = await create();
		const third = scenario(3);
		const value = character(scenario(1), scenario(2, { scenarioStatus: SharedConstants.ScenarioStatus.IGNORE }), third);
		assert.equal(rules.calculateScenarioLevel('test', value, third), 1);
	});

	it('counts a new scenario that is not on the character yet', async () => {
		const rules = await create();
		const value = character(scenario(1), scenario(2));
		assert.equal(rules.calculateScenarioLevel('test', value, scenario(3)), 2);
	});

	it('returns null without a character or scenario', async () => {
		const rules = await create();
		assert.equal(rules.calculateScenarioLevel('test', null, scenario(1)), null);
		assert.equal(rules.calculateScenarioLevel('test', character(), null), null);
	});
});

describe('Pathfinder2eRules currency helpers', () => {
	it('multiplies quantity by value', async () => {
		const rules = await create();
		assert.equal(rules.calculateItemTotalFixed('test', 3, 0.1), 0.3);
		assert.equal(rules.calculateItemTotal('test', 3, 0.1), 0.3);
		assert.equal(rules.calculateItemTotal('test', 0, 5), 0);
		assert.equal(rules.calculateItemTotal('test', 2, null), 0);
	});

	it('subtracts from the current gold', async () => {
		const rules = await create();
		assert.equal(rules.calculateCharacterCurrencyCurrent('test', { currencyTotal: 10.5 }, 0.25), 10.25);
		assert.equal(rules.calculateCharacterCurrencyCurrent('test', null, 1), 0);
		assert.equal(rules.calculateCharacterCurrencyScenario('test', { currencySpendable: 4 }, 1.5), 2.5);
	});
});
