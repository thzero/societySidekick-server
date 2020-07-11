import AppMongoRepository from './app';

class GameSystemsMongoRepository extends AppMongoRepository {
	async listing(correlationId) {
		const collection = await this._getCollectionGameSystems();
		const response = this._initResponse();
		response.results = await this._fetchExtract(await this._find(collection, {}), this._initResponseExtract());
		return response;
	}
}

export default GameSystemsMongoRepository;
