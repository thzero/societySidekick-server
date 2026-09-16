import MongoRepository from '@thzero/library_server_repository_mongo/index.js';

class AppMongoRepository extends MongoRepository {
	async _getCollectionBoons(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionBoons(correlationId));
	}

	async _getCollectionClasses(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionClasses(correlationId));
	}

	async _getCollectionCharacters(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionCharacters(correlationId));
	}

	async _getCollectionEquipment(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionEquipment(correlationId));
	}

	async _getCollectionFactions(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionFactions(correlationId));
	}

	async _getCollectionGameSystems(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionGameSystems(correlationId));
	}

	async _getCollectionModules(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionModules(correlationId));
	}

	async _getCollectionOrganizedPlay(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionOrganizedPlay(correlationId));
	}

	async _getCollectionPlans(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionPlans(correlationId));
	}

	async _getCollectionScenarios(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionScenarios(correlationId));
	}

	async _getCollectionSite(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionSite(correlationId));
	}

	async _getCollectionUsers(correlationId) {
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionUsers(correlationId));
	}
}

export default AppMongoRepository;
