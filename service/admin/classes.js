import Constants from '../../constants.js';

import GameSystemAdminService from './gameSystem.js';

import ClassData from '../../common/data/class.js';

class ClassesAdminService extends GameSystemAdminService {
	constructor() {
		super();

		this._repositoryClasses = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryClasses = this._injector.getService(Constants.InjectorKeys.REPOSITORY_ADMIN_CLASSES);
	}

	_initializeData() {
		return new ClassData();
	}

	get _repository() {
		return this._repositoryClasses;
	}

	get _validateCreateI() {
		return Constants.ValidationSchemaTypes.ClassCreate;
	}

	get _validateUpdateI() {
		return Constants.ValidationSchemaTypes.ClassUpdate;
	}

	get _validationCheckKey() {
		return 'adminClasses';
	}
}

export default ClassesAdminService;
