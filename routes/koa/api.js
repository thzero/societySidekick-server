// import Constants from '../../constants';

// import LibraryUtility from '@thzero/library_common/utility';

// import BaseRoute from '@thzero/library_server_koa/routes/index';

// class ApiRoute extends BaseRoute {
// 	constructor(prefix) {
// 		super(prefix ? prefix : '');
// 	}

// 	async init(injector, config) {
// 		const router = await super.init(injector, config);
// 		router.serviceApi = injector.getService(Constants.InjectorKeys.SERVICE_API);
// 		router.serviceGameSystems = injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
// 		router.serviceOrganizedPlay = injector.getService(Constants.InjectorKeys.SERVICE_ORGANIZEDPLAY);
// 	}

// 	get id() {
// 		return 'app';
// 	}

// 	_initializeRoutes(router) {
// 		router.get('/gameSystems',
// 			// eslint-disable-next-line
// 			async (ctx, next) => {
// 				// const service = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
// 				const response = (await ctx.router.serviceGameSystems.listing(ctx.correlationId)).check(ctx);
// 				this._jsonResponse(ctx, LibraryUtility.stringify(response));
// 			}
// 		);

// 		router.get('/initialize',
// 			// eslint-disable-next-line
// 			async (ctx, next) => {
// 				// const service = this._injector.getService(Constants.InjectorKeys.SERVICE_API);
// 				const response = (await ctx.router.serviceApi.initialize(ctx.correlationId)).check(ctx);
// 				this._jsonResponse(ctx, LibraryUtility.stringify(response));
// 			}
// 		);
		
// 		router.get('/organizedPlay',
// 			// eslint-disable-next-line
// 			async (ctx, next) => {
// 				// const service = this._injector.getService(Constants.InjectorKeys.SERVICE_ORGANIZEDPLAY);
// 				const response = (await ctx.router.serviceOrganizedPlay.listing(ctx.correlationId)).check(ctx);
// 				this._jsonResponse(ctx, LibraryUtility.stringify(response));
// 			}
// 		);
// 	}
// }

// export default ApiRoute;
