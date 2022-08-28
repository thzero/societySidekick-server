import Constants from '../constants.js';

import Service from '@thzero/library_server/service/index.js';

class OrganizedPlayService extends Service {
	constructor() {
		super();

		this._repositoryOrganizedPlay = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryOrganizedPlay = this._injector.getService(Constants.InjectorKeys.REPOSITORY_ORGANIZEDPLAY);
	}

	async listing(correlationId) {
		const respositoryResponse = await this._repositoryOrganizedPlay.listing(correlationId);
		return respositoryResponse;
	}
}

export default OrganizedPlayService;
