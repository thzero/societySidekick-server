import Constants from '../../constants.js';

import BaseRoute from '@thzero/library_server_fastify/routes/index.js';

class EquipmentRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/equipment');
	}

	async init(injector, app, config) {
		await super.init(injector, app, config);
		this._inject(app, injector, Constants.InjectorKeys.SERVICE_EQUIPMENT, Constants.InjectorKeys.SERVICE_EQUIPMENT);
	}

	get id() {
		return 'equipment';
	}

	_initializeRoutes(router) {
		router.post(this._join('/search/:gameSystemId'),
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_EQUIPMENT].search(request.correlationId, request.params.gameSystemId, request.body)).check(request);
				this._jsonResponse(reply, response);
			}
		);
	}
}

export default EquipmentRoute;
