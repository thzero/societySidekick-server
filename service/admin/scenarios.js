import Constants from '../../constants.js';

import GameSystemAdminService from './gameSystem.js';

import ScenarioData from '../../common/data/scenario.js';

class ScenariosAdminService extends GameSystemAdminService {
	constructor() {
		super();

		this._repositoryScenarios = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryScenarios = this._injector.getService(Constants.InjectorKeys.REPOSITORY_ADMIN_SCENARIOS);
	}

	_initializeData() {
		return new ScenarioData();
	}

	get _repository() {
		return this._repositoryScenarios;
	}

	get _validateCreateI() {
		return Constants.ValidationSchemaTypes.ScenarioCreate;
	}

	get _validateSearchI() {
		return Constants.ValidationSchemaTypes.ScenarioSearch;
	}

	get _validateUpdateI() {
		return Constants.ValidationSchemaTypes.ScenarioUpdate;
	}

	get _validationCheckKey() {
		return 'adminScenarios';
	}

	_validateCreate(correlationId, requestedValue, params) {
		if (!this._serviceGameSystemsUtility)
			return this._error('ScenariosAdminService', '_validateCreate', null, null, null, null, correlationId);

		return this._serviceGameSystemsUtility.scenarioValidateByGameSystemId(correlationId, requestedValue.gameSystemId, requestedValue, this._validateCreateI, params)
	}

	_validateUpdate(correlationId, requestedValue, params) {
		if (!this._serviceGameSystemsUtility)
			return this._error('ScenariosAdminService', '_validateUpdate', null, null, null, null, correlationId);

		return this._serviceGameSystemsUtility.scenarioValidateByGameSystemId(correlationId, requestedValue.gameSystemId, requestedValue, this._validateUpdateI, params)
	}
}

export default ScenariosAdminService;
