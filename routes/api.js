import Constants from '../constants';
import LibraryConstants from '@thzero/library/constants';

import Utility from '@thzero/library/utility';

import BaseRoute from '@thzero/library/routes/index';

class ApiRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/api');
	}

	_initializeRoutes(router) {
		router.get('/gameSystems',
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
				const response = (await service.listing(ctx.correlationId)).check(ctx);
				ctx.body = Utility.stringify(response);
			}
		);

		router.get('/initialize',
			// eslint-disable-next-line
			async (ctx, next) => {
				const serviceGameSystems = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
				const response = (await serviceGameSystems.listing(ctx.correlationId)).check(ctx);
				response.results = { gameSystems: response.results };
				const servicePlans = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_PLANS);
				const responsePlans = (await servicePlans.listing(ctx.correlationId)).check(ctx);
				response.results.plans = responsePlans.results
				const serviceVersion = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_VERSION);
				const responseVersion = (await serviceVersion.version(ctx.correlationId)).check(ctx);
				response.results.version = responseVersion.results
				ctx.body = Utility.stringify(response);
			}
		);
	}
}

export default ApiRoute;
