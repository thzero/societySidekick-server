import Constants from '../constants.js';

import Service from '@thzero/library_server/service/index.js';

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
		const validationGameSystemIdResponse = this._validateId(correlationId, gameSystemId, 'gameSystemId');
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		const respositoryResponse = await this._repositoryFactions.listing(correlationId, gameSystemId);
		return respositoryResponse;
	}
}

export default FactionsService;
