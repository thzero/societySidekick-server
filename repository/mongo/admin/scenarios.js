import BaseAdminMongoRepository from '@thzero/library/repository_mongo/admin/index';

class ScenariosMongoRepository extends BaseAdminMongoRepository {
	async _getCollectionAdmin() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionScenarios());
	}

	// eslint-disable-next-line
	_searchFilter(params, defaultFilter) {
		if (!params || !params.gameSystemId)
			return defaultFilter
		return { gameSystemId: params.gameSystemId }
	}
}

export default ScenariosMongoRepository;
