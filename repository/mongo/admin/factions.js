import BaseAdminMongoRepository from '@thzero/library_server_repository_mongo/admin/index.js';

class FactionsMongoRepository extends BaseAdminMongoRepository {
	async _getCollectionAdmin(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionFactions(correlationId));
	}
}

export default FactionsMongoRepository;
