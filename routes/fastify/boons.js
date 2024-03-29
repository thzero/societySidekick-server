import Constants from '../../constants.js';

import BaseRoute from '@thzero/library_server_fastify/routes/index.js';

class BoonRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/boons');
	}

	async init(injector, app, config) {
		await super.init(injector, app, config);
		this._inject(app, injector, Constants.InjectorKeys.SERVICE_BOONS, Constants.InjectorKeys.SERVICE_BOONS);
	}

	get id() {
		return 'boons';
	}

	_initializeRoutes(router) {
		router.get(this._join('/listing/:gameSystemId'),
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_BOONS].listing(request.correlationId, request.params.gameSystemId)).check(request);
				this._jsonResponse(reply, response);
			}
		);
	}
}

export default BoonRoute;
