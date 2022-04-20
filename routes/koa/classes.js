// import Constants from '../../constants';

// import LibraryUtility from '@thzero/library_common/utility';

// import BaseRoute from '@thzero/library_server_koa/routes/index';

// class ClassesRoute extends BaseRoute {
// 	constructor(prefix) {
// 		super(prefix ? prefix : '/classes');
// 	}

// 	async init(injector, config) {
// 		const router = await super.init(injector, config);
// 		router.serviceClasses = injector.getService(Constants.InjectorKeys.SERVICE_CLASSES);
// 	}

// 	get id() {
// 		return 'classes';
// 	}

// 	_initializeRoutes(router) {
// 		router.get('/listing/:gameSystemId',
// 			// eslint-disable-next-line
// 			async (ctx, next) => {
// 				// const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CLASSES);
// 				const response = (await ctx.router.serviceClasses.listing(ctx.correlationId, ctx.params.gameSystemId)).check(ctx);
// 				this._jsonResponse(ctx, LibraryUtility.stringify(response));
// 			}
// 		);
// 	}
// }

// export default ClassesRoute;
