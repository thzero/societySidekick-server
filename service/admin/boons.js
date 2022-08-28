import Constants from '../../constants.js';

import GameSystemAdminService from './gameSystem.js';

import BoonData from '../../common/data/boon.js';

class BoonsAdminService extends GameSystemAdminService {
	constructor() {
		super();

		this._repositoryBoons = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryBoons = this._injector.getService(Constants.InjectorKeys.REPOSITORY_ADMIN_BOONS);
	}

	get _dataClass() {
		return BoonData;
	}

	_initializeData() {
		return new BoonData();
	}

	get _repository() {
		return this._repositoryBoons;
	}

	get _validateCreateI() {
		return Constants.ValidationSchemaTypes.BoonCreate;
	}

	get _validateUpdateI() {
		return Constants.ValidationSchemaTypes.BoonUpdate;
	}

	get _validationCheckKey() {
		return 'adminBoons';
	}
}

export default BoonsAdminService;
