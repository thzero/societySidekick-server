import AppMongoRepository from './app';

class BoonsMongoRepository extends AppMongoRepository {
	async listing(correlationId, gameSystemId) {
		const collection = await this._getCollectionBoons();
		const response = this._initResponse();
		response.results = await this._fetchExtract(await this._find(collection, { 'gameSystemId': gameSystemId }), this._initResponseExtract());
		return response;
	}
}

export default BoonsMongoRepository;
