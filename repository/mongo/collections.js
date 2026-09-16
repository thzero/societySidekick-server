import ApiCollectionsService from '@thzero/library_server_repository_mongo/collections/api.js';

class AppCollectionsService extends ApiCollectionsService {
	getClientName() {
		return AppCollectionsService.Client;
	}

	getCollectionBoons(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionBoons);
	}

	getCollectionClasses(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionClasses);
	}

	getCollectionCharacters(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionCharacters);
	}

	getCollectionEquipment(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionEquipment);
	}

	getCollectionFactions(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionFactions);
	}

	getCollectionGameSystems(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionGameSystems);
	}

	getCollectionModules(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionModules);
	}

	getCollectionNews(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionNews);
	}

	getCollectionOrganizedPlay(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionOrganizedPlay);
	}

	getCollectionPlans(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionPlans);
	}

	getCollectionPubSub(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionPubSub);
	}

	getCollectionScenarios(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionScenarios);
	}

	getCollectionSite(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionSite);
	}

	getCollectionUsageMetrics(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionUsageMetrics);
	}

	getCollectionUsageMetricsMeasurements(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionUsageMetricsMeasurements);
	}

	getCollectionUsers(correlationId) {
		return this._getCollection(correlationId, this.getClientName(), AppCollectionsService.CollectionUsers);
	}

	static Client = 'atlas';
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
	static CollectionPubSub = 'pubsub';
	static CollectionScenarios = 'scenarios';
	static CollectionSite = 'site';
	static CollectionUsageMetrics = 'usageMetrics';
	static CollectionUsageMetricsMeasurements = 'usageMetricsMeasurements';
	static CollectionUsers = 'users';
}

export default AppCollectionsService;
