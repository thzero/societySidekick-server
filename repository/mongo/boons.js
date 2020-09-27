import AppMongoRepository from './app';

class BoonsMongoRepository extends AppMongoRepository {
	async listing(correlationId, gameSystemId) {
		const collection = await this._getCollectionBoons(correlationId);
		const response = this._initResponse(null, correlationId);
		response.results = await this._fetchExtract(await this._find(collection, { 'gameSystemId': gameSystemId }), this._initResponseExtract(correlationId));
		return response;
	}
}

export default BoonsMongoRepository;
