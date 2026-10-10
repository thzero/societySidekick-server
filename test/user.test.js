import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { fake, gameSystems, gameSystemIds, id, success } from './helpers.js';

import Constants from '../constants.js';
import LibraryConstants from '@thzero/library_server/constants.js';
import SharedConstants from '../common/constants.js';

import UserData from '../common/data/user.js';
import UserService from '../service/user.js';

async function create(handlers = {}) {
	const repository = fake({ valid: () => success(false), ...handlers });
	const { injector } = await gameSystems({ [LibraryConstants.InjectorKeys.REPOSITORY_USERS]: repository });
	const service = new UserService();
	await service.init(injector);
	return { repository, service };
}

const settings = (additional) => ({ userId: id('user'), settings: { gamerTag: 'Valeros', scenarios: { additional } } });

describe('UserService._updateSettings', () => {
	it('trims the gamer tag and builds its search key', async () => {
		const service = new UserService();
		const requested = { settings: { gamerTag: '  Valeros The Fighter ' } };
		const response = await service._updateSettings('test', requested);
		assert.equal(response.success, true);
		assert.equal(requested.settings.gamerTag, 'Valeros The Fighter');
		assert.equal(requested.settings.gamerTagSearch, 'valerosthefighter');
	});

	it('clears both when there is no gamer tag', async () => {
		const service = new UserService();
		const requested = { settings: { gamerTag: '', gamerTagSearch: 'stale' } };
		await service._updateSettings('test', requested);
		assert.equal(requested.settings.gamerTag, null);
		assert.equal(requested.settings.gamerTagSearch, null);
	});
});

describe('UserService._updateSettingsValidation', () => {
	it('accepts settings for each game system', async () => {
		const { service } = await create();
		const response = await service._updateSettingsValidation('test', settings([ { id: gameSystemIds.pathfinder2e }, { id: gameSystemIds.starfinder1e } ]));
		assert.equal(response.success, true);
	});

	it('reports a gamer tag someone else has', async () => {
		const { repository, service } = await create({ valid: () => success(true) });
		const response = await service._updateSettingsValidation('test', settings());
		assert.equal(response.success, false);
		assert.equal(response.errors[0].code, SharedConstants.ErrorCodes.DuplicateGamerTag);
		assert.deepEqual(repository.calls.valid[0].slice(1), [ id('user'), 'Valeros' ]);
	});

	it('rejects scenario settings for an unknown game system', async () => {
		const { service } = await create();
		assert.equal((await service._updateSettingsValidation('test', settings([ { id: id('unknown') } ]))).success, false);
		assert.equal((await service._updateSettingsValidation('test', settings([ { id: 'bad' } ]))).success, false);
	});

	it('rejects scenario settings the game system does not allow', async () => {
		const { service } = await create();
		const response = await service._updateSettingsValidation('test', settings([ { id: gameSystemIds.starfinder1e, sortBy: 'name' } ]));
		assert.equal(response.success, false);
	});
});

describe('UserService defaults', () => {
	it('starts new users on the basic plan as a user', () => {
		const service = new UserService();
		assert.equal(service._getDefaultPlan(), Constants.Plans.BASIC);
		assert.equal(service._getDefaultUserRole(), SharedConstants.Roles.User);
		assert.ok(service._initiateUser() instanceof UserData);
	});
});
