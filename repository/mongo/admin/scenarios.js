import BaseAdminMongoRepository from '@thzero/library_server_repository_mongo/admin/index.js';

class ScenariosMongoRepository extends BaseAdminMongoRepository {
	async _getCollectionAdmin(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionScenarios());
	}

	// eslint-disable-next-line
	_searchFilter(correlationId, params, defaultFilter) {
		if (!params || !params.gameSystemId)
			return defaultFilter;
		return { gameSystemId: params.gameSystemId };
	}
}

export default ScenariosMongoRepository;
