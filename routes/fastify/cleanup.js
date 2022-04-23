import Constants from '../../constants';

import BaseRoute from '@thzero/library_server_fastify/routes/index';

class CleanupRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '');
	}

	async init(injector, app, config) {
		await super.init(injector, app, config);
		this._inject(app, injector, Constants.InjectorKeys.SERVICE_CLEANUP, Constants.InjectorKeys.SERVICE_CLEANUP);
	}

	get id() {
		return 'app';
	}

	_initializeRoutes(router) {
		router.get(this._join('/cleanup'),
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CLEANUP].cleanup(request.correlationId)).check(request);
				this._jsonResponse(reply, response);
			}
		);
	}
}

export default CleanupRoute;
