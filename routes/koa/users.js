// import koaBody from 'koa-body';

// import LibraryUtility from '@thzero/library_common/utility';

// import authentication from '@thzero/library_server_koa/middleware/authentication';
// import authorization from '@thzero/library_server_koa/middleware/authorization';

// import BaseUsersRoute from '@thzero/library_server_koa/routes/baseUsers';

// class UsersRoute extends BaseUsersRoute {
// 	_initializeRoutes(router) {
// 		super._initializeRoutes(router);

// 		router.get('/favorites/:gamerId',
// 			authentication(false),
// 			authorization('user'),
// 			koaBody({
// 				text: false,
// 			}),
// 			// eslint-disable-next-line
// 			async (ctx, next) => {
// 				// const service = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_USERS);
// 				const response = (await ctx.router.serviceUsers.fetchFavoritesByGamerId(ctx.correlationId, ctx.params.gamerId)).check(ctx);
// 				this._jsonResponse(ctx, LibraryUtility.stringify(response));
// 			}
// 		);
// 	}
// }

// export default UsersRoute;
