import Joi from 'joi';

import Starfinder1eShared2eConstants from '../../../../../common/gameSystems/starfinder1e/constants';

import BaseValidationService from '../../../../service/validation/joi';

class Starfinder1eValidationService extends BaseValidationService {
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

	_equipmentCategories() {
		const categories = Object.values(Starfinder1eShared2eConstants.EquipmentCategories);
		return Joi.string().valid(...categories);
	}

	_equipmentCategoriesSecondary() {
		const categories = Object.values(Starfinder1eShared2eConstants.EquipmentSecondaryCategories);
		return Joi.string().valid(...categories).allow(null).allow('');
	}

	_equipmentCategoriesTertiary() {
		const categories = Object.values(Starfinder1eShared2eConstants.EquipmentTertiaryCategories);
		return Joi.string().valid(...categories).allow(null).allow('');
	}

	_scenarioAdvancementSpeed = Joi.string().valid(...Object.values(Starfinder1eShared2eConstants.ScenarioAdvancementSpeeds));
	_scenarioAdventure = Joi.string().valid(...Object.values(Starfinder1eShared2eConstants.ScenarioAdventures));

	_typeBoons() {
		const types = Object.values(Starfinder1eShared2eConstants.BoonTypes);
		return Joi.string().trim().required().valid(...types);
	}

	_typeClasses() {
		const types = Object.values(Starfinder1eShared2eConstants.ClassTypes);
		return Joi.string().valid(...types);
	}

	scenarioCreateSchema() {
		const validation = super.scenarioCreateSchema()
		return validation.concat(Joi.object({
			type: this._scenarioAdventure.required()
		}));
	}

	scenarioUpdateSchema() {
		const validation = super.scenarioUpdateSchema()
		return validation.concat(Joi.object({
			type: this._scenarioAdventure.required()
		}));
	}

	settingScenariosAdditionalSchema() {
		const validation = this._settingScenariosAdditionalSchema;
		return validation.concat(Joi.object({
			scenarioAdventureFilter: Joi.string().allow(null)
		}));
	}
}

export default Starfinder1eValidationService;
