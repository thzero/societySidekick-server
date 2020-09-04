import Joi from '@hapi/joi';

import SharedConstants from '../../../../common/constants';

import BaseGameSystemValidationService from './base';

class ScenarioGameSystemValidationService extends BaseGameSystemValidationService {
	// _scenarioNumber = Joi.string().trim()
	// 	.regex(/^([a-zA-Z0-9 ]*)*$/)
	// 	.min(1)
	// 	.max(2);
	// _scenarioParticipant = Joi.string().trim().valid(...Object.values(SharedConstants.ScenarioParticipants));
	// _scenarioStatus = Joi.string().trim().valid(...Object.values(SharedConstants.ScenarioStatus));

	_scenarioCreateSchema = Joi.object({
		gameSystemId: this._id.required(),
		name: this._extendedName.required(),
		description: this._description.allow(null).allow(''),
		repeatable: Joi.boolean(),
		scenario: this._scenarioNumber.allow(null).allow(''),
		season: this._number.allow(null).allow(''),
		url: this._url.allow(null).allow('')
	});

	_scenarioSearchSchema = Joi.object({
		gameSystemId: this._id.allow(null)
	});

	_scenarioUpdateSchema = Joi.object({
		id: this._id.required(),
		gameSystemId: this._id.required(),
		name: this._extendedName.required(),
		description: this._description.allow(null).allow(''),
		repeatable: Joi.boolean(),
		scenario: this._scenarioNumber.allow(null).allow(''),
		season: this._number.allow(null).allow(''),
		updatedTimestamp: this._timestamp.required(),
		url: this._url.allow(null).allow('')
	});

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

export default ScenarioGameSystemValidationService;
