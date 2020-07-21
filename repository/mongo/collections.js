import ApiCollectionsService from '@thzero/library_repository_mongo/collections/api';

class AppCollectionsService extends ApiCollectionsService {
	getClientName() {
		return AppCollectionsService.Client;
	}

	getCollectionBoons() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionBoons);
	}

	getCollectionClasses() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionClasses);
	}

	getCollectionCharacters() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionCharacters);
	}

	getCollectionEquipment() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionEquipment);
	}

	getCollectionFactions() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionFactions);
	}

	getCollectionGameSystems() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionGameSystems);
	}

	getCollectionModules() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionModules);
	}

	getCollectionNews() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionNews);
	}

	getCollectionPlans() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionPlans);
	}

	getCollectionScenarios() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionScenarios);
	}

	getCollectionSite() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionSite);
	}

	getCollectionUsageMetrics() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionUsageMetrics);
	}

	getCollectionUsers() {
		return this._getCollection(AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionUsers);
	}

	static Client = 'atlas';
	static Database = 'societySidekick';
	static CollectionBoons = 'boons';
	static CollectionClasses = 'classes';
	static CollectionCharacters = 'characters';
	static CollectionGameSystems = 'gameSystems';
	static CollectionEquipment = 'equipment';
	static CollectionFactions = 'factions';
	static CollectionModules = 'modules';
	static CollectionNews = 'news';
	static CollectionPlans = 'plans';
	static CollectionScenarios = 'scenarios';
	static CollectionSite = 'site';
	static CollectionUsageMetrics = 'usageMetrics';
	static CollectionUsers = 'users';
}

export default AppCollectionsService;

