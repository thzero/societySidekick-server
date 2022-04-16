import Constants from '../constants';

import LibraryUtility from '@thzero/library_common/utility';

import BaseRoute from '@thzero/library_server/routes/index';

class BoonRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/boons');
	}

	async init(injector, config) {
		const router = await super.init(injector, config);
		router.serviceBoons = injector.getService(Constants.InjectorKeys.SERVICE_BOONS);
	}

	get id() {
		return 'boons';
	}

	_initializeRoutes(router) {
		router.get('/listing/:gameSystemId',
			// eslint-disable-next-line
			async (ctx, next) => {
				// const service = this._injector.getService(Constants.InjectorKeys.SERVICE_BOONS);
				const response = (await ctx.router.serviceBoons.listing(ctx.correlationId, ctx.params.gameSystemId)).check(ctx);
				this._jsonResponse(ctx, LibraryUtility.stringify(response));
			}
		);
	}
}

export default BoonRoute;
