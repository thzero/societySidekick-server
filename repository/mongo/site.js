import AppMongoRepository from './app';

class SiteMongoRepository extends AppMongoRepository {
	async fetch(correlationId) {
		const collection = await this._getCollectionSite(correlationId);
		const response = this._initResponse(correlationId);
		response.results = await this._findOne(correlationId, collection, {});
		return response;
	}
}

export default SiteMongoRepository;
