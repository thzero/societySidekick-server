import Constants from '../constants';

import Utility from '@thzero/library/utility';

import BaseRoute from '@thzero/library/routes/index';

class BoonRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/api/boons');
	}

	_initializeRoutes(router) {
		router.get('/listing/:gameSystemId',
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_BOONS);
				const response = (await service.listing(ctx.correlationId, ctx.params.gameSystemId)).check(ctx);
				ctx.body = Utility.stringify(response);
			}
		);
	}
}

export default BoonRoute;
