import AppMongoRepository from './app.js';

class BoonsMongoRepository extends AppMongoRepository {
	async listing(correlationId, gameSystemId) {
		const collection = await this._getCollectionBoons(correlationId);
		const response = this._initResponse(correlationId);
		response.results = await this._fetchExtract(correlationId, collection, { 'gameSystemId': gameSystemId }, this._initResponseExtract(correlationId));
		return response;
	}
}

export default BoonsMongoRepository;
