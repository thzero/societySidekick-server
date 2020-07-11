import Constants from '../constants';

import Utility from '@thzero/library/utility';

import BaseRoute from '@thzero/library/routes/index';

class CleanupRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/api');
	}

	_initializeRoutes(router) {
		router.get('/',
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CLEANUP);
				const response = (await service.cleanup(ctx.correlationId)).check(ctx);
				ctx.body = Utility.stringify(response);
			}
		);
	}
}

export default CleanupRoute;
