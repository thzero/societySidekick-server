import Constants from '../constants';

import Utility from '@thzero/library_common/utility';

import BaseRoute from '@thzero/library/routes/index';

class ClassesRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/api/classes');
	}

	_initializeRoutes(router) {
		router.get('/listing/:gameSystemId',
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CLASSES);
				const response = (await service.listing(ctx.correlationId, ctx.params.gameSystemId)).check(ctx);
				ctx.body = Utility.stringify(response);
			}
		);
	}
}

export default ClassesRoute;
