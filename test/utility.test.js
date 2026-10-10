import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import './helpers.js';

import AppUtility from '../utility/app.js';
import DecimalUtility from '../common/utility/decimal.js';

describe('AppUtility.generateGamerTagSearch', () => {
	it('strips spaces and lowercases', () => {
		assert.equal(AppUtility.generateGamerTagSearch('Valeros The Fighter'), 'valerosthefighter');
	});

	it('returns null for an empty tag', () => {
		assert.equal(AppUtility.generateGamerTagSearch(''), null);
		assert.equal(AppUtility.generateGamerTagSearch(null), null);
		assert.equal(AppUtility.generateGamerTagSearch(undefined), null);
	});
});

describe('DecimalUtility', () => {
	it('cleans a value to the given places', () => {
		assert.equal(DecimalUtility.clean(' 1.239 ', 2), 1.24);
		assert.equal(DecimalUtility.clean('7', 2), 7);
	});

	it('cleans empty values to null', () => {
		assert.equal(DecimalUtility.clean(null, 2), null);
		assert.equal(DecimalUtility.clean(undefined, 2), null);
		assert.equal(DecimalUtility.clean('', 2), null);
	});

	it('rounds without floating point drift', () => {
		assert.equal(DecimalUtility.toFixed(DecimalUtility.init(0.1).plus(0.2), 2), 0.3);
	});

	it('treats a missing value as 0', () => {
		assert.equal(DecimalUtility.toFixed(null, 2), 0);
	});
});
