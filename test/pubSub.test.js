import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { fake, injector, success } from './helpers.js';

import AppConstants from '../constants.js';

import PubSubService from '../service/pubSub.js';

async function create() {
	const repository = fake();
	const service = new PubSubService();
	await service.init(injector({ [AppConstants.InjectorKeys.REPOSITORY_PUBSUB]: repository }));
	return { repository, service };
}

describe('PubSubService', () => {
	it('calls the registered hook with its parent as this', async () => {
		const { service } = await create();
		const parent = { name: 'parent' };
		let seen;
		await service.registerHook('test', 'thing', parent, async function(correlationId, message) {
			seen = { self: this, correlationId, message };
			return success('done');
		});

		const message = { type: 'thing', params: 1 };
		const response = await service.perform('test', message);

		assert.equal(response.success, true);
		assert.equal(response.results, 'done');
		assert.equal(seen.self, parent);
		assert.equal(seen.correlationId, 'test');
		assert.equal(seen.message, message);
	});

	it('fails for a type with no hook', async () => {
		const { service } = await create();
		const response = await service.perform('test', { type: 'missing' });
		assert.equal(response.success, false);
	});

	it('fails for a message without a type', async () => {
		const { service } = await create();
		assert.equal((await service.perform('test', {})).success, false);
		assert.equal((await service.perform('test', null)).success, false);
	});

	it('turns a throwing hook into a failed response', async () => {
		const { service } = await create();
		await service.registerHook('test', 'boom', {}, async () => { throw new Error('boom'); });
		const response = await service.perform('test', { type: 'boom' });
		assert.equal(response.success, false);
	});

	it('sends through the repository', async () => {
		const { repository, service } = await create();
		await service.send('test', 'cleanup', 'all');
		assert.deepEqual(repository.calls.send, [ [ 'test', 'cleanup', 'all' ] ]);
	});

	it('requires a type to send', async () => {
		const { service } = await create();
		await assert.rejects(service.send('test', '', 'rocketry'));
	});
});
