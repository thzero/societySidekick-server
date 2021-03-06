import BaseAdminMongoRepository from '@thzero/library_server_repository_mongo/admin/index';

class ClassesMongoRepository extends BaseAdminMongoRepository {
	async _getCollectionAdmin(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionClasses());
	}
}

export default ClassesMongoRepository;
