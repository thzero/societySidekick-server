import Constants from '../constants';
import LibraryConstants from '@thzero/library_server/constants';

import Service from '@thzero/library_server/service/index';

class ApiService extends Service {
	constructor() {
		super();
	}

	async init(injector) {
		await super.init(injector);

		this._serviceGameSystems = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
		this._serviceOrganizedPlay = this._injector.getService(Constants.InjectorKeys.SERVICE_ORGANIZEDPLAY);
		this._servicePlans = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_PLANS);
		this._serviceVersion = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_VERSION);
	}

	async initialize(correlationId) {
		const response = await this._serviceGameSystems.listing(correlationId);
		if (!response.success)
			return response;

		response.results = { gameSystems: response.results };

		const responseOrganizedPlay = await this._serviceOrganizedPlay.listing(correlationId);
		if (!responseOrganizedPlay.success)
			return responseOrganizedPlay;

		response.results.organizedPlay = responseOrganizedPlay.results;

		const responsePlans = await this._servicePlans.listing(correlationId);
		if (!responsePlans.success)
			return responsePlans;

		response.results.plans = responsePlans.results;

		const responseVersion = await this._serviceVersion.version(correlationId);
		if (!responseVersion.success)
			return responseVersion;

		response.results.version = responseVersion.results;
		return response;
	}
}

export default ApiService;
