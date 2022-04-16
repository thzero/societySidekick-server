import koaBody from 'koa-body';

import Constants from '../constants';

import LibraryUtility from '@thzero/library_common/utility';

import BaseRoute from '@thzero/library_server/routes/index';

class EquipmentRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/equipment');
	}

	async init(injector, config) {
		const router = await super.init(injector, config);
		router.serviceEquipment = injector.getService(Constants.InjectorKeys.SERVICE_EQUIPMENT);
	}

	get id() {
		return 'equipment';
	}

	_initializeRoutes(router) {
		// eslint-disable-next-line
		router.post('/search/:gameSystemId',
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				// const service = this._injector.getService(Constants.InjectorKeys.SERVICE_EQUIPMENT);
				const response = (await ctx.router.serviceEquipment.search(ctx.correlationId, ctx.params.gameSystemId, ctx.request.body)).check(ctx);
				this._jsonResponse(ctx, LibraryUtility.stringify(response));
			}
		);
	}
}

export default EquipmentRoute;
