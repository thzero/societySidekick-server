import Constants from '../../constants';

import LibraryUtility from '@thzero/library_common/utility';

import BaseRoute from '@thzero/library_server_fastify/routes/index';

class ClassesRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/classes');
	}

	async init(injector, app, config) {
		await super.init(injector, app, config);
		this._inject(app, injector, Constants.InjectorKeys.SERVICE_CLASSES, Constants.InjectorKeys.SERVICE_CLASSES);
	}

	get id() {
		return 'classes';
	}

	_initializeRoutes(router) {
		router.get(this._join('/listing/:gameSystemId'),
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CLASSES].listing(request.correlationId, request.params.gameSystemId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);
	}
}

export default ClassesRoute;
