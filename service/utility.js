import Constants from '../constants';
import LibraryConstants from '@thzero/library_server/constants';

import Service from '@thzero/library_server/service/index';

class UtilityService extends Service {
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

	async initialize(correlationId, gameSystemId) {
		const response = (await this._serviceGameSystems.listing(ctx.correlationId)).check(ctx);
		response.results = { gameSystems: response.results };
		const responseOrganizedPlay = (await this._serviceOrganizedPlay.listing(ctx.correlationId)).check(ctx);
		response.results.organizedPlay = responseOrganizedPlay.results;
		const responsePlans = (await this._servicePlans.listing(ctx.correlationId)).check(ctx);
		response.results.plans = responsePlans.results;
		const responseVersion = (await this._serviceVersion.version(ctx.correlationId)).check(ctx);
		response.results.version = responseVersion.results;
		return response;
	}
}

export default UtilityService;
