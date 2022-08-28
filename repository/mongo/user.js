import Constants from '../../constants.js';

import AppUtility from '../../utility/app.js';

import BaseUserMongoRepository from '@thzero/library_server_repository_mongo/baseUser.js';

class UserMongoRepository extends BaseUserMongoRepository {
	async fetchByExternalId(correlationId, userId, excludePlan) {
		const response = this._initResponse(correlationId);

		const collectionUsers = await this._getCollectionUsers(correlationId);
		response.results = await this._findOne(correlationId, collectionUsers, { 'external.id': userId });
		response.success = response.results !== null;

		if (!excludePlan && this._hasSucceeded(response) && response.results) {
			const collectionPlan = await this._getCollectionPlans(correlationId);
			response.results.plan = await this._findOne(correlationId, collectionPlan, { 'id': response.results.planId }, {
				'roles': 0
			});
		}

		return response;
	}

	async fetchByGamerId(correlationId, gamerId, ignoreProjection) {
		const response = this._initResponse(correlationId);

		let projection = null
		if (!ignoreProjection)
			projection = this._byGamerProjection();

		const collectionUsers = await this._getCollectionUsers(correlationId);
		response.results = await this._findOne(correlationId, collectionUsers, { 'id': gamerId }, projection);
		response.success = response.results !== null;

		return response;
	}

	async fetchByGamerIds(correlationId, gamerIds) {
		const response = this._initResponse(correlationId);

		const collectionUsers = await this._getCollectionUsers(correlationId);
		response.results = await this._fetchExtract2(correlationId, 
			await this._count(correlationId, collectionUsers, { 'id': { $in: gamerIds } }),
			await this._find(correlationId, collectionUsers,
				{ 'id': { $in: gamerIds } },
				this._byGamerProjection()
			),
			this._initResponseExtract(correlationId));

		return response;
	}

	async fetchByGamerTag(correlationId, gamerTag) {
		const response = this._initResponse(correlationId);

		const collectionUsers = await this._getCollectionUsers(correlationId);
		response.results = await this._findOne(correlationId, collectionUsers,
			{ 'settings.gamerTagSearch': gamerTag ? gamerTag.toLowerCase() : null },
			this._byGamerProjection());
		response.success = response.results !== null;

		return response;
	}

	async valid(correlationId, userId, gamerTag) {
		const collection = await this._getCollectionUsers(correlationId);
		const response = this._initResponse(correlationId);
		let countName = 0;
		let countNameNoSpaces = 0;
		if (gamerTag) {
			countName = await collection.countDocuments({ $and: [ { $text : { $search : gamerTag } }, { 'id': { $ne: userId } } ] });
			gamerTag = AppUtility.generateGamerTagSearch(gamerTag);
			countNameNoSpaces = await collection.countDocuments({ $and: [ { $text : { $search : gamerTag } }, { 'id': { $ne: userId } } ] });
		}
		response.results = (countName > 0) || (countNameNoSpaces > 0);
		return response;
	}

	_getDefaultPlan() {
		return Constants.Plans.BASIC;
	}

	_byGamerProjection() {
		return this._externalUserProjection({
			'createdTimestamp': 0,
			'createdUserId': 0,
			'external': 0,
			'planId': 0,
			'roles': 0,
			'settings.boons': 0,
			'settings.characters': 0,
			'settings.favorites': 0,
			'settings.gameSystems.gearSets': 0,
			'settings.home': 0,
			'settings.favorites': 0,
			'settings.locations': 0,
			'settings.scenarios': 0,
			'updatedTimestamp': 0,
			'updatedUserId': 0
		})
	}

	_externalUserProjection(projection) {
		projection['settings.characters'] = 0;
		projection['settings.scenarios'] = 0;
		return projection;
	}
}

export default UserMongoRepository;
