import ApiCollectionsService from '@thzero/library_server_repository_mongo/collections/api.js';

class AppCollectionsService extends ApiCollectionsService {
	getClientName() {
		return AppCollectionsService.Client;
	}

	getCollectionBoons(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionBoons);
	}

	getCollectionClasses(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionClasses);
	}

	getCollectionCharacters(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionCharacters);
	}

	getCollectionEquipment(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionEquipment);
	}

	getCollectionFactions(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionFactions);
	}

	getCollectionGameSystems(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionGameSystems);
	}

	getCollectionModules(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionModules);
	}

	getCollectionNews(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionNews);
	}

	getCollectionOrganizedPlay(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionOrganizedPlay);
	}

	getCollectionPlans(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionPlans);
	}

	getCollectionScenarios(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionScenarios);
	}

	getCollectionSite(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionSite);
	}

	getCollectionUsageMetrics(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionUsageMetrics);
	}

	getCollectionUsers(correlationId) {
		return this._getCollection(correlationId, AppCollectionsService.Client, AppCollectionsService.Database, AppCollectionsService.CollectionUsers);
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
	static CollectionOrganizedPlay = 'organizedPlay';
	static CollectionPlans = 'plans';
	static CollectionScenarios = 'scenarios';
	static CollectionSite = 'site';
	static CollectionUsageMetrics = 'usageMetrics';
	static CollectionUsers = 'users';
}

export default AppCollectionsService;

