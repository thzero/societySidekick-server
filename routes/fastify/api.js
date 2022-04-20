import Constants from '../../constants';

import LibraryUtility from '@thzero/library_common/utility';

import BaseRoute from '@thzero/library_server_fastify/routes/index';

class ApiRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '');
	}

	async init(injector, app, config) {
		await super.init(injector, app, config);
		this._inject(app, injector, Constants.InjectorKeys.SERVICE_API, Constants.InjectorKeys.SERVICE_API);
		this._inject(app, injector, Constants.InjectorKeys.SERVICE_GAMESYSTEMS, Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
		this._inject(app, injector, Constants.InjectorKeys.SERVICE_ORGANIZEDPLAY, Constants.InjectorKeys.SERVICE_ORGANIZEDPLAY);
	}

	get id() {
		return 'app';
	}

	_initializeRoutes(router) {
		router.get(this._join('/gameSystems'),
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_GAMESYSTEMS].listing(request.correlationId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);

		router.get(this._join('/initialize'),
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_API].initialize(request.correlationId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);
		
		router.get(this._join('/organizedPlay'),
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_ORGANIZEDPLAY].listing(request.correlationId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);
	}
}

export default ApiRoute;
