import Joi from 'joi';

import Pathfinder2eSharedConstants from '../../../../../common/gameSystems/pathfinder2e/constants';

import BaseValidationService from '../../../../service/validation/joi';

class Pathfinder2eValidationService extends BaseValidationService {
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
		const categories = Object.values(Pathfinder2eSharedConstants.EquipmentCategories);
		return Joi.string().valid(...categories);
	}

	_equipmentCategoriesSecondary() {
		const categories = Object.values(Pathfinder2eSharedConstants.EquipmentSecondaryCategories);
		return Joi.string().valid(...categories).allow(null).allow('');
	}

	_equipmentCategoriesTertiary() {
		const categories = Object.values(Pathfinder2eSharedConstants.EquipmentTertiaryCategories);
		return Joi.string().valid(...categories).allow(null).allow('');
	}

	_scenarioAdvancementSpeed = Joi.string().valid(...Object.values(Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds));
	_scenarioAdventure = Joi.string().valid(...Object.values(Pathfinder2eSharedConstants.ScenarioAdventures));
	_scenarioEvent = Joi.string().valid(...Object.values(Pathfinder2eSharedConstants.ScenarioEvents));

	_typeBoons() {
		const types = Object.values(Pathfinder2eSharedConstants.BoonTypes);
		return Joi.string().trim().required().valid(...types);
	}

	_typeClasses() {
		const types = Object.values(Pathfinder2eSharedConstants.ClassTypes);
		return Joi.string().valid(...types);
	}

	_bulk = Joi.string()
		.trim()
		.regex(/(^(L$)|(([0-9])*)$)/)
		.allow(null)
		.allow('');

	_level = this._number.positive().allow(0).allow(null);

	equipmentCreateSchema() {
		const validation = super.equipmentCreateSchema();
		return validation.concat(Joi.object({
			bulk: this._bulk,
			level: this._level
		}));
	}

	equipmentUpdateSchema() {
		const validation = super.equipmentUpdateSchema();
		return validation.concat(Joi.object({
			bulk: this._number.allow(null).allow(''),
			level: this._level
		}));
	}

	scenarioCreateSchema() {
		const validation = super.scenarioCreateSchema();
		return validation.concat(Joi.object({
			type: this._scenarioAdventure.required()
		}));
	}

	scenarioUpdateSchema() {
		const validation = super.scenarioUpdateSchema();
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

export default Pathfinder2eValidationService;
