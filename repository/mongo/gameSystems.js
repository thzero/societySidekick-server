import AppMongoRepository from './app';

class GameSystemsMongoRepository extends AppMongoRepository {
	async listing(correlationId) {
		const collection = await this._getCollectionGameSystems(correlationId);
		const response = this._initResponse(correlationId);
		response.results = await this._fetchExtract(correlationId, await this._find(correlationId, collection, {}), this._initResponseExtract(correlationId));
		return response;
	}
}

export default GameSystemsMongoRepository;
