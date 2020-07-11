import BaseAdminMongoRepository from '@thzero/library/repository_mongo/admin/index';

class BoonsMongoRepository extends BaseAdminMongoRepository {
	// eslint-disable-next-line
	_searchQueryAdditional(query) {
		// query.push({
		// 	$lookup: {
		// 		from: 'scenarios',
		// 		localField: 'scenarioId',
		// 		foreignField: 'id',
		// 		as: 'scenarios'
		// 	}
		//  });
		// query.push({ $addFields: { 'scenario': { $arrayElemAt: [ "$scenarios", 0 ] } } });
		query.push({
			$project: {
				'_id': 0,
				// 'scenario._id': 0,
				'scenarios': 0
			}
		});
	}

	async _getCollectionAdmin() {
		return await this._getCollectionFromConfig(this._collectionsConfig.getCollectionBoons());
	}
}

export default BoonsMongoRepository;
