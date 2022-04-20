// import Constants from '../../constants';

// import LibraryUtility from '@thzero/library_common/utility';

// import BaseRoute from '@thzero/library_server/routes/index';

// import authentication from '@thzero/library_server_koa/middleware/authentication';
// import authorization from '@thzero/library_server_koa/middleware/authorization';

// class ScenariosRoute extends BaseRoute {
// 	constructor(prefix) {
// 		super(prefix ? prefix : '/scenarios');
// 	}

// 	async init(injector, config) {
// 		const router = await super.init(injector, config);
// 		router.serviceScenarios = injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
// 	}

// 	get id() {
// 		return 'scenarios';
// 	}

// 	_initializeRoutes(router) {
// 		router.get('/listing/:gameSystemId',
// 			// eslint-disable-next-line
// 			async (ctx, next) => {
// 				// const service = this._injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
// 				const response = (await ctx.router.serviceScenarios.listing(ctx.correlationId, ctx.params.gameSystemId)).check(ctx);
// 				this._jsonResponse(ctx, LibraryUtility.stringify(response));
// 			}
// 		);

// 		router.get('/played/:characterId',
// 			authentication(true),
// 			authorization('character'),
// 			// eslint-disable-next-line
// 			async (ctx, next) => {
// 				// const service = this._injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
// 				const response = (await ctx.router.serviceScenarios.playedScenarios(ctx.correlationId, ctx.state.user, ctx.params.characterId)).check(ctx);
// 				ctx.body = LibraryUtility.stringify(response);
// 			}
// 		);
// 	}
// }

// export default ScenariosRoute;
