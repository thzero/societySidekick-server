import Constants from '../../constants.js';

import LibraryUtility from '@thzero/library_common/utility/index.js';

import BaseRoute from '@thzero/library_server_fastify/routes/index.js';

class CharactersRoute extends BaseRoute {
	constructor() {
		super('/characters');
	}

	async init(injector, app, config) {
		await super.init(injector, app, config);
		this._inject(app, injector, Constants.InjectorKeys.SERVICE_CHARACTERS, Constants.InjectorKeys.SERVICE_CHARACTERS);
	}

	get id() {
		return 'characters';
	}

	_initializeRoutes(router) {
		router.delete(this._join('/:characterId'),
			// authentication(true),
			// authorization([ 'character.delete' ]),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					roles: [ 'character.delete' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].delete(request.correlationId, request.user, request.params.characterId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);

		router.delete(this._join('/boon/:characterId/:boonId'),
			// authentication(true),
			// authorization([ 'character.edit' ]),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					roles: [ 'character.edit' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].deleteBoon(request.correlationId, request.user, request.params.characterId, request.params.boonId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);

		router.delete(this._join('/inventory/:characterId/:inventoryId'),
			// authentication(true),
			// authorization([ 'character.edit' ]),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					roles: [ 'character.edit' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].deleteInventory(request.correlationId, request.user, request.params.characterId, request.params.inventoryId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);

		router.delete(this._join('/scenario/:characterId/:scenarioId'),
			// authentication(true),
			// authorization([ 'character.edit' ]),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					roles: [ 'character.edit' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].deleteScenario(request.correlationId, request.user, request.params.characterId, request.params.scenarioId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);

		router.get(this._join('/initialize'),
			// authentication(false),
			// // authorization('character'),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					// router.authorizationDefault
				], 
				{ 
					relation: 'and',
					required: false,
					roles: [ 'character' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].initialize(request.correlationId, request.user)).check(request);
				response.results = { lookups: response.results };
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);

		router.get(this._join('/listing/favorites'),
			// authentication(false),
			// authorization('character'),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					required: false,
					roles: [ 'character' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].listingByFavorites(request.correlationId, request.user)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);

		router.get(this._join('/listing/gamerId/:gamerId/:gameSystemId'),
			// authentication(false),
			// // authorization('character'),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					required: false,
					roles: [ 'character' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].listingByGamerId(request.correlationId, request.user, request.params.gamerId, request.params.gameSystemId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);

		router.get(this._join('/listing/gamerTag/:gamerTag/:gameSystemId'),
			// authentication(false),
			// // authorization('character'),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					required: false,
					roles: [ 'character' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].listingByGamerTag(request.correlationId, request.user, request.params.gamerTag, request.params.gameSystemId)).check(request);
				this._jsonResponse(reply, LibraryUtility.stringify(response));
			}
		);

		router.post(this._join('/listing'),
			// authentication(false),
			// authorization('character'),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					required: false,
					roles: [ 'character' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].listing(request.correlationId, request.user, request.body)).check(request);
				this._jsonResponse(reply, response);
			}
		);

		router.get(this._join('/lookups'),
			// authentication(true),
			// // authorization('character'),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					// router.authorizationDefault
				], 
				{ 
					relation: 'and',
					roles: [ 'character' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].listingByFavorites(request.correlationId, request.user)).check(request);
				this._jsonResponse(reply, response);
			}
		);

		router.get(this._join('/played/:characterId'),
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
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].playedScenarios(request.correlationId, request.user, request.params.characterId)).check(request);
				this._jsonResponse(reply, response);
			}
		);

		router.get(this._join('/number/:gameSystemId'),
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
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].fetchNumber(request.correlationId, request.user, request.params.gameSystemId)).check(request);
				this._jsonResponse(reply, response);
			}
		);

		router.get(this._join('/:characterId'),
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
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].fetch(request.correlationId, request.user, request.params.characterId)).check(request);
				this._jsonResponse(reply, response);
			}
		);

		router.post(this._join('/details/:characterId'),
			// authentication(true),
			// authorization([ 'character.edit' ]),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					roles: [ 'character.edit' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].updateDetails(request.correlationId, request.user, request.params.characterId, request.body)).check(request);
				this._jsonResponse(reply, response);
			}
		);

		router.post(this._join('/inventory/load/:characterId/:gearSetId'),
			// authentication(true),
			// authorization([ 'character.edit' ]),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					roles: [ 'character.edit' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].updateDetails(request.correlationId, request.user, request.params.characterId, request.params.gearSetId)).check(request);
				this._jsonResponse(reply, response);
			}
		);

		router.post(this._join('/boon/:characterId'),
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
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].updateBoon(request.correlationId, request.user, request.params.characterId, request.body)).check(request);
				this._jsonResponse(reply, response);
			}
		);

		router.post(this._join('/inventory/:characterId'),
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
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].updateInventory(request.correlationId, request.user, request.params.characterId, request.body)).check(request);
				this._jsonResponse(reply, response);
			}
		);

		router.post(this._join('/scenario/:characterId'),
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
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].updateScenario(request.correlationId, request.user, request.params.characterId, request.body)).check(request);
				this._jsonResponse(reply, response);
			}
		);

		router.post(this._join('/'),
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
				const response = (await router[Constants.InjectorKeys.SERVICE_CHARACTERS].updateScenario(request.correlationId, request.user, request.body)).check(request);
				this._jsonResponse(reply, response);
			}
		);
	}
}

export default CharactersRoute;
