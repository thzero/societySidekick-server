import AppMongoRepository from './app';

class EquipmentMongoRepository extends AppMongoRepository {
	async search(correlationId, gameSystemId, search) {
		const collection = await this._getCollectionEquipment();
		const response = this._initResponse();
		response.results = await this._fetchExtract(await this._find(collection, { $and: [ { 'name': { $regex: new RegExp(search.name, 'i') } }, { 'gameSystemId' : gameSystemId } ] }), this._initResponseExtract());
		return response;
	}
}

export default EquipmentMongoRepository;
