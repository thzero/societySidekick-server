import Constants from '../../constants';

import GameSystemAdminService from './gameSystem';

import FactionData from '../../common/data/faction';

class FactionsAdminService extends GameSystemAdminService {
	constructor() {
		super();

		this._repositoryFactions = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryFactions = this._injector.getService(Constants.InjectorKeys.REPOSITORY_ADMIN_FACTIONS);
	}

	_initializeData() {
		return new FactionData();
	}

	get _repository() {
		return this._repositoryFactions;
	}

	get _validateCreateI() {
		return Constants.ValidationSchemaTypes.FactionCreate;
	}

	get _validateUpdateI() {
		return Constants.ValidationSchemaTypes.FactionUpdate;
	}

	get _validationCheckKey() {
		return 'adminFactions';
	}
}

export default FactionsAdminService;
