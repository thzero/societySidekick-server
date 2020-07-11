import Constants from '../constants';

import Service from '@thzero/library/service/index';

class FactionsService extends Service {
	constructor() {
		super();

		this._repositoryFactions = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryFactions = this._injector.getService(Constants.InjectorKeys.REPOSITORY_FACTIONS);
	}

	async listing(correlationId, gameSystemId) {
		const validationGameSystemIdResponse = this._validateId(gameSystemId, 'gameSystemId');
		if (!validationGameSystemIdResponse.success)
			return validationGameSystemIdResponse;

		const respositoryResponse = await this._repositoryFactions.listing(correlationId, gameSystemId);
		if (!respositoryResponse.success)
			return this._errorResponse(respositoryResponse);

		return this._initResponse(respositoryResponse);
	}
}

export default FactionsService;
