import Constants from '../../../constants';

import BaseGameSystemGameSystemsService from '../../service/base';

class Starfinder1eGameSystemGameSystemsService extends BaseGameSystemGameSystemsService {
	constructor() {
		super();

		this._serviceCharacters = null;
		this._serviceCharactersValidation = null;
		this._serviceScenarios = null;
		this._serviceScenariosValidation = null;
		this._serviceValidation = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceCharacters = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_STARFINDER_1E);
		this._serviceCharactersValidation = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION_STARFINDER_1E);
		this._serviceScenarios = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_STARFINDER_1E);
		this._serviceScenariosValidation = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION_STARFINDER_1E);
		this._serviceValidation = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_VALIDATION_STARFINDER_1E);
	}

	determineCharactersService() {
		return this._successResponse(this._serviceCharacters);
	}

	determineScenariosService() {
		return this._successResponse(this._serviceScenarios);
	}

	determineCharactersValidation(type) {
		switch (type) {
			case Constants.ValidationSchemaTypes.CharacterDetailsUpdate:
				return this._serviceCharactersValidation.characterDetailUpdateSchema();
			case Constants.ValidationSchemaTypes.CharacterInventoryCreate:
				return this._serviceCharactersValidation.characterInventoryCreateSchema();
			case Constants.ValidationSchemaTypes.CharacterInventoryUpdate:
				return this._serviceCharactersValidation.characterInventoryUpdateSchema();
			case Constants.ValidationSchemaTypes.CharacterScenarioCreate:
				return this._serviceCharactersValidation.characterScenarioCreateSchema();
			case Constants.ValidationSchemaTypes.CharacterScenarioUpdate:
				return this._serviceCharactersValidation.characterScenarioUpdateSchema();
		}
		return null;
	}

	determineScenariosValidation(type) {
		switch (type) {
			case Constants.ValidationSchemaTypes.ScenarioCreate:
				return this._serviceScenariosValidation.scenarioCreateSchema();
			case Constants.ValidationSchemaTypes.ScenarioSearch:
				return this._serviceScenariosValidation.scenarioSearchSchema();
			case Constants.ValidationSchemaTypes.ScenarioUpdate:
				return this._serviceScenariosValidation.scenarioUpdateSchema();
		}
		return null;
	}

	determineValidation(type) {
		switch (type) {
			case Constants.ValidationSchemaTypes.BoonCreate:
				return this._serviceValidation.boonCreatechema();
			case Constants.ValidationSchemaTypes.BoonUpdate:
				return this._serviceValidation.boonUpdateSchema();
			case Constants.ValidationSchemaTypes.ClassCreate:
				return this._serviceValidation.classCreatechema();
			case Constants.ValidationSchemaTypes.ClassUpdate:
				return this._serviceValidation.classUpdateSchema();
			case Constants.ValidationSchemaTypes.EquipmentCreate:
				return this._serviceValidation.equipmentCreatechema();
			case Constants.ValidationSchemaTypes.EquipmentUpdate:
				return this._serviceValidation.equipmentUpdateSchema();
			case Constants.ValidationSchemaTypes.FactionCreate:
				return this._serviceValidation.factionCreatechema();
			case Constants.ValidationSchemaTypes.FactionUpdate:
				return this._serviceValidation.factionUpdateSchema();
			case Constants.ValidationSchemaTypes.UserSettingsSchema:
				return this._serviceValidation.settingScenariosAdditionalSchema();
		}
		return null;
	}
}

export default Starfinder1eGameSystemGameSystemsService;
