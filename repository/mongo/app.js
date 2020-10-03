import MongoRepository from '@thzero/library_server_repository_mongo';

class AppMongoRepository extends MongoRepository {
	async _getCollectionBoons(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionBoons());
	}

	async _getCollectionClasses(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionClasses());
	}

	async _getCollectionCharacters(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionCharacters());
	}

	async _getCollectionEquipment(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionEquipment());
	}

	async _getCollectionFactions(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionFactions());
	}

	async _getCollectionGameSystems(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionGameSystems());
	}

	async _getCollectionModules(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionModules());
	}

	async _getCollectionPlans(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionPlans());
	}

	async _getCollectionScenarios(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionScenarios());
	}

	async _getCollectionSite(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionSite());
	}

	async _getCollectionUsers(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionUsers());
	}
}

export default AppMongoRepository;
