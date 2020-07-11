import MongoRepository from '@thzero/library/repository_mongo';

class AppMongoRepository extends MongoRepository {
	async _getCollectionBoons() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionBoons());
	}

	async _getCollectionClasses() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionClasses());
	}

	async _getCollectionCharacters() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionCharacters());
	}

	async _getCollectionEquipment() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionEquipment());
	}

	async _getCollectionFactions() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionFactions());
	}

	async _getCollectionGameSystems() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionGameSystems());
	}

	async _getCollectionModules() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionModules());
	}

	async _getCollectionNews() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionNews());
	}

	async _getCollectionPlans() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionPlans());
	}

	async _getCollectionScenarios() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionScenarios());
	}

	async _getCollectionSite() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionSite());
	}

	async _getCollectionUsageMetrics() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionUsageMetrics());
	}

	async _getCollectionUsers() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionUsers());
	}
}

export default AppMongoRepository;
