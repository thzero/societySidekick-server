import Constants from '../../constants';

import LibraryUtility from '@thzero/library_common/utility';

import BaseRoute from '@thzero/library_server_fastify/routes/index';

class FactionRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/factions');
	}

	async init(injector, app, config) {
		await super.init(injector, app, config);
		this._inject(app, injector, Constants.InjectorKeys.SERVICE_FACTIONS, Constants.InjectorKeys.SERVICE_FACTIONS);
	}

	get id() {
		return 'factions';
	}

	_initializeRoutes(router) {
		router.get(this._join('/listing/:gameSystemId'),
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_FACTIONS].listing(request.correlationId, request.params.gameSystemId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);
	}
}

export default FactionRoute;
