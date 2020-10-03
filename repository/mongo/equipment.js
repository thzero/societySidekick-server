import AppMongoRepository from './app';

class EquipmentMongoRepository extends AppMongoRepository {
	async search(correlationId, gameSystemId, search) {
		const collection = await this._getCollectionEquipment(correlationId);
		const response = this._initResponse(correlationId);
		response.results = await this._fetchExtract(correlationId, await this._find(correlationId, collection, { $and: [ { 'name': { $regex: new RegExp(search.name, 'i') } }, { 'gameSystemId' : gameSystemId } ] }), this._initResponseExtract(correlationId));
		return response;
	}
}

export default EquipmentMongoRepository;
