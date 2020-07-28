import BaseAdminMongoRepository from '@thzero/library_server_repository_mongo/admin/index';

class EquipmentMongoRepository extends BaseAdminMongoRepository {
	async _getCollectionAdmin() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionEquipment());
	}
}

export default EquipmentMongoRepository;
