import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';

import { injector } from './helpers.js';

import SecurityService from '../service/security.js';

const service = new SecurityService();
const can = (roles, role) => service.authorizationCheckRoles('test', { roles }, [ role ]);

describe('SecurityService roles', () => {
	before(async () => {
		await service.init(injector());
	});

	it('lets a user work with characters and their own account', async () => {
		for (const role of [ 'character', 'character:edit', 'character:delete', 'user' ])
			assert.equal(await can([ 'user' ], role), true, role);
	});

	it('keeps a user out of admin operations', async () => {
		for (const role of [ 'admin', 'boons:create', 'news:create', 'scenarios:delete', 'users:delete' ])
			assert.equal(await can([ 'user' ], role), false, role);
	});

	it('gives an admin the admin operations', async () => {
		for (const role of [ 'boons:create', 'classes:update', 'equipment:delete', 'factions:edit', 'news:create', 'scenarios:search', 'users:claims:edit' ])
			assert.equal(await can([ 'admin' ], role), true, role);
	});

	it('gives an admin the user operations through inheritance', async () => {
		assert.equal(await can([ 'admin' ], 'character:edit'), true);
		assert.equal(await can([ 'admin' ], 'user'), true);
	});

	it('gives a super admin everything an admin has', async () => {
		for (const role of [ 'boons:create', 'character', 'user', 'users:delete' ])
			assert.equal(await can([ 'superAdmin' ], role), true, role);
	});

	it('denies an unknown role', async () => {
		assert.equal(await can([ 'guest' ], 'character'), false);
		assert.equal(await can([], 'character'), false);
	});

	it('denies an operation nobody has', async () => {
		assert.equal(await can([ 'superAdmin' ], 'billing'), false);
	});

	// Routes name roles as obj.act, which the service turns into obj:act.
	it('matches the dotted role names routes use', async () => {
		assert.equal(await can([ 'user' ], 'character.edit'), true);
		assert.equal(await can([ 'admin' ], 'boons.create'), true);
		assert.equal(await can([ 'user' ], 'boons.create'), false);
	});
});
