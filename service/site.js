import Constants from '../constants';

import Service from '@thzero/library_server/service/index';

class SiteService extends Service {
	constructor() {
		super();

		this._repositorySite = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositorySite = this._injector.getService(Constants.InjectorKeys.REPOSITORY_SITE);
	}

	async fetch(correlationId) {
		const respositoryResponse = await this._repositorySite.fetch(correlationId);
		return respositoryResponse;
	}
}

export default SiteService;
