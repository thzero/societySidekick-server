import koaBody from 'koa-body';

import Constants from '../constants';

import LibraryUtility from '@thzero/library_common/utility';

import BaseRoute from '@thzero/library_server/routes/index';

import authentication from '@thzero/library_server/middleware/authentication';
import authorization from '@thzero/library_server/middleware/authorization';

class CharactersRoute extends BaseRoute {
	constructor() {
		super('/api/characters');
	}

	_initializeRoutes(router) {
		router.delete('/:characterId',
			authentication(true),
			authorization([ 'character.delete' ]),
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.delete(ctx.correlationId, ctx.state.user, ctx.params.characterId)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.delete('/boon/:characterId/:boonId',
			authentication(true),
			authorization([ 'character.edit' ]),
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.deleteBoon(ctx.correlationId, ctx.state.user, ctx.params.characterId, ctx.params.boonId)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.delete('/inventory/:characterId/:inventoryId',
			authentication(true),
			authorization([ 'character.edit' ]),
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.deleteInventory(ctx.correlationId, ctx.state.user, ctx.params.characterId, ctx.params.inventoryId)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.delete('/scenario/:characterId/:scenarioId',
			authentication(true),
			authorization([ 'character.edit' ]),
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.deleteScenario(ctx.correlationId, ctx.state.user, ctx.params.characterId, ctx.params.scenarioId)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.get('/initialize',
			authentication(false),
			// authorization('character'),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.initialize(ctx.correlationId, ctx.state.user)).check(ctx);
				response.results = { lookups: response.results };
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.get('/listing/favorites',
			authentication(false),
			authorization('character'),
			// eslint-disable-next-line,
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.listingByFavorites(ctx.correlationId, ctx.state.user)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.get('/listing/gamerId/:gamerId/:gameSystemId',
			authentication(false),
			// authorization('character'),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.listingByGamerId(ctx.correlationId, ctx.state.user, ctx.params.gamerId, ctx.params.gameSystemId)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.get('/listing/gamerTag/:gamerTag/:gameSystemId',
			authentication(false),
			// authorization('character'),
			// eslint-disable-next-line,
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.listingByGamerTag(ctx.correlationId, ctx.state.user, ctx.params.gamerTag, ctx.params.gameSystemId)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.post('/listing',
			authentication(false),
			authorization('character'),
			// eslint-disable-next-line,
			koaBody({
				text: false,
			}),
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.listing(ctx.correlationId, ctx.state.user, ctx.request.body)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.get('/lookups',
			authentication(true),
			// authorization('character'),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.getLookups(ctx.correlationId, ctx.state.user)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.get('/played/:characterId',
			authentication(true),
			authorization('character'),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.playedScenarios(ctx.correlationId, ctx.state.user, ctx.params.characterId)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.get('/number/:gameSystemId',
			authentication(true),
			authorization('character'),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.fetchNumber(ctx.correlationId, ctx.state.user, ctx.params.gameSystemId)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.get('/:characterId',
			authentication(true),
			authorization('character'),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.fetch(ctx.correlationId, ctx.state.user, ctx.params.characterId)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.post('/details/:characterId',
			authentication(true),
			authorization([ 'character.edit' ]),
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.updateDetails(ctx.correlationId, ctx.state.user, ctx.params.characterId, ctx.request.body)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.post('/inventory/load/:characterId/:gearSetId',
			authentication(true),
			authorization([ 'character.edit' ]),
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.loadInventory(ctx.correlationId, ctx.state.user, ctx.params.characterId, ctx.params.gearSetId)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.post('/boon/:characterId',
			authentication(true),
			authorization('character'),
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.updateBoon(ctx.correlationId, ctx.state.user, ctx.params.characterId, ctx.request.body)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.post('/inventory/:characterId',
			authentication(true),
			authorization('character'),
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.updateInventory(ctx.correlationId, ctx.state.user, ctx.params.characterId, ctx.request.body)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.post('/scenario/:characterId',
			authentication(true),
			authorization('character'),
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.updateScenario(ctx.correlationId, ctx.state.user, ctx.params.characterId, ctx.request.body)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);

		router.post('/',
			authentication(true),
			authorization('character'),
			koaBody({
				text: false,
			}),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
				const response = (await service.create(ctx.correlationId, ctx.state.user, ctx.request.body)).check(ctx);
				ctx.body = LibraryUtility.stringify(response);
			}
		);
	}
}

export default CharactersRoute;
