import Constants from '../constants';

import Utility from '@thzero/library/utility';

import BaseRoute from '@thzero/library/routes/index';

import authentication from '@thzero/library/middleware/authentication';
import authorization from '@thzero/library/middleware/authorization';

class ScenariosRoute extends BaseRoute {
	constructor(prefix) {
		super(prefix ? prefix : '/api/scenarios');
	}

	_initializeRoutes(router) {
		router.get('/listing/:gameSystemId',
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
				const response = (await service.listing(ctx.correlationId, ctx.params.gameSystemId)).check(ctx);
				ctx.body = Utility.stringify(response);
			}
		);

		router.get('/played/:characterId',
			authentication(true),
			authorization('character'),
			// eslint-disable-next-line
			async (ctx, next) => {
				const service = this._injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
				const response = (await service.playedScenarios(ctx.correlationId, ctx.state.user, ctx.params.characterId)).check(ctx);
				ctx.body = Utility.stringify(response);
			}
		);
	}
}

export default ScenariosRoute;
