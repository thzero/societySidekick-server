import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';

import { gameSystems, gameSystemIds, id } from './helpers.js';

import Constants from '../constants.js';
import SharedConstants from '../common/constants.js';
import Pathfinder2eConstants from '../common/gameSystems/pathfinder2e/constants.js';
import Starfinder1eConstants from '../common/gameSystems/starfinder1e/constants.js';

const Types = Constants.ValidationSchemaTypes;

let services;
let utility;

before(async () => {
	({ services } = await gameSystems());
	utility = services[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_UTILITY];
});

const timestamp = Date.now();

function pathfinder2eScenario(overrides) {
	return {
		gameSystemId: gameSystemIds.pathfinder2e,
		scenarioId: id('scenario'),
		achievementPointsEarned: 4,
		currencyEarned: 20,
		experiencePointsEarned: 4,
		fameFactionId: id('faction'),
		order: 1,
		scenarioAdvancementSpeed: Pathfinder2eConstants.ScenarioAdvancementSpeeds.STANDARD,
		scenarioEvent: Pathfinder2eConstants.ScenarioEvents.STANDARD,
		scenarioParticipant: SharedConstants.ScenarioParticipants.PLAYER,
		scenarioStatus: SharedConstants.ScenarioStatus.REPLAY,
		status: SharedConstants.CharactersStatus.ACTIVE,
		timestamp,
		updatedTimestamp: timestamp,
		...overrides
	};
}

describe('UtilityGameSystemsService routing', () => {
	it('finds the services for each game system', () => {
		assert.equal(utility.characterByGameSystemId('test', gameSystemIds.pathfinder2e).results, services[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_PATHFINDER_2E]);
		assert.equal(utility.characterByGameSystemId('test', gameSystemIds.starfinder1e).results, services[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_STARFINDER_1E]);
		assert.equal(utility.scenarioByGameSystemId('test', gameSystemIds.pathfinder2e).results, services[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_PATHFINDER_2E]);
	});

	it('fails for a game system it does not support', () => {
		assert.equal(utility.characterByGameSystemId('test', SharedConstants.GameSystems.DungeonsAndDragons5e.id).success, false);
	});

	it('fails for an id that is not an id', () => {
		assert.equal(utility.characterByGameSystemId('test', '{"$ne":null}').success, false);
		assert.equal(utility.characterByGameSystemId('test', '').success, false);
	});

	it('fails validation without a game system, value or type', () => {
		assert.equal(utility.validateByGameSystemId('test', null, {}, Types.BoonCreate).success, false);
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.pathfinder2e, null, Types.BoonCreate).success, false);
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.pathfinder2e, {}, null).success, false);
	});

	it('fails validation for a type the game system does not know', () => {
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.pathfinder2e, {}, 'unknown').success, false);
	});
});

// Every type each game system handles has to resolve to a schema. These used
// to break on a misspelled type constant and misspelled schema method names.
describe('Game system schema lookup', () => {
	const lookups = {
		characters: [ Types.CharacterBoonCreate, Types.CharacterBoonUpdate, Types.CharacterDetailsUpdate, Types.CharacterInventoryCreate, Types.CharacterInventoryUpdate, Types.CharacterScenarioCreate, Types.CharacterScenarioUpdate ],
		scenarios: [ Types.ScenarioCreate, Types.ScenarioSearch, Types.ScenarioUpdate ],
		other: [ Types.BoonCreate, Types.BoonUpdate, Types.ClassCreate, Types.ClassUpdate, Types.EquipmentCreate, Types.EquipmentUpdate, Types.FactionCreate, Types.FactionUpdate, Types.UserSettingsSchema ]
	};

	// Starfinder 1e has no character boon list; its boons are slots in the details.
	const unsupported = {
		[gameSystemIds.starfinder1e]: [ Types.CharacterBoonCreate, Types.CharacterBoonUpdate ]
	};

	for (const [ name, gameSystemId ] of Object.entries(gameSystemIds)) {
		const key = name === 'pathfinder2e' ? 'PATHFINDER_2E' : 'STARFINDER_1E';
		const service = () => services[Constants.InjectorKeys['SERVICE_GAMESYSTEMS_' + key]];

		for (const type of lookups.characters) {
			if ((unsupported[gameSystemId] ?? []).includes(type))
				continue;
			it(`${name} has a ${type} schema`, () => {
				assert.ok(service().determineCharactersValidation('test', type));
			});
		}

		for (const type of lookups.scenarios) {
			it(`${name} has a ${type} schema`, () => {
				assert.ok(service().determineScenariosValidation('test', type));
			});
		}

		for (const type of lookups.other) {
			it(`${name} has a ${type} schema`, () => {
				assert.ok(service().determineValidation('test', type));
			});
		}
	}
});

describe('Pathfinder 2e validation', () => {
	const boon = (overrides) => ({ gameSystemId: gameSystemIds.pathfinder2e, name: 'Wayfinder', type: Pathfinder2eConstants.BoonTypes.GENERAL, ...overrides });

	it('accepts a boon of a known type', () => {
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.pathfinder2e, boon(), Types.BoonCreate).success, true);
	});

	it('rejects a boon type from another game system', () => {
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.pathfinder2e, boon({ type: Starfinder1eConstants.BoonTypes.STARSHIP }), Types.BoonCreate).success, false);
	});

	it('requires a level and known categories for equipment', () => {
		const equipment = { gameSystemId: gameSystemIds.pathfinder2e, name: 'Longsword', cost: 1, category: Pathfinder2eConstants.EquipmentCategories.WEAPON, bulk: '1', level: 0 };
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.pathfinder2e, equipment, Types.EquipmentCreate).success, true);
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.pathfinder2e, { ...equipment, bulk: 'L' }, Types.EquipmentCreate).success, true);
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.pathfinder2e, { ...equipment, category: 'spaceship' }, Types.EquipmentCreate).success, false);
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.pathfinder2e, { ...equipment, level: -1 }, Types.EquipmentCreate).success, false);
	});

	it('accepts a played scenario', () => {
		assert.equal(utility.characterValidateByGameSystemId('test', gameSystemIds.pathfinder2e, pathfinder2eScenario(), Types.CharacterScenarioCreate).success, true);
	});

	it('limits the experience, achievement points and gold of a played scenario', () => {
		for (const overrides of [ { experiencePointsEarned: 13 }, { achievementPointsEarned: 37 }, { currencyEarned: 100001 }, { currencyIncomeEarned: 1001 }, { currencyEarned: -1 } ])
			assert.equal(utility.characterValidateByGameSystemId('test', gameSystemIds.pathfinder2e, pathfinder2eScenario(overrides), Types.CharacterScenarioCreate).success, false, JSON.stringify(overrides));
	});

	it('requires a known event and advancement speed', () => {
		assert.equal(utility.characterValidateByGameSystemId('test', gameSystemIds.pathfinder2e, pathfinder2eScenario({ scenarioEvent: 'convention' }), Types.CharacterScenarioCreate).success, false);
		assert.equal(utility.characterValidateByGameSystemId('test', gameSystemIds.pathfinder2e, pathfinder2eScenario({ scenarioAdvancementSpeed: 'fast' }), Types.CharacterScenarioCreate).success, false);
	});

	it('validates a character boon update', () => {
		const value = { id: id('boon'), gameSystemId: gameSystemIds.pathfinder2e, boonId: id('boonId'), timestamp, updatedTimestamp: timestamp, used: false };
		assert.equal(utility.characterValidateByGameSystemId('test', gameSystemIds.pathfinder2e, value, Types.CharacterBoonUpdate).success, true);
		assert.equal(utility.characterValidateByGameSystemId('test', gameSystemIds.pathfinder2e, { ...value, id: undefined }, Types.CharacterBoonUpdate).success, false);
	});

	it('requires the adventure type on a scenario', () => {
		const value = { gameSystemId: gameSystemIds.pathfinder2e, name: '#1-01 The Absalom Initiation', scenario: '01', season: 1, type: Pathfinder2eConstants.ScenarioAdventures.SCENARIO };
		assert.equal(utility.scenarioValidateByGameSystemId('test', gameSystemIds.pathfinder2e, value, Types.ScenarioCreate).success, false, 'names may not start with #');
		assert.equal(utility.scenarioValidateByGameSystemId('test', gameSystemIds.pathfinder2e, { ...value, name: 'The Absalom Initiation' }, Types.ScenarioCreate).success, true);
		assert.equal(utility.scenarioValidateByGameSystemId('test', gameSystemIds.pathfinder2e, { ...value, name: 'The Absalom Initiation', type: undefined }, Types.ScenarioCreate).success, false);
	});

	it('allows the scenario adventure filter in user settings', () => {
		const value = { id: gameSystemIds.pathfinder2e, scenarioAdventureFilter: Pathfinder2eConstants.ScenarioAdventures.BOUNTY };
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.pathfinder2e, value, Types.UserSettingsSchema).success, true);
	});
});

describe('Starfinder 1e validation', () => {
	it('accepts a boon, class, equipment and faction to create', () => {
		const base = { gameSystemId: gameSystemIds.starfinder1e, name: 'Starship Ally' };
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.starfinder1e, { ...base, type: Starfinder1eConstants.BoonTypes.STARSHIP }, Types.BoonCreate).success, true);
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.starfinder1e, { ...base, type: Starfinder1eConstants.ClassTypes.THEME }, Types.ClassCreate).success, true);
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.starfinder1e, { ...base, cost: 10, category: Starfinder1eConstants.EquipmentCategories.ARMOR }, Types.EquipmentCreate).success, true);
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.starfinder1e, base, Types.FactionCreate).success, true);
	});

	it('rejects a boon type from another game system', () => {
		const value = { gameSystemId: gameSystemIds.starfinder1e, name: 'Wayfinder', type: Pathfinder2eConstants.BoonTypes.HEROIC };
		assert.equal(utility.validateByGameSystemId('test', gameSystemIds.starfinder1e, value, Types.BoonCreate).success, false);
	});
});
