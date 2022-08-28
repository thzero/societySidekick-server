import AppMongoRepository from './app.js';

class ScenariosMongoRepository extends AppMongoRepository {
	async fetch(correlationId, id) {
		const collection = await this._getCollectionScenarios(correlationId);
		const response = this._initResponse(correlationId);

		const query = [
			{
				$match: { 'id': id }
			},
			{
				$project: { '_id': 0 }
			}
		]

		response.results = await this._fetch(correlationId, await this._aggregate(correlationId, collection, query));
		response.success = response.results != null;
		return response;
	}

	async fetchList(correlationId, ids) {
		const collection = await this._getCollectionScenarios(correlationId);
		const response = this._initResponse(correlationId);

		const query = [
			{
				$in: [ 'id', ids ]
			},
			{
				$project: { '_id': 0 }
			}
		]

		response.results = await this._fetch(correlationId, await this._aggregate(correlationId, collection, query));
		response.success = response.results != null;
		return response;
	}

	async listing(correlationId, gameSystemId) {
		const collection = await this._getCollectionScenarios(correlationId);
		const response = this._initResponse(correlationId);
		response.results = await this._fetchExtract(correlationId, collection, { 'gameSystemId': gameSystemId }, this._initResponseExtract(correlationId));
		return response;
	}
}

export default ScenariosMongoRepository;
