import Constants from '../constants';

import Service from '@thzero/library_server/service/index';

class BoonsService extends Service {
	constructor() {
		super();

		this._repositoryBoons = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryBoons = this._injector.getService(Constants.InjectorKeys.REPOSITORY_BOONS);
	}

	async listing(correlationId, gameSystemId) {
		const respositoryResponse = await this._repositoryBoons.listing(correlationId, gameSystemId);
		if (!respositoryResponse.success)
			return this._errorResponse(respositoryResponse);

		return respositoryResponse;
	}
}

export default BoonsService;
