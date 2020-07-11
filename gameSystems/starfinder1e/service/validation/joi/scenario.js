import Joi from '@hapi/joi';

import Starfinder1eShared2eConstants from '../../../../../common/gameSystems/starfinder1e/constants';

import ScenarioValidationService from '../../../../service/validation/joi/scenario';

class Starfinder1eScenarioValidationService extends ScenarioValidationService {
	_scenarioAdvancementSpeeds = Joi.string().valid(...Object.values(Starfinder1eShared2eConstants.ScenarioAdvancementSpeeds));
	_scenarioAdventures = Joi.string().valid(...Object.values(Starfinder1eShared2eConstants.ScenarioAdventures));

	scenarioAdvancementSpeedsSchema() {
		return this._scenarioAdvancementSpeeds;
	}

	scenarioAdventuresSchema() {
		return this._scenarioAdventures;
	}

	scenarioCreateSchema() {
		const validation = super.scenarioCreateSchema()
		return validation.concat(Joi.object({
			type: this.scenarioAdventuresSchema().required()
		}));
	}

	scenarioUpdateSchema() {
		const validation = super.scenarioUpdateSchema()
		return validation.concat(Joi.object({
			type: this.scenarioAdventuresSchema().required()
		}));
	}
}

export default Starfinder1eScenarioValidationService;
