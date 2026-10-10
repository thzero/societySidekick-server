import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { fake, gameSystems, gameSystemIds, id, success, user } from './helpers.js';

import Constants from '../constants.js';
import LibraryConstants from '@thzero/library_server/constants.js';
import SharedConstants from '../common/constants.js';
import Pathfinder2eConstants from '../common/gameSystems/pathfinder2e/constants.js';

import Pathfinder2eCharacterData from '../common/gameSystems/pathfinder2e/data/character.js';
import Pathfinder2eCharacterInventory from '../common/gameSystems/pathfinder2e/data/characterInventory.js';

import CharactersService from '../service/characters.js';

const timestamp = Date.now();

function character() {
	const value = new Pathfinder2eCharacterData();
	value.id = id('character');
	value.init(gameSystemIds.pathfinder2e, 'Valeros', 1, user);
	value.updatedTimestamp = timestamp;
	return value;
}

// The rules look the characters service up to total achievement points, so it
// is registered the way the app registers it.
async function create(value) {
	const repository = fake({
		fetch: () => success(value),
		listing: () => success({ data: [ value ] })
	});
	const users = fake();
	const service = new CharactersService();
	const { services } = await gameSystems({
		[Constants.InjectorKeys.REPOSITORY_CHARACTERS]: repository,
		[Constants.InjectorKeys.SERVICE_CHARACTERS]: service,
		[LibraryConstants.InjectorKeys.SERVICE_USERS]: users
	});
	return { repository, service, services, users };
}

describe('CharacterGameSystemsService (Pathfinder 2e)', () => {
	const service = async () => (await gameSystems()).services[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_PATHFINDER_2E];

	it('trims the name and tag line', async () => {
		const value = character();
		const response = (await service()).updateDetails('test', value, { name: '  Kyra ', tagLine: ' Cleric of Sarenrae ', status: SharedConstants.CharactersStatus.ACTIVE, number: 2 });
		assert.equal(response.success, true);
		assert.equal(value.name, 'Kyra');
		assert.equal(value.tagLine, 'Cleric of Sarenrae');
		assert.equal(value.number, 2);
	});

	it('rejects a name that is only spaces', async () => {
		const response = (await service()).updateDetails('test', character(), { name: '   ' });
		assert.equal(response.success, false);
	});

	it('totals inventory with the value being saved', async () => {
		const inventory = new Pathfinder2eCharacterInventory();
		inventory.value = 1;
		(await service()).updateInventory('test', inventory, { quantity: 4, value: 2.5 });
		assert.equal(inventory.value, 2.5);
		assert.equal(inventory.total, 10);
	});

	it('fills in the awards and level of a scenario', async () => {
		const value = character();
		const scenario = { order: 1, scenario: { type: Pathfinder2eConstants.ScenarioAdventures.ADVENTURE_PATH }, scenarioParticipant: SharedConstants.ScenarioParticipants.PLAYER, scenarioEvent: Pathfinder2eConstants.ScenarioEvents.STANDARD };
		(await service()).calculateScenario('test', value, scenario);
		assert.equal(scenario.experiencePointsEarned, 12);
		assert.equal(scenario.achievementPointsEarned, 12);
		assert.equal(scenario.level, 2);
	});

	it('clears the boon slots that held a deleted boon', async () => {
		const value = character();
		const boonId = id('boon');
		value.boonGeneric1Id = boonId;
		value.boonAdvancedId = id('other');
		(await service()).deleteBoon('test', value, boonId);
		assert.equal(value.boonGeneric1Id, null);
		assert.equal(value.boonAdvancedId, id('other'));
	});

	it('clears a boon slot when a scenario no longer awards that boon', async () => {
		const value = character();
		const boonId = id('boon');
		value.boonFactionId = boonId;
		const scenario = { boon1Id: boonId };
		(await service()).updateScenario('test', scenario, value, { boon1Id: null });
		assert.equal(value.boonFactionId, null);
		assert.equal(scenario.boon1Id, null);
	});
});

describe('CharactersService.updateBoon', () => {
	const boon = (overrides) => ({ gameSystemId: gameSystemIds.pathfinder2e, boonId: id('boonId'), timestamp, updatedTimestamp: timestamp, used: false, ...overrides });

	it('adds a new boon to the character', async () => {
		const value = character();
		const { repository, service } = await create(value);
		const response = await service.updateBoon('test', user, value.id, boon());
		assert.equal(response.success, true);
		assert.equal(value.boons.length, 1);
		assert.equal(value.boons[0].boonId, id('boonId'));
		assert.equal(value.boons[0].used, false);
		assert.equal(repository.calls.update[0][2], value);
	});

	it('updates an existing boon in place', async () => {
		const value = character();
		const { service } = await create(value);
		await service.updateBoon('test', user, value.id, boon());
		const existing = value.boons[0];
		const response = await service.updateBoon('test', user, value.id, boon({ id: existing.id, used: true }));
		assert.equal(response.success, true);
		assert.equal(value.boons.length, 1);
		assert.equal(value.boons[0].used, true);
	});

	it('rejects a boon that is out of date', async () => {
		const value = character();
		const { repository, service } = await create(value);
		const response = await service.updateBoon('test', user, value.id, boon({ updatedTimestamp: timestamp + 1 }));
		assert.equal(response.success, false);
		assert.equal(repository.calls.update, undefined);
	});
});

describe('CharactersService deletes', () => {
	it('deletes a boon and clears the slot that held it', async () => {
		const value = character();
		const boonId = id('boonId');
		value.boons.push({ id: id('characterBoon'), boonId });
		value.boonGeneric2Id = boonId;
		const { repository, service, users } = await create(value);
		const response = await service.deleteBoon('test', user, value.id, id('characterBoon'));
		assert.equal(response.success, true);
		assert.deepEqual(value.boons, []);
		assert.equal(value.boonGeneric2Id, null);
		assert.equal(repository.calls.update.length, 1);
		assert.equal(users.calls.updateSettings.length, 1);
	});

	it('deletes inventory and recalculates the gold', async () => {
		const value = character();
		const item = Object.assign(new Pathfinder2eCharacterInventory(), { boughtScenarioId: value.scenarios[0].id, quantity: 1, value: 5 });
		value.inventory.push(item);
		const { service } = await create(value);
		const response = await service.deleteInventory('test', user, value.id, item.id);
		assert.equal(response.success, true);
		assert.deepEqual(value.inventory, []);
		assert.equal(value.currencyTotal, 15);
	});

	it('fails for inventory the character does not have', async () => {
		const value = character();
		const { repository, service } = await create(value);
		const response = await service.deleteInventory('test', user, value.id, id('missing'));
		assert.equal(response.success, false);
		assert.equal(repository.calls.update, undefined);
	});

	it('fails for a scenario the character does not have', async () => {
		const value = character();
		const { repository, service } = await create(value);
		const response = await service.deleteScenario('test', user, value.id, id('missing'));
		assert.equal(response.success, false);
		assert.equal(repository.calls.update, undefined);
	});

	it('fails for a boon the character does not have', async () => {
		const value = character();
		const { service } = await create(value);
		assert.equal((await service.deleteBoon('test', user, value.id, id('missing'))).success, false);
	});
});
