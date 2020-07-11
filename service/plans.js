import LibraryConstants from '@thzero/library/constants';

import Service from '@thzero/library/service/index';

class PlansService extends Service {
	constructor() {
		super();

		this._repositoryPlans = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryPlans = this._injector.getService(LibraryConstants.InjectorKeys.REPOSITORY_PLANS);
	}

	async listing(correlationId) {
		const respositoryResponse = await this._repositoryPlans.listing(correlationId);
		if (!respositoryResponse.success)
			return this._errorResponse(respositoryResponse);

		return this._initResponse(respositoryResponse);
	}
}

export default PlansService;
