import BaseAdminMongoRepository from '@thzero/library/repository_mongo/admin/index';

class FactionsMongoRepository extends BaseAdminMongoRepository {
	async _getCollectionAdmin() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionFactions());
	}
}

export default FactionsMongoRepository;
