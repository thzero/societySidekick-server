import Joi from '@hapi/joi';

import SharedConstants from '../../../../common/constants';

import JoiValidationService from '../../../../service/validation/joi';

class BaseGameSystemValidationService extends JoiValidationService {
	_scenarioNumber = Joi.string().trim()
		.regex(/^([a-zA-Z0-9 ]*)*$/)
		.min(1)
		.max(2);
	_scenarioParticipant = Joi.string().trim().valid(...Object.values(SharedConstants.ScenarioParticipants));
	_scenarioStatus = Joi.string().trim().valid(...Object.values(SharedConstants.ScenarioStatus));
}

export default BaseGameSystemValidationService;
