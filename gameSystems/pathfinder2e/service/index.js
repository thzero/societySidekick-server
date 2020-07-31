import Constants from '../../../constants';

import BaseGameSystemGameSystemsService from '../../service/base';

class Pathfinder2eGameSystemGameSystemsService extends BaseGameSystemGameSystemsService {
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

		this._serviceCharacters = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_PATHFINDER_2E);
		this._serviceCharactersValidation = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION_PATHFINDER_2E);
		this._serviceScenarios = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_PATHFINDER_2E);
		this._serviceScenariosValidation = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION_PATHFINDER_2E);
		this._serviceValidation = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_VALIDATION_PATHFINDER_2E);
	}

	determineCharactersService() {
		return this._successResponse(this._serviceCharacters);
	}

	determineScenariosService() {
		return this._successResponse(this._serviceScenarios);
	}

	determineCharactersValidation(type) {
		switch (type) {
			case Constants.ValidationSchemaTypes.CharacterBoonCreate:
				return this._serviceCharactersValidation.characterBoonCreateSchema();
			case Constants.ValidationSchemaTypes.characterBoonUpdate:
				return this._serviceCharactersValidation.characterBoonUpdateSchema();
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
				return this._serviceValidation.boonCreateSchema();
			case Constants.ValidationSchemaTypes.BoonUpdate:
				return this._serviceValidation.boonUpdateSchema();
			case Constants.ValidationSchemaTypes.ClassCreate:
				return this._serviceValidation.classCreateSchema();
			case Constants.ValidationSchemaTypes.ClassUpdate:
				return this._serviceValidation.classUpdateSchema();
			case Constants.ValidationSchemaTypes.EquipmentCreate:
				return this._serviceValidation.equipmentCreateSchema();
			case Constants.ValidationSchemaTypes.EquipmentUpdate:
				return this._serviceValidation.equipmentUpdateSchema();
			case Constants.ValidationSchemaTypes.FactionCreate:
				return this._serviceValidation.factionCreateSchema();
			case Constants.ValidationSchemaTypes.FactionUpdate:
				return this._serviceValidation.factionUpdateSchema();
			case Constants.ValidationSchemaTypes.UserSettingsSchema:
				return this._serviceValidation.settingScenariosAdditionalSchema();
		}
		return null;
	}

	initializeCharacter() {
		return new CharacterData();
	}
}

export default Pathfinder2eGameSystemGameSystemsService;
