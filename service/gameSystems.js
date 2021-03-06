import Constants from '../constants';

import Service from '@thzero/library_server/service/index';

class GameSystemsService extends Service {
	constructor() {
		super();

		this._repositoryGameSystems = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryGameSystems = this._injector.getService(Constants.InjectorKeys.REPOSITORY_GAMESYSTEMS);
	}

	async listing(correlationId) {
		const respositoryResponse = await this._repositoryGameSystems.listing(correlationId);
		return respositoryResponse;
	}
}

export default GameSystemsService;
