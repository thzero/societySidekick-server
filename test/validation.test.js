import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { gameSystemIds, id, validation } from './helpers.js';

import SharedConstants from '../common/constants.js';

const accepts = (schema, value) => !schema.validate(value).error;

describe('JoiValidationService.characterNewSchema', () => {
	const value = (overrides) => ({ gameSystemId: gameSystemIds.pathfinder2e, name: 'Valeros', number: 1, ...overrides });

	it('accepts a new character', () => {
		assert.ok(accepts(validation.characterNewSchema, value()));
	});

	it('limits the character number to 1 through 99', () => {
		assert.ok(accepts(validation.characterNewSchema, value({ number: 99 })));
		assert.ok(!accepts(validation.characterNewSchema, value({ number: 0 })));
		assert.ok(!accepts(validation.characterNewSchema, value({ number: 100 })));
	});

	it('requires a game system id that is an id', () => {
		assert.ok(!accepts(validation.characterNewSchema, value({ gameSystemId: undefined })));
		assert.ok(!accepts(validation.characterNewSchema, value({ gameSystemId: 'pathfinder2e' })));
	});

	it('rejects a name that does not start with a letter or digit', () => {
		assert.ok(!accepts(validation.characterNewSchema, value({ name: '-Valeros' })));
		assert.ok(!accepts(validation.characterNewSchema, value({ name: 'ab' })));
	});
});

describe('JoiValidationService.settingRequestSchema', () => {
	const schema = validation.settingRequestSchema();
	const request = (settings) => ({ userId: id('user'), settings });

	it('accepts the gamer tag alongside the app settings', () => {
		assert.ok(accepts(schema, request({
			gamerTag: 'Valeros',
			boons: { sortBy: SharedConstants.SortBy.Boons.BoonName, sortDirection: true },
			characters: { listingStyleFilter: SharedConstants.ListingTypes.Grid },
			favorites: [ { id: id('favorite'), favorite: true } ],
			home: { gameSystemFilter: gameSystemIds.pathfinder2e, tab: 1 },
			scenarios: { additional: [ { id: gameSystemIds.pathfinder2e } ], seasonFilter: 2 }
		})));
	});

	it('rejects a gamer tag with spaces', () => {
		assert.ok(!accepts(schema, request({ gamerTag: 'Valeros The Fighter' })));
	});

	it('rejects unknown sort and listing values', () => {
		assert.ok(!accepts(schema, request({ boons: { sortBy: 'price' } })));
		assert.ok(!accepts(schema, request({ characters: { listingStyleFilter: 'table' } })));
	});

	it('rejects an unknown settings section', () => {
		assert.ok(!accepts(schema, request({ unknown: {} })));
	});

	it('validates gear sets', () => {
		const gearSet = (inventory) => ({ gameSystems: [ { id: gameSystemIds.pathfinder2e, gearSets: [ { id: id('gearSet'), name: 'Starter', inventory } ] } ] });
		assert.ok(accepts(schema, request(gearSet([ { item: 'Rope (50 ft)', quantity: 1, value: 0.1 } ]))));
		assert.ok(!accepts(schema, request(gearSet([ { item: 'Rope', quantity: 1 } ]))));
		assert.ok(!accepts(schema, request(gearSet([ { item: 'Rope; drop', quantity: 1, value: 1 } ]))));
	});

	it('validates locations', () => {
		const location = (name) => ({ locations: [ { id: id('location'), name, online: false } ] });
		assert.ok(accepts(schema, request(location("Paizo's Game Day"))));
		assert.ok(accepts(schema, request(location('Games & Things, Inc.'))));
		assert.ok(!accepts(schema, request(location('<script>'))));
	});
});

describe('JoiValidationService.check', () => {
	it('returns success for a valid value', () => {
		assert.equal(validation.check('test', validation.idSchema, gameSystemIds.pathfinder2e).success, true);
	});

	it('returns a failed response for an invalid value', () => {
		assert.equal(validation.check('test', validation.idSchema, '../x').success, false);
	});
});
