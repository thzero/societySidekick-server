import BaseAdminMongoRepository from '@thzero/library_server_repository_mongo/admin/index';

class ClassesMongoRepository extends BaseAdminMongoRepository {
	async _getCollectionAdmin() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionClasses());
	}
}

export default ClassesMongoRepository;
