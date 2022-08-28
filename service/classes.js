import Constants from '../constants.js';

import Service from '@thzero/library_server/service/index.js';

class ClassesService extends Service {
	constructor() {
		super();

		this._repositoryClasses = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryClasses = this._injector.getService(Constants.InjectorKeys.REPOSITORY_CLASSES);
	}

	async listing(correlationId, gameSystemId) {
		const validationGameSystemIdResponse = this._validateId(correlationId, gameSystemId, 'gameSystemId');
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		const respositoryResponse = await this._repositoryClasses.listing(correlationId, gameSystemId);
		return respositoryResponse;
	}
}

export default ClassesService;
