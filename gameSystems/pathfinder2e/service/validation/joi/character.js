import Joi from '@hapi/joi';

import Constants from '../../../../../constants';

import CharacterValidationService from '../../../../service/validation/joi/character';

class Pathfinder2eCharacterValidationService extends CharacterValidationService {
	constructor() {
		super();

		this._serviceScenariosValidation = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceScenariosValidation = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION_PATHFINDER_2E);
	}

	_currencyEarned(schema) {
		return schema.min(0).max(100000);
	}
	_currencyIncomeEarned(schema) {
		return schema.min(0).max(1000);
	}
	_currencySpendable(schema) {
		return schema.min(0).max(999999999);
	}
	_currencySpent(schema) {
		return schema.min(0).max(100000);
	}

	characterDetailUpdateSchema() {
		const validation = super.characterDetailUpdateSchema();
		return validation.concat(Joi.object({
			archetypeIds: Joi.array().items(this._id).allow(null),
			boonAdvancedId: this._id.allow(null),
			boonFactionId: this._id.allow(null),
			boonGeneric1Id: this._id.allow(null),
			boonGeneric2Id: this._id.allow(null),
			boonGeneric3Id: this._id.allow(null),
			classId: this._id.required(),
			factionId: this._id.required()
		}));
	}

	characterScenarioCreateSchema() {
		const validation = super.characterScenarioCreateSchema()
		return validation.concat(Joi.object({
			achievementPointsEarned: this._number.min(0).max(36).required(),
			achievementPointsSpent: this._number.min(0).max(99).allow(null),
			boon1Id: this._id.allow(null),
			boon2Id: this._id.allow(null),
			downtimePointsEarned: this._number.min(0).max(24).allow(null),
			downtimePointsSpent: this._number.min(0).max(99).allow(null),
			experiencePointsEarned: this._number.min(0).max(12).required(),
			fameFactionId: this._id.required(),
			fameEarned: this._number.allow(null),
			fameSpent: this._number.allow(null),
			reputationFactionId: this._id.allow(null),
			reputationEarned: this._number.allow(null),
			reputationAdditionalFactionId: this._id.allow(null),
			reputationAdditionalEarned: this._number.min(0).max(12).allow(null),
			scenarioAdvancementSpeed: this._serviceScenariosValidation.scenarioAdvancementSpeedsSchema().required(),
			scenarioEvent: this._serviceScenariosValidation.scenarioEventsSchema().required()
		}));
	}

	characterScenarioUpdateSchema() {
		const validation = super.characterScenarioUpdateSchema()
		return validation.concat(Joi.object({
			achievementPointsEarned: this._number.min(0).max(36).required(),
			achievementPointsSpent: this._number.min(0).max(99).allow(null),
			boon1Id: this._id.allow(null),
			boon2Id: this._id.allow(null),
			downtimePointsEarned: this._number.min(0).max(24).allow(null),
			downtimePointsSpent: this._number.min(0).max(99).allow(null),
			experiencePointsEarned: this._number.min(0).max(12).required(),
			fameFactionId: this._id.required(),
			fameEarned: this._number.allow(null),
			fameSpent: this._number.allow(null),
			reputationFactionId: this._id.allow(null),
			reputationEarned: this._number.allow(null),
			reputationAdditionalFactionId: this._id.allow(null),
			reputationAdditionalEarned: this._number.min(0).max(12).allow(null),
			scenarioAdvancementSpeed: this._serviceScenariosValidation.scenarioAdvancementSpeedsSchema().required(),
			scenarioEvent: this._serviceScenariosValidation.scenarioEventsSchema().required()
		}));
	}
}

export default Pathfinder2eCharacterValidationService;
