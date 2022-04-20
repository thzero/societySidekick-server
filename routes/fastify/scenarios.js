import Constants from '../../constants';

import LibraryUtility from '@thzero/library_common/utility';

import BaseRoute from '@thzero/library_server_fastify/routes/index';

class ScenariosRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/scenarios');
	}

	async init(injector, app, config) {
		await super.init(injector, app, config);
		this._inject(app, injector, Constants.InjectorKeys.SERVICE_SCENARIOS, Constants.InjectorKeys.SERVICE_SCENARIOS);
	}

	get id() {
		return 'scenarios';
	}

	_initializeRoutes(router) {
		router.get(this._join('/listing/:gameSystemId'),
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_SCENARIOS].listing(request.correlationId, request.params.gameSystemId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);

		router.get('/played/:characterId',
			// authentication(true),
			// authorization('character'),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					roles: [ 'character' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_SCENARIOS].playedScenarios(request.correlationId, request.user, request.params.characterId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);
	}
}

export default ScenariosRoute;
