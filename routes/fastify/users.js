
import LibraryConstants from '@thzero/library_server/constants.js';

import BaseUsersRoute from '@thzero/library_server_fastify/routes/baseUsers.js';

class UsersRoute extends BaseUsersRoute {
	_initializeRoutes(router) {
		super._initializeRoutes(router);

		router.get(this._join('/favorites/:gamerId'),
			// authentication(false),
			// authorization('user'),
			{
				preHandler: router.auth([
					router.authenticationDefault,
					router.authorizationDefault
				], 
				{ 
					relation: 'and',
					required: false,
					roles: [ 'user' ]
				}),
			},
			// eslint-disable-next-line
			async (request, reply) => {
				const response = (await router[LibraryConstants.InjectorKeys.SERVICE_USERS].fetchFavoritesByGamerId(request.correlationId, request.params.gamerId)).check(request);
				this._jsonResponse(reply, response);
			}
		);
	}
}

export default UsersRoute;
