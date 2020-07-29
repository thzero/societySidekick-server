import Constants from '../constants';

import Service from '@thzero/library_server/service/index';

class CleanupService extends Service {
	constructor() {
		super();

		this._repositoryClasses = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryClasses = this._injector.getService(Constants.InjectorKeys.REPOSITORY_CLEANUP);
	}

	async cleanup(correlationId) {
		const respositoryResponse = await this._repositoryClasses.cleanup(correlationId);
		if (!respositoryResponse.success)
			return this._errorResponse(respositoryResponse);

		return this._initResponse(respositoryResponse);
	}
}

export default CleanupService;
