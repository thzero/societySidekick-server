import Joi from '@hapi/joi';

import Constants from '../../../../../constants';

import CharacterValidationService from '../../../../service/validation/joi/character';

class Starfinder1eCharacterValidationService extends CharacterValidationService {
	constructor() {
		super();

		this._serviceScenariosValidation = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceScenariosValidation = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION_STARFINDER_1E);
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
		const validation = super.characterDetailUpdateSchema()
		return validation.concat(Joi.object({
			boonAllyId: this._id.allow(null),
			boonFactionId: this._id.allow(null),
			boonPersonalId: this._id.allow(null),
			boonPromoId: this._id.allow(null),
			boonSocialId: this._id.allow(null),
			boonStarshipId: this._id.allow(null),
			factionId: this._id.required(),
			themeId: this._id.allow(null)
		}));
	}

	characterScenarioCreateSchema() {
		const validation = super.characterScenarioCreateSchema()
		return validation.concat(Joi.object({
			boon1Id: this._id.allow(null),
			boon2Id: this._id.allow(null),
			classId: this._id.allow(null),
			experiencePointsEarned: this._number.min(0).max(3).required(),
			fameFactionId: this._id.required(),
			fameEarned: this._number.min(0).max(5).allow(null),
			fameSpent: this._number.min(0).max(99).allow(null),
			reputationEarned: this._number.min(0).max(5).allow(null),
			scenarioAdvancementSpeed: this._serviceScenariosValidation.scenarioAdvancementSpeedsSchema().required(),
			scenarioAdventure: this._serviceScenariosValidation.scenarioAdventuresSchema().required()
		}));
	}

	characterScenarioUpdateSchema() {
		const validation = super.characterScenarioUpdateSchema()
		return validation.concat(Joi.object({
			boon1Id: this._id.allow(null),
			boon2Id: this._id.allow(null),
			classId: this._id.allow(null),
			experiencePointsEarned: this._number.min(0).max(3).required(),
			fameFactionId: this._id.required(),
			fameEarned: this._number.min(0).max(5).allow(null),
			fameSpent: this._number.min(0).max(99).allow(null),
			reputationEarned: this._number.min(0).max(5).allow(null),
			scenarioAdvancementSpeed: this._serviceScenariosValidation.scenarioAdvancementSpeedsSchema().required(),
			scenarioAdventure: this._serviceScenariosValidation.scenarioAdventuresSchema().required()
		}));
	}
}

export default Starfinder1eCharacterValidationService;
