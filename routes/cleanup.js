import Constants from '../constants';

import LibraryUtility from '@thzero/library_common/utility';

import BaseRoute from '@thzero/library_server/routes/index';

class CleanupRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '');
	}

	async init(injector, config) {
		const router = await super.init(injector, config);
		router.serviceCleanup = injector.getService(Constants.InjectorKeys.SERVICE_CLEANUP);
	}

	get id() {
		return 'app';
	}

	_initializeRoutes(router) {
		router.get('/cleanup',
			// eslint-disable-next-line
			async (ctx, next) => {
				// const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CLEANUP);
				const response = (await ctx.router.serviceCleanup.cleanup(ctx.correlationId)).check(ctx);
				this._jsonResponse(ctx, LibraryUtility.stringify(response));
			}
		);
	}
}

export default CleanupRoute;
