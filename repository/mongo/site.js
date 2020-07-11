import AppMongoRepository from './app';

class SiteMongoRepository extends AppMongoRepository {
	async fetch(correlationId) {
		const collection = await this._getCollectionSite();
		const response = this._initResponse();
		response.results = await this._findOne(collection, {});
		return response;
	}
}

export default SiteMongoRepository;
