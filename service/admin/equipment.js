import Constants from '../../constants';

import GameSystemAdminService from './gameSystem';

import EquipmentData from '../../common/data/equipment';

class EquipmentAdminService extends GameSystemAdminService {
	constructor() {
		super();

		this._repositoryEquipment = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryEquipment = this._injector.getService(Constants.InjectorKeys.REPOSITORY_ADMIN_EQUIPMENT);
	}

	_initializeData() {
		return new EquipmentData();
	}

	get _repository() {
		return this._repositoryEquipment;
	}

	get _validateCreateI() {
		return Constants.ValidationSchemaTypes.EquipmentCreate;
	}

	get _validateUpdateI() {
		return Constants.ValidationSchemaTypes.EquipmentUpdate;
	}

	get _validationCheckKey() {
		return 'adminEquipment';
	}
}

export default EquipmentAdminService;
