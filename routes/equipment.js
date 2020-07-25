import koaBody from 'koa-body';

import Constants from '../constants';

import Utility from '@thzero/library_common/utility';

import BaseRoute from '@thzero/library/routes/index';

class EquipmentRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/api/equipment');
	}

	_initializeRoutes(router) {
		// eslint-disable-next-line
		router.post('/search/:gameSystemId',
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_EQUIPMENT);
				const response = (await service.search(ctx.correlationId, ctx.params.gameSystemId, ctx.request.body)).check(ctx);
				ctx.body = Utility.stringify(response);
			}
		);
	}
}

export default EquipmentRoute;
