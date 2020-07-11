import Constants from '../../constants';

import GameSystemAdminService from './gameSystem';

import ScenarioData from '../../common/data/scenario';

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

	_validateCreate(requestedValue, params) {
		if (!this._serviceGameSystemsUtility)
			return this._error();

		return this._serviceGameSystemsUtility.scenarioValidateByGameSystemId(requestedValue.gameSystemId, requestedValue, this._validateCreateI, params)
	}

	_validateUpdate(requestedValue, params) {
		if (!this._serviceGameSystemsUtility)
			return this._error();

		return this._serviceGameSystemsUtility.scenarioValidateByGameSystemId(requestedValue.gameSystemId, requestedValue, this._validateUpdateI, params)
	}
}

export default ScenariosAdminService;
