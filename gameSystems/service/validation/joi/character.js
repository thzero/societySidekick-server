import Joi from 'joi';

import SharedConstants from '../../../../common/constants';

import BaseGameSystemValidationService from './base';

class CharacterGameSystemValidationService extends BaseGameSystemValidationService {
	_currencyBought(schema) {
		return schema.min(0).max(1000000);
	}
	_currencyEarned(schema) {
		return schema;
	}
	_currencyIncomeEarned(schema) {
		return schema;
	}
	_currencySpendable(schema) {
		return schema;
	}
	_currencySpent(schema) {
		return schema;
	}
	_currencySold(schema) {
		return schema.min(0).max(1000000);
	}

	_characterNumber = Joi.number().min(1).max(99);
	_characterStatus = Joi.string().trim().valid(...Object.values(SharedConstants.CharactersStatus));

	_characterScenarioSuccessResults = Joi.object({
		id: Joi.number().min(1).max(99).required(),
		checked: Joi.boolean()
	});

	_characterBoonCreateSchema = Joi.object({
		gameSystemId: this._id.required(),
		boonId: this._id.required(),
		locationId: this._id.allow(null),
		timestamp: this._timestamp.required(),
		updatedTimestamp: this._timestamp.required(),
		used: Joi.boolean()
	});

	_characterBoonUpdateSchema = Joi.object({
		id: this._id.required(),
		gameSystemId: this._id.required(),
		boonId: this._id.required(),
		locationId: this._id.allow(null),
		timestamp: this._timestamp.required(),
		updatedTimestamp: this._timestamp.required(),
		used: Joi.boolean()
	});

	_characterDetailUpdateSchema = Joi.object({
		id: this._id.required(),
		gameSystemId: this._id.required(),
		name: this._name.required(),
		number: this._characterNumber.required(),
		status: this._characterStatus.required(),
		tagLine: this._tagLine.allow(null).allow(''),
		updatedTimestamp: this._timestamp.required()
	});

	_characterInventoryCreateSchema = Joi.object({
		gameSystemId: this._id.required(),
		boughtScenarioId: this._id.required(),
		item: this.	_inventoryItem = Joi.string().required(),
		itemId: this._id.allow(null),
		quantity: this._number.required(),
		soldScenarioId: this._id.allow(null),
		used: this._number.allow(null),
		usedScenarioId: this._id.allow(null),
		value: this._number.required(),
		timestamp: this._timestamp.required(),
		updatedTimestamp: this._timestamp.required()
	});

	_characterInventoryUpdateSchema = Joi.object({
		id: this._id.required(),
		gameSystemId: this._id.required(),
		boughtScenarioId: this._id.required(),
		item: this.	_inventoryItem = Joi.string().required(),
		itemId: this._id.allow(null),
		quantity: this._number.required(),
		soldScenarioId: this._id.allow(null),
		used: this._number.allow(null),
		usedScenarioId: this._id.allow(null),
		value: this._number.required(),
		timestamp: this._timestamp.required(),
		updatedTimestamp: this._timestamp.required()
	});

	_characterScenarioCreateSchema = Joi.object({
		gameSystemId: this._id.required(),
		scenarioId: this._id.required(),
		currencyBought: this._currencyBought( this._number).allow(null),
		currencyEarned: this._currencyEarned( this._number).required(),
		currencyIncomeEarned: this._currencyIncomeEarned( this._number).allow(null),
		currencySpendable: this._currencySpendable( this._number).allow(null),
		currencySpent: this._currencySpent( this._number).allow(null),
		currencySold: this._currencySold( this._number).allow(null),
		locationId: this._id.allow(null),
		order: this._number.required(),
		scenarioParticipant: this._scenarioParticipant.required(),
		scenarioStatus: this._scenarioStatus.required(),
		scenarioSuccessResults: Joi.array().items(this._characterScenarioSuccessResults).allow(null),
		status: this._characterStatus.required(),
		timestamp: this._timestamp.required(),
		updatedTimestamp: this._timestamp.required()
	});

	_characterScenarioUpdateSchema = Joi.object({
		id: this._id.required(),
		gameSystemId: this._id.required(),
		scenarioId: this._id.required(),
		currencyBought: this._currencyBought( this._number).allow(null),
		currencyEarned: this._currencyEarned( this._number).required(),
		currencyIncomeEarned: this._currencyIncomeEarned( this._number).allow(null),
		currencySpendable: this._currencySpendable( this._number).allow(null),
		currencySpent: this._currencySpent( this._number).allow(null),
		currencySold: this._currencySold( this._number).allow(null),
		locationId: this._id.allow(null),
		order: this._number.required(),
		scenarioParticipant: this._scenarioParticipant.required(),
		scenarioStatus: this._scenarioStatus.required(),
		scenarioSuccessResults: Joi.array().items(this._characterScenarioSuccessResults).allow(null),
		status: this._characterStatus.required(),
		timestamp: this._timestamp.required(),
		updatedTimestamp: this._timestamp.required()
	});

	characterBoonCreateSchema() {
		return this._characterBoonCreateSchema;
	}

	characterBoonUpdateSchema() {
		return this._characterBoonUpdateSchema;
	}

	characterDetailUpdateSchema() {
		return this._characterDetailUpdateSchema;
	}

	characterInventoryCreateSchema() {
		return this._characterInventoryCreateSchema;
	}

	characterInventoryUpdateSchema() {
		return this._characterInventoryUpdateSchema;
	}

	characterNewSchema = Joi.object({
		gameSystemId: this._id.required(),
		name: this._name.required(),
		number: this._characterNumber.required()
	});

	characterScenarioCreateSchema() {
		return this._characterScenarioCreateSchema;
	}

	characterScenarioUpdateSchema() {
		return this._characterScenarioUpdateSchema;
	}

	characterUpdateSchema = Joi.object({
		id: this._id.required(),
		gameSystemId: this._id.required(),
		name: this._name.required(),
		number: this._characterNumber.required()
	});
}

export default CharacterGameSystemValidationService;
