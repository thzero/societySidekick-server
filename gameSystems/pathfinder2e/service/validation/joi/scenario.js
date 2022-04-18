import Joi from 'joi';

import Pathfinder2eSharedConstants from '../../../../../common/gameSystems/pathfinder2e/constants';

import ScenarioValidationService from '../../../../service/validation/joi/scenario';

class Pathfinder2eScenarioValidationService extends ScenarioValidationService {
	_scenarioAdvancementSpeeds = Joi.string().valid(...Object.values(Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds));
	_scenarioAdventures = Joi.string().valid(...Object.values(Pathfinder2eSharedConstants.ScenarioAdventures));
	_scenarioEvents = Joi.string().valid(...Object.values(Pathfinder2eSharedConstants.ScenarioEvents));

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

	scenarioEventsSchema() {
		return this._scenarioEvents;
	}

	scenarioUpdateSchema() {
		const validation = super.scenarioUpdateSchema()
		return validation.concat(Joi.object({
			type: this.scenarioAdventuresSchema().required()
		}));
	}
}

export default Pathfinder2eScenarioValidationService;
