import Joi from '@hapi/joi';

import BaseGameSystemValidationService from './base';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

class GameSystemValidationService extends BaseGameSystemValidationService {
	_equipmentCategories() {
		throw new NotImplementedError();
	}

	_equipmentCategoriesSecondary() {
		throw new NotImplementedError();
	}

	_equipmentCategoriesTertiary() {
		throw new NotImplementedError();
	}

	_typeBoons() {
		throw new NotImplementedError();
	}

	_typeClasses() {
		throw new NotImplementedError();
	}

	_boonCreateSchema = Joi.object({
		gameSystemId: this._id.required(),
		name: this._extendedName.required(),
		description: this._description.allow(null).allow(''),
		factionId: this._id.allow(null).allow(''),
		scenarioId: this._id.allow(null).allow(''),
		type: this._typeBoons(),
		url: this._url.allow(null).allow(''),
		uses: this._number.allow(null)
	});

	_boonUpdateSchema = Joi.object({
		id: this._id.required(),
		gameSystemId: this._id.required(),
		name: this._extendedName.required(),
		description: this._description.allow(null).allow(''),
		factionId: this._id.allow(null).allow(''),
		scenarioId: this._id.allow(null).allow(''),
		type: this._typeBoons(),
		updatedTimestamp: this._timestamp.required(),
		url: this._url.allow(null).allow(''),
		uses: this._number.allow(null)
	});

	_classCreateSchema = Joi.object({
		gameSystemId: this._id.required(),
		name: this._extendedName.required(),
		description: this._description.allow(null).allow(''),
		type: this._typeClasses(),
		url: this._url.allow(null).allow('')
	});

	_classUpdateSchema = Joi.object({
		id: this._id.required(),
		gameSystemId: this._id.required(),
		name: this._extendedName.required(),
		description: this._description.allow(null).allow(''),
		type: this._typeClasses(),
		updatedTimestamp: this._timestamp.required(),
		url: this._url.allow(null).allow('')
	});

	_equipmentCreateSchema = Joi.object({
		gameSystemId: this._id.required(),
		name: this._extendedName.required(),
		cost: this._number.required(),
		description: this._description.allow(null).allow(''),
		category: this._equipmentCategories(),
		categorySecondary: this._equipmentCategoriesSecondary(),
		categoryTertiary: this._equipmentCategoriesTertiary(),
		url: this._url.allow(null).allow('')
	});

	_equipmentUpdateSchema = Joi.object({
		id: this._id.required(),
		gameSystemId: this._id.required(),
		name: this._extendedName.required(),
		cost: this._number.required(),
		description: this._description.allow(null).allow(''),
		category: this._equipmentCategories(),
		categorySecondary: this._equipmentCategoriesSecondary(),
		categoryTertiary: this._equipmentCategoriesTertiary(),
		updatedTimestamp: this._timestamp.required(),
		url: this._url.allow(null).allow('')
	});

	_factionCreateSchema = Joi.object({
		gameSystemId: this._id.required(),
		name: this._extendedName.required(),
		description: this._description.allow(null),
		url: this._url.allow(null).allow('')
	});

	_factionUpdateSchema = Joi.object({
		id: this._id.required(),
		gameSystemId: this._id.required(),
		name: this._extendedName.required(),
		description: this._description.allow(null).allow(''),
		updatedTimestamp: this._timestamp.required(),
		url: this._url.allow(null).allow('')
	});

	// _scenarioCreateSchema = Joi.object({
	// 	gameSystemId: this._id.required(),
	// 	name: this._extendedName.required(),
	// 	description: this._description.allow(null).allow(''),
	// 	repeatable: Joi.boolean(),
	// 	scenario: this._scenarioNumber.allow(null).allow(''),
	// 	season: this._number.allow(null).allow(''),
	// 	url: this._url.allow(null).allow('')
	// });

	// _scenarioSearchSchema = Joi.object({
	// 	gameSystemId: this._id.allow(null)
	// });

	// _scenarioUpdateSchema = Joi.object({
	// 	id: this._id.required(),
	// 	gameSystemId: this._id.required(),
	// 	name: this._extendedName.required(),
	// 	description: this._description.allow(null).allow(''),
	// 	repeatable: Joi.boolean(),
	// 	scenario: this._scenarioNumber.allow(null).allow(''),
	// 	season: this._number.allow(null).allow(''),
	// 	updatedTimestamp: this._timestamp.required(),
	// 	url: this._url.allow(null).allow('')
	// });

	boonCreateSchema() {
		return this._boonCreateSchema;
	}

	boonUpdateSchema() {
		return this._boonUpdateSchema;
	}

	classCreateSchema() {
		return this._classCreateSchema;
	}

	classUpdateSchema() {
		return this._classUpdateSchema;
	}

	equipmentCreateSchema() {
		return this._equipmentCreateSchema;
	}

	equipmentUpdateSchema() {
		return this._equipmentUpdateSchema;
	}

	factionCreateSchema() {
		return this._factionCreateSchema;
	}

	factionUpdateSchema() {
		return this._factionUpdateSchema;
	}

	scenarioCreateSchema() {
		return this._scenarioCreateSchema;
	}

	scenarioSearchSchema() {
		return this._scenarioSearchSchema;
	}

	scenarioUpdateSchema() {
		return this._scenarioUpdateSchema;
	}
}

export default GameSystemValidationService;
