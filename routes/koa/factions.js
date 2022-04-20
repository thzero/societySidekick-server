// import Constants from '../../constants';

// import LibraryUtility from '@thzero/library_common/utility';

// import BaseRoute from '@thzero/library_server_koa/routes/index';

// class FactionRoute extends BaseRoute {
// 	constructor(prefix) {
// 		super(prefix ? prefix : '/factions');
// 	}

// 	async init(injector, config) {
// 		const router = await super.init(injector, config);
// 		router.serviceFactions = injector.getService(Constants.InjectorKeys.SERVICE_FACTIONS);
// 	}

// 	get id() {
// 		return 'factions';
// 	}

// 	_initializeRoutes(router) {
// 		router.get('/listing/:gameSystemId',
// 			// eslint-disable-next-line
// 			async (ctx, next) => {
// 				// const service = this._injector.getService(Constants.InjectorKeys.SERVICE_FACTIONS);
// 				const response = (await ctx.router.serviceFactions.listing(ctx.correlationId, ctx.params.gameSystemId)).check(ctx);
// 				this._jsonResponse(ctx, LibraryUtility.stringify(response));
// 			}
// 		);
// 	}
// }

// export default FactionRoute;
