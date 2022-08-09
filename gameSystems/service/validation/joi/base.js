import Joi from 'joi';

import SharedConstants from '../../../../common/constants';

import JoiValidationService from '../../../../service/validation/joi';

class BaseGameSystemValidationService extends JoiValidationService {
	_scenarioNumber = Joi.string().trim()
		.regex(/^([a-zA-Z0-9 ]*)*$/)
		.min(1)
		.max(10);
	_scenarioParticipant = Joi.string().trim().valid(...Object.values(SharedConstants.ScenarioParticipants));
	_scenarioStatus = Joi.string().trim().valid(...Object.values(SharedConstants.ScenarioStatus));
	_scenarioSuccessResults = Joi.object({
		id: Joi.number().min(1).max(99).required(),
		description: this._description.required()
	});
	_scenarioSuccessResultsSeparator = Joi.string()
		.regex(/^[ ,/-]*$/)
		.allow(null).allow('');
}

export default BaseGameSystemValidationService;
